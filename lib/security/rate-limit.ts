import { NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: number[];
}

const store: RateLimitStore = {};

/**
 * In-memory sliding window rate limiter
 * @param identifier Unique IP or User Identifier
 * @param action Action name (e.g., 'report', 'login', 'delete_account')
 * @param limit Max allowed requests within window
 * @param windowMs Window duration in milliseconds (default 1 minute)
 */
export function rateLimit(
  identifier: string,
  action: string,
  limit: number = 10,
  windowMs: number = 60 * 1000
): { success: boolean; limit: number; remaining: number; reset: number } {
  const key = `${action}:${identifier}`;
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!store[key]) {
    store[key] = [];
  }

  // Filter timestamps within current window
  store[key] = store[key].filter((timestamp) => timestamp > windowStart);

  if (store[key].length >= limit) {
    const oldestTimestamp = store[key][0];
    const resetTime = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    return {
      success: false,
      limit,
      remaining: 0,
      reset: resetTime > 0 ? resetTime : 1,
    };
  }

  store[key].push(now);

  return {
    success: true,
    limit,
    remaining: limit - store[key].length,
    reset: Math.ceil(windowMs / 1000),
  };
}
