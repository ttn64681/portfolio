/**
 * RAG and chat constants: Redis keys, TTLs (time to live), thresholds, limits.
 */

const RAG_PREFIX = 'rag:';

/** Needed for Redis keys */
export const RAG_KEYS = {
  DOCUMENT_IDS: `${RAG_PREFIX}documents:ids`,
  EMBEDDING: (docId: string) => `${RAG_PREFIX}embedding:${docId}`,
  PORTFOLIO_HASH: `${RAG_PREFIX}portfolio:hash`,
  QUERY_EMBEDDING: (queryHash: string) => `${RAG_PREFIX}query:embedding:${queryHash}`,
  RATE_LIMIT: (identifier: string) => `ratelimit:${identifier}`,
} as const;

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
