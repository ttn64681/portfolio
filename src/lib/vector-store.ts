/**
 * Vector store: Redis-backed document embeddings, similarity search, init.
 * Content lives in code (`@/data/config/portfolio`); embeddings + metadata in Redis.
 */

import type { Document } from '@/types/chat';
import type { SearchResult } from '@/types/chat';
import { RAG_KEYS } from './constants';
import { getConfig } from './config';
import { getRedis } from './redis';
import {
  generatePortfolioHash,
  batchEmbedDocuments,
  getOrCreateQueryEmbedding,
} from './embeddings';

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

function parseStoredEmbedding(raw: unknown): number[] | null {
  if (raw == null) return null;
  let parsed: { embedding?: unknown };
  try {
    if (typeof raw === 'string') {
      parsed = JSON.parse(raw) as { embedding?: unknown };
    } else if (typeof raw === 'object') {
      parsed = raw as { embedding?: unknown };
    } else {
      return null;
    }
  } catch {
    return null;
  }
  const emb = parsed.embedding;
  if (!Array.isArray(emb)) return null;
  const nums = emb.filter((x): x is number => typeof x === 'number');
  return nums.length === emb.length && nums.length > 0 ? nums : null;
}

/** Whether stored portfolio hash differs from current (needs re-embed). */
export async function needsReembedding(documents: Document[]): Promise<boolean> {
  const redis = getRedis();
  const currentHash = await generatePortfolioHash(documents);
  const stored = await redis.get(RAG_KEYS.PORTFOLIO_HASH);
  const storedHash = typeof stored === 'string' ? stored : stored != null ? String(stored) : null;
  return storedHash !== currentHash;
}

/** Initialize Redis with embeddings and hash. */
export async function initializePortfolioData(documents: Document[]): Promise<void> {
  if (documents.length === 0) return;

  const embeddings = await batchEmbedDocuments(documents);
  const newHash = await generatePortfolioHash(documents);
  const redis = getRedis();

  const docIds = Array.from(embeddings.keys());
  const pipeline = redis.pipeline();

  pipeline.del(RAG_KEYS.DOCUMENT_IDS);
  if (docIds.length > 0) {
    pipeline.sadd(RAG_KEYS.DOCUMENT_IDS, docIds[0], ...docIds.slice(1));
  }
  for (const [docId, values] of embeddings) {
    pipeline.set(RAG_KEYS.EMBEDDING(docId), JSON.stringify({ embedding: values, docId }), {
      ex: 60 * 60 * 24 * 30,
    });
  }
  pipeline.set(RAG_KEYS.PORTFOLIO_HASH, newHash);

  await pipeline.exec();
}

/**
 * Similarity search over Redis-stored embeddings.
 * Re-initializes if the id set is missing/stale, or if ids exist but no `rag:embedding:*`
 * values load (partial migration: hash matched, vectors missing).
 */
export async function searchSimilarDocuments(
  query: string,
  limit: number,
  documents: Document[],
): Promise<SearchResult[]> {
  const config = getConfig();
  const redis = getRedis();

  // Try twice to get document IDs
  for (let attempt = 0; attempt < 2; attempt++) {
    let docIds = await redis.smembers(RAG_KEYS.DOCUMENT_IDS);

    const missingOrStale =
      docIds.length === 0 || (await needsReembedding(documents));

    if (missingOrStale && documents.length > 0) {
      await initializePortfolioData(documents);
    }

    docIds = await redis.smembers(RAG_KEYS.DOCUMENT_IDS);
    if (docIds.length === 0) return [];

    const pipeline = redis.pipeline();
    for (const id of docIds) {
      pipeline.get(RAG_KEYS.EMBEDDING(id));
    }
    const rawList = (await pipeline.exec()) as unknown[];

    let loadable = 0;
    for (let i = 0; i < docIds.length; i++) {
      if (parseStoredEmbedding(rawList[i])) loadable++;
    }

    if (loadable === 0 && documents.length > 0 && attempt === 0) {
      await initializePortfolioData(documents);
      continue;
    }
    if (loadable === 0) return [];

    const queryEmbedding = await getOrCreateQueryEmbedding(query);

    const aboveThreshold: SearchResult[] = [];
    const allScored: SearchResult[] = [];

    for (let i = 0; i < docIds.length; i++) {
      const embedding = parseStoredEmbedding(rawList[i]);
      if (!embedding) continue;
      const score = cosineSimilarity(queryEmbedding, embedding);
      allScored.push({ id: docIds[i], score });
      if (score > config.similarityThreshold) {
        aboveThreshold.push({ id: docIds[i], score });
      }
    }

    aboveThreshold.sort((a, b) => b.score - a.score);
    if (aboveThreshold.length > 0) {
      return aboveThreshold.slice(0, limit);
    }

    allScored.sort((a, b) => b.score - a.score);
    return allScored.slice(0, limit);
  }

  return [];
}
