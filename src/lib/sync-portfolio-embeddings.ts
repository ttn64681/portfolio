/**
 * Sync portfolio corpus vectors into Redis (run via npm run rag:sync).
 *
 * Flow:
 *   1. Figure out which docs need a fresh Gemini embed
 *   2. Embed those docs and write rag:embedding:{id}
 *   3. Update the registry (id list, content hashes, corpus fingerprint)
 */

import type { Document } from '@/types/chat';
import { RAG_EMBED_CONCURRENCY, RAG_KEYS } from './constants';
import { parseStoredEmbedding } from './embedding-parse';
import { batchEmbedDocuments, generatePortfolioHash, type BatchEmbedOptions } from './embeddings';
import { documentContentHash } from './embed-doc-hash';
import { getRedis } from './redis';

export type SyncPortfolioOptions = BatchEmbedOptions & {
  /** Re-embed every doc, even when hash and vector already look fine. */
  force?: boolean;
};

// --- Step 1 helper: which docs actually need Gemini? ---

async function findDocumentsToEmbed(documents: Document[], force: boolean): Promise<Document[]> {
  if (force) return [...documents];

  const redis = getRedis();
  const localHashes = await Promise.all(documents.map((d) => documentContentHash(d)));

  // Batch-read Redis: for each doc we queue two GETs (content hash, then embedding vector).
  // pipeline.exec() returns one flat array in the same order, e.g. for 3 docs:
  //   [hash0, emb0, hash1, emb1, hash2, emb2]
  // so doc i uses stored[i * 2] for hash and stored[i * 2 + 1] for embedding.
  const pipeline = redis.pipeline();
  for (const doc of documents) {
    pipeline.get(RAG_KEYS.DOC_CONTENT_HASH(doc.id));
    pipeline.get(RAG_KEYS.EMBEDDING(doc.id));
  }
  const stored = (await pipeline.exec()) as unknown[];

  const toEmbed: Document[] = [];
  for (let i = 0; i < documents.length; i++) {
    const hashRaw = stored[i * 2];
    const embRaw = stored[i * 2 + 1];
    const storedStr =
      typeof hashRaw === 'string' ? hashRaw : hashRaw != null ? String(hashRaw) : null;
    const hashMismatch = storedStr !== localHashes[i];
    const embeddingMissing = parseStoredEmbedding(embRaw) == null;
    if (hashMismatch || embeddingMissing) {
      toEmbed.push(documents[i]);
    }
  }
  return toEmbed;
}

// --- Step 3 helper: refresh metadata after vectors are written ---

async function finalizeRegistry(documents: Document[], hashes: string[]): Promise<void> {
  const redis = getRedis();
  const docIds = documents.map((d) => d.id);
  const pipeline = redis.pipeline();

  // Drop vectors for docs removed from the corpus
  const existing = await redis.smembers(RAG_KEYS.DOCUMENT_IDS);
  const current = new Set(docIds);
  for (const oldId of existing) {
    if (!current.has(oldId)) {
      pipeline.del(RAG_KEYS.EMBEDDING(oldId));
      pipeline.del(RAG_KEYS.DOC_CONTENT_HASH(oldId));
    }
  }

  // Rewrite the id set and per-doc hashes; set corpus-wide fingerprint
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

// --- Main sync entry (npm run rag:sync / CI / rare runtime repair) ---

export async function syncPortfolioEmbeddings(
  documents: Document[],
  options: SyncPortfolioOptions = {},
): Promise<{ embedded: number; skipped: number }> {
  if (documents.length === 0) {
    return { embedded: 0, skipped: 0 };
  }

  const concurrency = options.concurrency ?? RAG_EMBED_CONCURRENCY;
  const allHashes = await Promise.all(documents.map((d) => documentContentHash(d)));
  const toEmbed = await findDocumentsToEmbed(documents, options.force ?? false);

  // Step 2: call Gemini only for docs that changed or are missing a vector
  if (toEmbed.length > 0) {
    const embeddings = await batchEmbedDocuments(toEmbed, {
      concurrency,
      onProgress: options.onProgress,
    });

    const redis = getRedis();
    const pipeline = redis.pipeline();
    for (const [docId, values] of embeddings) {
      pipeline.set(RAG_KEYS.EMBEDDING(docId), JSON.stringify({ embedding: values, docId }));
    }
    await pipeline.exec();
  }

  // Step 3: always refresh registry so id list and hashes match current corpus
  await finalizeRegistry(documents, allHashes);
  return { embedded: toEmbed.length, skipped: documents.length - toEmbed.length };
}
