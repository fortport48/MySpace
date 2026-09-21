import { NextResponse } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory rate limiting store
const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((record, key) => {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitOptions {
  limit?: number; // Max requests allowed per window (default: 10)
  windowMs?: number; // Time window in milliseconds (default: 60,000ms = 1 minute)
}

export interface RateLimitResult {
  isAllowed: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
}

/**
  * Evaluates rate limiting for incoming request based on client IP address.
  */
export function checkRateLimit(
  req: Request,
  options: RateLimitOptions = {}
): RateLimitResult {
  const limit = options.limit || 10;
  const windowMs = options.windowMs || 60 * 1000;
  const now = Date.now();

  // Extract IP address from request headers
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : realIp
    ? realIp.trim()
    : '127.0.0.1';

  const key = `${ip}:${new URL(req.url).pathname}`;
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // New window or expired record
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      isAllowed: true,
      limit,
      remaining: limit - 1,
      resetMs: windowMs,
    };
  }

  // Existing valid window
  if (record.count >= limit) {
    return {
      isAllowed: false,
      limit,
      remaining: 0,
      resetMs: record.resetTime - now,
    };
  }

  record.count += 1;
  rateLimitMap.set(key, record);

  return {
    isAllowed: true,
    limit,
    remaining: limit - record.count,
    resetMs: record.resetTime - now,
  };
}

/**
  * Utility helper to return a HTTP 429 response when rate limited.
  */
export function rateLimitResponse(result: RateLimitResult) {
  return NextResponse.json(
    {
      error: 'Too many requests. Please slow down and try again shortly.',
      retryAfterSeconds: Math.ceil(result.resetMs / 1000),
    },
    {
      status: 429,
      headers: {
        'Retry-After': Math.ceil(result.resetMs / 1000).toString(),
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
      },
    }
  );
}
