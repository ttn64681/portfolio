/**
 * Gemini embedding API + hashing helpers.
 *
 * Two embedding paths:
 * - **Corpus** (portfolio chunks): `batchEmbedDocuments` during `npm run rag:sync` or rare runtime sync.
 * - **Query** (user message): `getOrCreateQueryEmbedding` on each chat, with 24h Redis cache.
 */

import type { Document } from '@/types/chat';
import { RAG_EMBED_CONCURRENCY, RAG_EMBED_MAX_RETRIES, RAG_KEYS, QUERY_EMBEDDING_TTL_SEC } from './constants';
import { getConfig } from './config';
import { getRedis } from './redis';

/** Normalize user text before hashing/caching (trim, collapse whitespace). */
export function normalizeQuery(query: string): string {
  return query.trim().replace(/\s+/g, ' ');
}

/** SHA-256 hex digest (Edge-safe via Web Crypto). Used for query cache keys and corpus/doc hashes. */
export async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Corpus-wide fingerprint: hash of every `id + content` (sorted by id).
 * If this differs from `rag:portfolio:hash` in Redis, something in portfolio.ts changed.
 */
export async function generatePortfolioHash(documents: Document[]): Promise<string> {
  const payload = documents
    .map((d) => `${d.id}\n${d.content}`)
    .sort()
    .join('\n---\n');
  return sha256(payload);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const RETRYABLE_STATUS = new Set([429, 500, 502, 503]);

/** Wait longer on rate limits; honor Retry-After when Gemini sends it. */
function retryDelayMs(response: Response, attempt: number): number {
  const retryAfter = response.headers.get('retry-after');
  if (retryAfter) {
    const sec = Number.parseInt(retryAfter, 10);
    if (!Number.isNaN(sec) && sec > 0) return sec * 1000;
  }
  return Math.min(12_000, 400 * 2 ** attempt);
}

/** Single call to Gemini `embedContent` with retries on transient failures. */
async function embedContentWithRetry(
  text: string,
  apiKey: string,
  embeddingModel: string,
): Promise<number[]> {
  let attempt = 0;
  while (true) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${embeddingModel}:embedContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: { parts: [{ text: text.trim() }] },
        }),
      },
    );

    if (response.ok) {
      const data = (await response.json()) as { embedding?: { values?: number[] } };
      const values = data?.embedding?.values;
      if (!Array.isArray(values)) {
        throw new Error('Invalid embedding response: missing embedding.values');
      }
      return values;
    }

    const errBody = await response.text();
    if (!RETRYABLE_STATUS.has(response.status) || attempt >= RAG_EMBED_MAX_RETRIES - 1) {
      throw new Error(`Embedding API error ${response.status}: ${errBody}`);
    }

    await sleep(retryDelayMs(response, attempt));
    attempt += 1;
  }
}

/**
 * Embed the user's latest message. Checks Redis first (`rag:query:embedding:{hash}`).
 * Cheap on repeat questions; does not touch portfolio document vectors.
 */
export async function getOrCreateQueryEmbedding(query: string): Promise<number[]> {
  const normalized = normalizeQuery(query);
  const queryHash = await sha256(normalized);
  const key = RAG_KEYS.QUERY_EMBEDDING(queryHash);

  const redis = getRedis();
  const cached = await redis.get(key);
  if (cached != null) {
    const arr = typeof cached === 'string' ? JSON.parse(cached) : cached;
    if (Array.isArray(arr)) return arr as number[];
  }

  const config = getConfig();
  const embedding = await embedContentWithRetry(
    normalized,
    config.geminiApiKey,
    config.embeddingModel,
  );
  await redis.set(key, JSON.stringify(embedding), { ex: QUERY_EMBEDDING_TTL_SEC });
  return embedding;
}

export type BatchEmbedOptions = {
  /** Parallel requests per wave (default `RAG_EMBED_CONCURRENCY`, usually 1). */
  concurrency?: number;
  onProgress?: (done: number, total: number, docId: string) => void;
};

/** Embed many portfolio documents (used by sync). Sequential by default + per-doc retry. */
export async function batchEmbedDocuments(
  documents: Document[],
  options: BatchEmbedOptions = {},
): Promise<Map<string, number[]>> {
  const config = getConfig();
  const { geminiApiKey, embeddingModel } = config;
  const concurrency = Math.max(1, options.concurrency ?? RAG_EMBED_CONCURRENCY);
  const results = new Map<string, number[]>();
  let done = 0;

  const embedOne = async (doc: Document) => {
    const values = await embedContentWithRetry(doc.content, geminiApiKey, embeddingModel);
    results.set(doc.id, values);
    done += 1;
    options.onProgress?.(done, documents.length, doc.id);
  };

  // 
  for (let i = 0; i < documents.length; i += concurrency) {
    const wave = documents.slice(i, i + concurrency); 
    await Promise.all(wave.map(embedOne));
  }

  return results;
}
