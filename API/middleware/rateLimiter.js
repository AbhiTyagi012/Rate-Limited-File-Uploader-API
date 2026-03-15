/**
 * In-memory sliding-window rate limiter.
 * Allows MAX_UPLOADS requests per WINDOW_MS per IP address.
 * Returns HTTP 429 with a Retry-After header when the limit is exceeded.
 */

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_UPLOADS = 5;

// Map<ip, { count: number, resetAt: number }>
const store = new Map();

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const record = store.get(ip);

  if (!record || now > record.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (record.count >= MAX_UPLOADS) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    res.set("Retry-After", String(retryAfterSeconds));
    return res.status(429).json({
      message: "Rate limit exceeded. Maximum 5 uploads per minute.",
      retryAfter: `${retryAfterSeconds}s`
    });
  }

  record.count++;
  return next();
}

module.exports = { rateLimiter };
