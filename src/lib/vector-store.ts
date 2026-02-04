/**
 * Vector store: Redis-backed document embeddings, similarity search, init.
 * Content lives in code (portfolio.ts); only embeddings and metadata in Redis.
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

/** Whether stored portfolio hash differs from current (needs re-embed). */
export async function needsReembedding(documents: Document[]): Promise<boolean> {
  const redis = getRedis();
  const currentHash = await generatePortfolioHash(documents);
  const stored = await redis.get(RAG_KEYS.PORTFOLIO_HASH);
  const storedHash = typeof stored === 'string' ? stored : stored != null ? String(stored) : null;
  return storedHash !== currentHash;
}

/** Initialize Redis with embeddings and hash; only run when missing or needsReembedding. */
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
 * Search for similar documents: auto-init if missing or hash changed; cache query embedding; pipeline GET; cosine similarity.
 */
export async function searchSimilarDocuments(
  query: string,
  limit: number,
  documents: Document[],
): Promise<SearchResult[]> {
  const config = getConfig();
  const redis = getRedis();

  const missingOrStale =
    (await redis.smembers(RAG_KEYS.DOCUMENT_IDS)).length === 0 ||
    (await needsReembedding(documents));

  if (missingOrStale && documents.length > 0) {
    await initializePortfolioData(documents);
  }

  const docIds = await redis.smembers(RAG_KEYS.DOCUMENT_IDS);
  if (docIds.length === 0) return [];

  const queryEmbedding = await getOrCreateQueryEmbedding(query);

  const pipeline = redis.pipeline();
  for (const id of docIds) {
    pipeline.get(RAG_KEYS.EMBEDDING(id));
  }
  const rawList = await pipeline.exec();

  const results: SearchResult[] = [];
  for (let i = 0; i < docIds.length; i++) {
    const raw = rawList[i];
    let parsed: { embedding?: number[] };
    if (typeof raw === 'string') {
      parsed = JSON.parse(raw);
    } else if (raw != null && typeof raw === 'object') {
      parsed = raw as { embedding?: number[] };
    } else {
      continue;
    }
    const embedding = parsed.embedding;
    if (!Array.isArray(embedding)) continue;
    const score = cosineSimilarity(queryEmbedding, embedding);
    if (score > config.similarityThreshold) {
      results.push({ id: docIds[i], score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
