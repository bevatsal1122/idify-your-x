import type { NextRequest } from 'next/server';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const MAX_TRACKED_IPS = 10_000;
const requests = new Map<string, number[]>();

export function getClientIp(request: NextRequest) {
  // These headers must be overwritten by the trusted hosting proxy. Vercel and
  // Cloudflare do this; do not expose the app directly behind an untrusted proxy.
  return request.headers.get('cf-connecting-ip')
    ?? request.headers.get('x-real-ip')
    ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? 'unknown';
}

export function takeRateLimit(ip: string) {
  const now = Date.now();
  const recent = (requests.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfterSeconds: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }

  recent.push(now);
  requests.set(ip, recent);
  if (requests.size > MAX_TRACKED_IPS) {
    for (const [key, timestamps] of requests) {
      if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS) || requests.size > MAX_TRACKED_IPS) requests.delete(key);
      if (requests.size <= MAX_TRACKED_IPS) break;
    }
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

export async function verifyTurnstile(token: unknown, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // Production is deliberately fail-closed until bot verification is configured.
  if (!secret) return process.env.NODE_ENV !== 'production';
  if (typeof token !== 'string' || token.length === 0 || token.length > 4_096) return false;

  try {
    const body = new URLSearchParams({ secret, response: token, remoteip: ip });
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(5_000),
    });
    return response.ok && (await response.json()).success === true;
  } catch {
    return false;
  }
}
