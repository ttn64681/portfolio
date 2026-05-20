/**
 * RAG + chat limits and Redis key names.
 *
 * End-to-end chat flow:
 * 1. User sends message → `/api/chat` (Edge).
 * 2. Embed the question (or read cached query vector) → `getOrCreateQueryEmbedding`.
 * 3. Compare query vector to every stored document vector (cosine similarity) → `searchSimilarDocuments`.
 * 4. If Redis is empty or corpus changed → `syncPortfolioEmbeddings` (incremental, batched).
 * 5. Top matching document *text* is injected into the Gemini system prompt → streamed reply.
 *
 * Corpus text is in `src/data/config/rag/`. Vectors + hashes live in Upstash Redis.
 * Pre-warm Redis w/ `npm run rag:sync` so step 4 rarely runs in production.
 */

const RAG_PREFIX = 'rag:';

/** Redis keys used by the vector store and embedding cache. */
export const RAG_KEYS = {
  /** Set of document ids currently in the corpus (`portfolioDocuments[].id`). */
  DOCUMENT_IDS: `${RAG_PREFIX}documents:ids`,
  /** JSON blob: `{ embedding: number[], docId }` for one portfolio chunk. */
  EMBEDDING: (docId: string) => `${RAG_PREFIX}embedding:${docId}`,
  /** SHA-256 of that doc's embed text — if unchanged, skip re-embedding on sync. */
  DOC_CONTENT_HASH: (docId: string) => `${RAG_PREFIX}doc:hash:${docId}`,
  /** SHA-256 of entire corpus (all id+content pairs) — quick "anything changed?" check. */
  PORTFOLIO_HASH: `${RAG_PREFIX}portfolio:hash`,
  /** Cached query vector keyed by hash of normalized user message (24h TTL). */
  QUERY_EMBEDDING: (queryHash: string) => `${RAG_PREFIX}query:embedding:${queryHash}`,
  RATE_LIMIT: (identifier: string) => `ratelimit:${identifier}`,
} as const;

/** Parallel embed calls during sync (1 = sequential, safest for Gemini free tier). */
export const RAG_EMBED_CONCURRENCY = 1;

/** Retries per document when Gemini returns 429 / 5xx (exponential backoff). */
export const RAG_EMBED_MAX_RETRIES = 5;

/** Similarity threshold; results below this are filtered out (cosine similarity). */
export const SIMILARITY_THRESHOLD = 0.5;

/** Query embedding cache TTL in seconds (24 hours). */
export const QUERY_EMBEDDING_TTL_SEC = 24 * 60 * 60;

/** Rate limit: max requests per window (1 minute). */
export const RATE_LIMIT_MAX_REQUESTS = 10;

/** Rate limit: window duration in seconds (1 minute). */
export const RATE_LIMIT_WINDOW_SEC = 60;

/** Max chars for combined context (system prompt + retrieved docs + instructions) before truncation. */
export const MAX_CONTEXT_CHARS = 12000;

/** Max number of recent messages to send to the LLM. */
export const MAX_MESSAGES_FOR_LLM = 6;

/** Max number of retrieved documents to include in context. */
export const MAX_RAG_DOCS = 3;

/** Max request body size in bytes for /api/chat. */
export const MAX_BODY_BYTES = 100 * 1024;

/** Max length per message content (chars) when validating. */
export const MAX_MESSAGE_LENGTH = 8000;
