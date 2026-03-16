import axios from 'axios';
import type { XUserProfile, XTweet } from '@/types';

const API_BASE = 'https://api.socialdata.tools';

function getHeaders() {
  const key = process.env.SOCIALDATA_API_KEY;
  if (!key) throw new Error('SOCIALDATA_API_KEY environment variable is not set');
  console.log('[socialdata] API key present, length:', key.length);
  return {
    Authorization: `Bearer ${key}`,
    Accept: 'application/json',
  };
}

export async function fetchUserProfile(username: string): Promise<XUserProfile> {
  const url = `${API_BASE}/twitter/user/${username}`;
  console.log('[socialdata] Fetching profile:', url);

  try {
    const { data, status } = await axios.get(url, { headers: getHeaders() });
    console.log('[socialdata] Profile response status:', status);
    console.log('[socialdata] Profile data keys:', Object.keys(data));
    console.log('[socialdata] Profile id_str:', data.id_str, 'screen_name:', data.screen_name);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      console.error('[socialdata] Profile fetch error, status:', status);
      console.error('[socialdata] Response data:', JSON.stringify(error.response?.data));
      if (status === 404) throw new Error('User not found. Check the username and try again.');
      if (status === 401) throw new Error('API authentication error. Check your SocialData API key.');
      if (status === 429) throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    console.error('[socialdata] Profile fetch error:', error);
    throw new Error('Failed to fetch X profile. Please try again.');
  }
}

export async function fetchUserTweets(userId: string): Promise<XTweet[]> {
  const url = `${API_BASE}/twitter/user/${userId}/tweets`;
  console.log('[socialdata] Fetching tweets:', url);

  try {
    // Fetch up to 3 pages (~60 tweets)
    let allTweets: XTweet[] = [];
    let cursor: string | undefined;

    for (let page = 0; page < 3; page++) {
      const params: Record<string, string> = {};
      if (cursor) params.cursor = cursor;

      const { data, status } = await axios.get(url, { headers: getHeaders(), params });
      console.log('[socialdata] Tweets page', page + 1, 'status:', status);
      console.log('[socialdata] Tweets data keys:', Object.keys(data));

      const tweets: XTweet[] = data.tweets || [];
      allTweets = allTweets.concat(tweets);
      console.log('[socialdata] Page tweets:', tweets.length, 'total so far:', allTweets.length);

      cursor = data.next_cursor;
      if (!cursor || tweets.length === 0) break;
    }

    if (allTweets.length > 0) {
      console.log('[socialdata] First tweet sample:', allTweets[0].full_text?.substring(0, 100));
    }
    return allTweets.slice(0, 50);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      console.error('[socialdata] Tweets fetch error, status:', status);
      console.error('[socialdata] Response data:', JSON.stringify(error.response?.data));
      if (status === 429) throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    console.error('[socialdata] Tweets fetch error:', error);
    throw new Error('Failed to fetch tweets. Please try again.');
  }
}
