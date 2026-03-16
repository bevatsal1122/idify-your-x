import { NextRequest, NextResponse } from 'next/server';
import { fetchUserProfile, fetchUserTweets } from '@/lib/socialdata';
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

    console.log('[analyze] Step 2: Fetching tweets...');
    const tweets = await fetchUserTweets(profile.id_str);
    console.log('[analyze] Tweets fetched:', tweets.length, 'tweets');

    console.log('[analyze] Step 3: Analyzing with OpenAI...');
    const analysis = await analyzeProfile(profile, tweets);
    console.log('[analyze] Analysis complete:', analysis.interests.length, 'interests,', analysis.ideas.length, 'ideas');

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('[analyze] ERROR:', error);
    const message = error instanceof Error ? error.message : 'Analysis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
