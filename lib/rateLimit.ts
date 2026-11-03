interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
const MAX_ENTRIES = 5000;
let lastCleanup = Date.now();

function cleanupExpired(force: boolean = false) {
  const now = Date.now();
  if (!force && now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }

  // Evict oldest entries if capacity is still exceeded
  if (rateLimitMap.size > MAX_ENTRIES) {
    const keysToDelete = Array.from(rateLimitMap.keys()).slice(
      0,
      rateLimitMap.size - MAX_ENTRIES,
    );
    for (const key of keysToDelete) {
      rateLimitMap.delete(key);
    }
  }
}

export function isRateLimited(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 1000,
): { limited: boolean; remaining: number; resetInSeconds: number } {
  cleanupExpired(rateLimitMap.size >= MAX_ENTRIES);

  const cleanId = identifier.trim();
  const now = Date.now();
  const record = rateLimitMap.get(cleanId);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(cleanId, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      limited: false,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      limited: true,
      remaining: 0,
      resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  record.count += 1;
  return {
    limited: false,
    remaining: limit - record.count,
    resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
  };
}
