import { NextRequest, NextResponse } from 'next/server';
import { fetchUserProfile, fetchUserTweets, fetchUserHighlights } from '@/lib/socialdata';
import { analyzeProfile } from '@/lib/openai';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  console.log('[analyze] POST request received');

  try {
    const body = await request.json();
    const { username } = body;
    console.log('[analyze] Username:', username);

    if (!username || typeof username !== 'string') {
      console.log('[analyze] ERROR: Missing username');
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const cleanUsername = username.replace(/^@/, '').trim();
    console.log('[analyze] Clean username:', cleanUsername);

    if (!/^[a-zA-Z0-9_]{1,15}$/.test(cleanUsername)) {
      console.log('[analyze] ERROR: Invalid username format');
      return NextResponse.json({ error: 'Invalid X/Twitter username format' }, { status: 400 });
    }

    console.log('[analyze] Step 1: Fetching profile...');
    const profile = await fetchUserProfile(cleanUsername);
    console.log('[analyze] Profile fetched:', profile.name, '(@' + profile.screen_name + ')', 'id:', profile.id_str);

    console.log('[analyze] Step 2: Fetching tweets + highlights in parallel...');
    const [tweets, highlights] = await Promise.all([
      fetchUserTweets(profile.id_str),
      fetchUserHighlights(profile.id_str),
    ]);
    console.log('[analyze] Tweets fetched:', tweets.length, '| Highlights fetched:', highlights.length);

    // Merge: highlights first (higher signal), then tweets, deduplicated
    const seenIds = new Set<string>();
    const allTweets = [...highlights, ...tweets].filter((t) => {
      if (seenIds.has(t.id_str)) return false;
      seenIds.add(t.id_str);
      return true;
    });
    console.log('[analyze] Merged unique tweets:', allTweets.length);

    console.log('[analyze] Step 3: Analyzing with OpenAI...');
    const analysis = await analyzeProfile(profile, allTweets, highlights.length);
    console.log('[analyze] Analysis complete:', analysis.interests.length, 'interests,', analysis.ideas.length, 'ideas');

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('[analyze] ERROR:', error);
    const message = error instanceof Error ? error.message : 'Analysis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
