/**
 * Upstash Redis client (REST API) for Edge compatibility.
 * Lazy init so getConfig() runs only when Redis is first used.
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
