/**
 * Env-based config for RAG and chat. Used by route, vector-store, embeddings.
 * Required env vars: GOOGLE_GENERATIVE_AI_API_KEY, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
 */

import {
  MAX_CONTEXT_CHARS,
  MAX_MESSAGES_FOR_LLM,
  MAX_RAG_DOCS,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_SEC,
  SIMILARITY_THRESHOLD,
} from './constants';

function getEnv(key: string): string | undefined {
  return process.env[key];
}

function requireEnv(key: string): string {
  const value = getEnv(key);
  if (value == null || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value.trim();
}

/** Validate required env and return config. Call at first use in route/lib. */
export function getConfig() {
  return {
    geminiApiKey: requireEnv('GOOGLE_GENERATIVE_AI_API_KEY'),
    redisUrl: requireEnv('UPSTASH_REDIS_REST_URL'),
    redisToken: requireEnv('UPSTASH_REDIS_REST_TOKEN'),
    geminiModel: getEnv('GEMINI_MODEL')?.trim() || 'gemini-2.5-flash',
    embeddingModel: getEnv('GEMINI_EMBEDDING_MODEL')?.trim() || 'text-embedding-004',
    allowedDomain: getEnv('ALLOWED_DOMAIN')?.trim() || '',
    rateLimitMax: RATE_LIMIT_MAX_REQUESTS,
    rateLimitWindowSec: RATE_LIMIT_WINDOW_SEC,
    similarityThreshold: SIMILARITY_THRESHOLD,
    maxContextChars: MAX_CONTEXT_CHARS,
    maxMessagesForLLM: MAX_MESSAGES_FOR_LLM,
    maxRagDocs: MAX_RAG_DOCS,
  };
}

export type AppConfig = ReturnType<typeof getConfig>;
