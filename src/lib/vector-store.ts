/**
 * Similarity search over Redis-stored portfolio embeddings.
 *
 * Called from `/api/chat` with the user's message. Does not call Gemini for the LLM here —
 * only for query embedding (cached) and optionally corpus sync if Redis is stale.
 */

import type { Document } from '@/types/chat';
import type { SearchResult } from '@/types/chat';
import { RAG_KEYS } from './constants';
import { getConfig } from './config';
import { getRedis } from './redis';
import { generatePortfolioHash, getOrCreateQueryEmbedding } from './embeddings';
import { syncPortfolioEmbeddings } from './sync-portfolio-embeddings';

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

/** True when `rag:portfolio:hash` in Redis ≠ hash of current `portfolioDocuments`. */
export async function needsReembedding(documents: Document[]): Promise<boolean> {
  const redis = getRedis();
  const currentHash = await generatePortfolioHash(documents);
  const stored = await redis.get(RAG_KEYS.PORTFOLIO_HASH);
  const storedHash = typeof stored === 'string' ? stored : stored != null ? String(stored) : null;
  return storedHash !== currentHash;
}

/**
 * Returns top document ids by cosine similarity to the query.
 * If Redis has no vectors or corpus hash mismatch → incremental sync, then retry once.
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

    const missingOrStale = docIds.length === 0 || 
            (await needsReembedding(documents)); // If `rag:portfolio:hash` ≠ hash of curr `portfolioDocuments`

    if (missingOrStale && documents.length > 0) {
      // Sync only changed docs when corpus hash or vectors are missing (incremental, batched).
      await syncPortfolioEmbeddings(documents, { concurrency: 1 }); // concurrency: 1 = sequential
    }

    docIds = await redis.smembers(RAG_KEYS.DOCUMENT_IDS);
    if (docIds.length === 0) return [];

    const pipeline = redis.pipeline(); // pipeline for multiple Redis operations
    // Get all embeddings for the docs in the corpus
    for (const id of docIds) {
      pipeline.get(RAG_KEYS.EMBEDDING(id));
    }
    const rawList = (await pipeline.exec()) as unknown[]; // execute popeline

    let loadable = 0; // count of docs that can be loaded from Redis
    for (let i = 0; i < docIds.length; i++) {
      if (parseStoredEmbedding(rawList[i])) loadable++;
    }

    if (loadable === 0 && documents.length > 0 && attempt === 0) {
      await syncPortfolioEmbeddings(documents, { concurrency: 1 });
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
