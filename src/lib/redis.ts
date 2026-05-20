/**
 * Upstash Redis client (REST API) for Edge compatibility.
 * Lazy init so getConfig() runs only when Redis is first used.
 *
 * RAG data in Redis: document id set, per-doc vectors (`rag:embedding:*`),
 * per-doc content hashes (`rag:doc:hash:*`), corpus fingerprint (`rag:portfolio:hash`),
 * and cached query vectors (`rag:query:embedding:*`). See `RAG_KEYS` in constants.ts.
 */

import { Redis } from '@upstash/redis';
import { getConfig } from './config';

let instance: Redis | null = null;

export function getRedis(): Redis {
  if (!instance) {
    const config = getConfig();
    instance = new Redis({
      url: config.redisUrl,
      token: config.redisToken,
    });
  }
  return instance;
}
