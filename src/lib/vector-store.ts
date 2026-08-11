/**
 * Chat-time retrieval: embed the user's question, load corpus vectors from Redis,
 * rank by cosine similarity, return top doc ids for the system prompt.
 */

import type { Document } from '@/types/chat';
import type { SearchResult } from '@/types/chat';
import { RAG_KEYS } from './constants';
import { getConfig } from './config';
import { getRedis } from './redis';
import { parseStoredEmbedding } from './embedding-parse';
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

/** True when the corpus in Redis doesn't match the current portfolioDocuments. */
export async function needsReembedding(documents: Document[]): Promise<boolean> {
  const redis = getRedis();
  const currentHash = await generatePortfolioHash(documents);
  const stored = await redis.get(RAG_KEYS.PORTFOLIO_HASH);
  const storedHash = typeof stored === 'string' ? stored : stored != null ? String(stored) : null;
  return storedHash !== currentHash;
}

export async function searchSimilarDocuments(
  query: string,
  limit: number,
  documents: Document[],
): Promise<SearchResult[]> {
  const config = getConfig();
  const redis = getRedis();

  // Up to two passes: first may trigger a sync if Redis is empty or stale
  for (let attempt = 0; attempt < 2; attempt++) {
    let docIds = await redis.smembers(RAG_KEYS.DOCUMENT_IDS);

    const missingOrStale = docIds.length === 0 || (await needsReembedding(documents));
    if (missingOrStale && documents.length > 0) {
      await syncPortfolioEmbeddings(documents, { concurrency: 1 });
    }

    docIds = await redis.smembers(RAG_KEYS.DOCUMENT_IDS);
    if (docIds.length === 0) return [];

    // Load all corpus vectors (one GET per doc; results line up with docIds by index)
    const pipeline = redis.pipeline();
    for (const id of docIds) {
      pipeline.get(RAG_KEYS.EMBEDDING(id));
    }
    const rawList = (await pipeline.exec()) as unknown[];

    let loadable = 0;
    for (let i = 0; i < docIds.length; i++) {
      if (parseStoredEmbedding(rawList[i])) loadable++;
    }

    // Hashes/metadata exist but no readable vectors — try sync once more
    if (loadable === 0 && documents.length > 0 && attempt === 0) {
      await syncPortfolioEmbeddings(documents, { concurrency: 1 });
      continue;
    }
    if (loadable === 0) return [];

    // Embed the user's message (24h cache) and score every doc
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

    // Nothing cleared the threshold; return best matches anyway
    allScored.sort((a, b) => b.score - a.score);
    return allScored.slice(0, limit);
  }

  return [];
}
