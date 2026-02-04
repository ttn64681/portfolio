/**
 * IP-based rate limiting using Upstash Redis. Fail-open on Redis errors.
 * Used by /api/chat to stay under Gemini free-tier RPM.
 */

import { RAG_KEYS, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_SEC } from './constants';
import { getRedis } from './redis';

export class RateLimitError extends Error {
  constructor(
    message: string,
    public retryAfter: number,
    public resetAt: number
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
  retryAfter: number;
};

/**
 * Check and consume one request for the identifier (e.g. IP).
 * Returns success: false if over limit; fail-open on Redis errors (success: true).
 */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const key = RAG_KEYS.RATE_LIMIT(identifier);
  const now = Math.floor(Date.now() / 1000);
  const windowEnd = now + RATE_LIMIT_WINDOW_SEC;

  try {
    const redis = getRedis();
    const raw = await redis.get(key);
    type Stored = { count: number; resetAt: number };
    const parsed: Stored | null =
      raw == null ? null : typeof raw === 'string' ? JSON.parse(raw) : (raw as Stored);

    if (parsed == null) {
      await redis.set(key, JSON.stringify({ count: 1, resetAt: windowEnd }), {
        ex: RATE_LIMIT_WINDOW_SEC,
      });
      return {
        success: true,
        remaining: RATE_LIMIT_MAX_REQUESTS - 1,
        resetAt: windowEnd,
        retryAfter: RATE_LIMIT_WINDOW_SEC,
      };
    }

    const { count, resetAt } = parsed;
    if (count >= RATE_LIMIT_MAX_REQUESTS) {
      const retryAfter = Math.max(0, resetAt - now);
      return {
        success: false,
        remaining: 0,
        resetAt,
        retryAfter,
      };
    }

    await redis.set(key, JSON.stringify({ count: count + 1, resetAt }), {
      ex: RATE_LIMIT_WINDOW_SEC,
    });
    return {
      success: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - count - 1,
      resetAt,
      retryAfter: RATE_LIMIT_WINDOW_SEC,
    };
  } catch {
    return {
      success: true,
      remaining: RATE_LIMIT_MAX_REQUESTS,
      resetAt: now + RATE_LIMIT_WINDOW_SEC,
      retryAfter: RATE_LIMIT_WINDOW_SEC,
    };
  }
}
