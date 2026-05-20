/**
 * Writes portfolio embeddings to Redis (incremental sync).
 *
 * Run via `npm run rag:sync` after editing `src/data/config/rag/`.
 *
 * ## What sync does
 * 1. For each document, compare `documentContentHash(doc)` to `rag:doc:hash:{id}` in Redis.
 * 2. Call Gemini only for **changed or new** docs; skip unchanged.
 * 3. `SET rag:embedding:{id}` for each updated vector (30-day TTL).
 * 4. Refresh `rag:documents:ids`, per-doc hashes, and `rag:portfolio:hash`.
 * 5. `DEL` embedding + doc-hash keys for ids removed from the corpus (e.g. old `game-jams`).
 *
 * Renaming a document `id` = new embed + old key cleaned up on next sync.
 */

import type { Document } from '@/types/chat';
import { RAG_EMBED_CONCURRENCY, RAG_KEYS } from './constants';
import { batchEmbedDocuments, generatePortfolioHash, type BatchEmbedOptions } from './embeddings';
import { documentContentHash } from './embed-doc-hash';
import { getRedis } from './redis';

const EMBEDDING_TTL_SEC = 60 * 60 * 24 * 30;

export type SyncPortfolioOptions = BatchEmbedOptions;

/** Compare local hashes to Redis in one pipeline round-trip. */
async function findChangedDocuments(documents: Document[]): Promise<Document[]> {
  const redis = getRedis();
  const localHashes = await Promise.all(documents.map((d) => documentContentHash(d)));

  const pipeline = redis.pipeline();
  for (const doc of documents) {
    pipeline.get(RAG_KEYS.DOC_CONTENT_HASH(doc.id));
  }
  const stored = (await pipeline.exec()) as unknown[];

  const changed: Document[] = [];
  for (let i = 0; i < documents.length; i++) {
    const raw = stored[i];
    const storedStr = typeof raw === 'string' ? raw : raw != null ? String(raw) : null;
    if (storedStr !== localHashes[i]) changed.push(documents[i]);
  }
  return changed;
}

/** Update id set, per-doc hashes, corpus hash; remove Redis keys for deleted ids. */
async function finalizeRegistry(documents: Document[], hashes: string[]): Promise<void> {
  const redis = getRedis();
  const docIds = documents.map((d) => d.id);
  const pipeline = redis.pipeline();

  const existing = await redis.smembers(RAG_KEYS.DOCUMENT_IDS);
  const current = new Set(docIds);
  for (const oldId of existing) {
    if (!current.has(oldId)) {
      pipeline.del(RAG_KEYS.EMBEDDING(oldId));
      pipeline.del(RAG_KEYS.DOC_CONTENT_HASH(oldId));
    }
  }

  pipeline.del(RAG_KEYS.DOCUMENT_IDS);
  if (docIds.length > 0) {
    pipeline.sadd(RAG_KEYS.DOCUMENT_IDS, docIds[0], ...docIds.slice(1));
  }

  documents.forEach((doc, i) => {
    pipeline.set(RAG_KEYS.DOC_CONTENT_HASH(doc.id), hashes[i]);
  });

  pipeline.set(RAG_KEYS.PORTFOLIO_HASH, await generatePortfolioHash(documents));
  await pipeline.exec();
}

/** Main entry: embed changed docs only, then finalize registry. */
export async function syncPortfolioEmbeddings(
  documents: Document[],
  options: SyncPortfolioOptions = {},
): Promise<{ embedded: number; skipped: number }> {
  if (documents.length === 0) {
    return { embedded: 0, skipped: 0 };
  }

  const concurrency = options.concurrency ?? RAG_EMBED_CONCURRENCY;
  const allHashes = await Promise.all(documents.map((d) => documentContentHash(d))); // execute all promises in parallel
  const changed = await findChangedDocuments(documents); // array of docs that have changed

  if (changed.length > 0) {
    const embeddings = await batchEmbedDocuments(changed, {
      concurrency,
      onProgress: options.onProgress,
    }); // returns map of docId to embedding
    const redis = getRedis();
    const pipeline = redis.pipeline();
    for (const [docId, values] of embeddings) { // set each embedding in Redis 
      pipeline.set(RAG_KEYS.EMBEDDING(docId), JSON.stringify({ embedding: values, docId }), { 
        ex: EMBEDDING_TTL_SEC,
      }); // set the embedding in Redis with a 30-day TTL
    }
    await pipeline.exec(); // execute the pipeline
  }

  await finalizeRegistry(documents, allHashes);
  return { embedded: changed.length, skipped: documents.length - changed.length };
}
