// DEV ONLY - in-memory rate limiting
// WARNING: This will NOT work reliably in production (Vercel/serverless)
// TODO: Migrate to Upstash Redis or Vercel KV for production
// Use IP hash from x-forwarded-for + UA prefix for proper tracking

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) {
      store.delete(key)
    }
  }
}, 60000) // Clean every minute

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Simple in-memory rate limiter (DEV ONLY)
 * @param identifier - Unique identifier (e.g., IP address)
 * @param limit - Max requests allowed per window
 * @param windowMs - Time window in milliseconds
 */
export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000 // 10 minutes
): RateLimitResult {
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry || entry.resetAt < now) {
    // New entry or expired - reset counter
    store.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: now + windowMs,
    }
  }

  // Check if limit exceeded
  if (entry.count >= limit) {
    console.warn(`[Rate Limit] Exceeded for ${identifier}: ${entry.count}/${limit}`)
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.resetAt,
    }
  }

  // Increment counter
  entry.count++
  return {
    success: true,
    limit,
    remaining: limit - entry.count,
    reset: entry.resetAt,
  }
}

/**
 * Get client identifier from request headers
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from common proxy headers
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  
  const ip = forwardedFor?.split(',')[0]?.trim() || realIp || cfConnectingIp || 'unknown'
  const ua = request.headers.get('user-agent')?.substring(0, 50) || 'no-ua'
  
  return `${ip}-${ua}`
}

