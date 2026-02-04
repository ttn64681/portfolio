/**
 * Gemini embedding API: single query (with 24h cache) and batch for portfolio docs.
 * Uses the working embedContent endpoint from the RAG demo.
 */

import type { Document } from '@/types/chat';
import { RAG_KEYS, QUERY_EMBEDDING_TTL_SEC } from './constants';
import { getConfig } from './config';
import { getRedis } from './redis';

/** Normalize query for cache key: trim and collapse whitespace. */
export function normalizeQuery(query: string): string {
  return query.trim().replace(/\s+/g, ' ');
}

/** SHA-256 hash of string (Edge-safe: use Web Crypto). */
export async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Generate portfolio content hash for change detection. */
export async function generatePortfolioHash(documents: Document[]): Promise<string> {
  const payload = documents
    .map((d) => `${d.id}\n${d.content}`)
    .sort()
    .join('\n---\n');
  return sha256(payload);
}

/** Single embedding via Gemini embedContent (exact working snippet from RAG demo). */
async function embedContent(
  text: string,
  apiKey: string,
  embeddingModel: string,
): Promise<number[]> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${embeddingModel}:embedContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: {
          parts: [{ text: text.trim() }],
        },
      }),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Embedding API error ${response.status}: ${err}`);
  }

  const data = (await response.json()) as { embedding?: { values?: number[] } };
  const values = data?.embedding?.values;
  if (!Array.isArray(values)) {
    throw new Error('Invalid embedding response: missing embedding.values');
  }
  return values;
}

/** Get query embedding: use 24h cache if present, else call API and store. */
export async function getOrCreateQueryEmbedding(query: string): Promise<number[]> {
  const normalized = normalizeQuery(query);
  const queryHash = await sha256(normalized);
  const key = RAG_KEYS.QUERY_EMBEDDING(queryHash);

  const redis = getRedis();
  const cached = await redis.get(key);
  if (cached != null) {
    const arr = typeof cached === 'string' ? JSON.parse(cached) : cached;
    if (Array.isArray(arr)) return arr;
  }

  const config = getConfig();
  const embedding = await embedContent(normalized, config.geminiApiKey, config.embeddingModel);
  await redis.set(key, JSON.stringify(embedding), { ex: QUERY_EMBEDDING_TTL_SEC });
  return embedding;
}

/** Batch embed documents (one API call per doc to stay within RPM; or batch if endpoint exists). */
export async function batchEmbedDocuments(documents: Document[]): Promise<Map<string, number[]>> {
  const config = getConfig();
  const { geminiApiKey, embeddingModel } = config;
  const results = new Map<string, number[]>();

  for (const doc of documents) {
    const values = await embedContent(doc.content, geminiApiKey, embeddingModel);
    results.set(doc.id, values);
  }

  return results;
}
