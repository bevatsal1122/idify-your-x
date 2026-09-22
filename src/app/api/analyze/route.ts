import { NextRequest, NextResponse } from 'next/server';
import { fetchUserProfile, fetchUserTweets, fetchUserHighlights } from '@/lib/socialdata';
import { analyzeProfile } from '@/lib/openai';
import { getClientIp, takeRateLimit, verifyTurnstile } from '@/lib/security';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
export const runtime = 'nodejs';

const MAX_BODY_BYTES = 1_024;
const GENERIC_ERROR = 'We could not analyze that profile right now. Please try again.';

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (!Number.isFinite(contentLength) || contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request is too large' }, { status: 413 });
  }

  const ip = getClientIp(request);
  const limit = takeRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many analyses. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds), 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const body = await request.json();
    const { username, turnstileToken } = body ?? {};

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const cleanUsername = username.replace(/^@/, '').trim();

    if (!/^[a-zA-Z0-9_]{1,15}$/.test(cleanUsername)) {
      return NextResponse.json({ error: 'Invalid X/Twitter username format' }, { status: 400 });
    }

    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json(
        { error: 'Verification is required before analyzing a profile.' },
        { status: 403, headers: { 'Cache-Control': 'no-store' } },
      );
    }

    const profile = await fetchUserProfile(cleanUsername);

    const [tweets, highlights] = await Promise.all([
      fetchUserTweets(profile.id_str),
      fetchUserHighlights(profile.id_str),
    ]);
    // Merge: highlights first (higher signal), then tweets, deduplicated
    const seenIds = new Set<string>();
    const allTweets = [...highlights, ...tweets].filter((t) => {
      if (seenIds.has(t.id_str)) return false;
      seenIds.add(t.id_str);
      return true;
    });
    const analysis = await analyzeProfile(profile, allTweets, highlights.length);

    return NextResponse.json(analysis, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    // Keep provider responses, prompt contents, and stack traces out of logs and clients.
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
