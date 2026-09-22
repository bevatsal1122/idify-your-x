import axios from 'axios';
import type { XUserProfile, XTweet } from '@/types';

const API_BASE = 'https://api.socialdata.tools';
const MAX_TWEETS = 50;
const REQUEST_OPTIONS = {
  timeout: 10_000,
  maxRedirects: 0,
  maxContentLength: 1_000_000,
  maxBodyLength: 1_000_000,
};

function getHeaders() {
  const key = process.env.SOCIALDATA_API_KEY;
  if (!key) throw new Error('SOCIALDATA_API_KEY environment variable is not set');
  return {
    Authorization: `Bearer ${key}`,
    Accept: 'application/json',
  };
}

export async function fetchUserProfile(username: string): Promise<XUserProfile> {
  const url = `${API_BASE}/twitter/user/${username}`;
  try {
    const { data } = await axios.get(url, { headers: getHeaders(), ...REQUEST_OPTIONS });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404) throw new Error('User not found. Check the username and try again.');
      if (status === 401) throw new Error('API authentication error. Check your SocialData API key.');
      if (status === 429) throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    throw new Error('Failed to fetch X profile. Please try again.');
  }
}

export async function fetchUserTweets(userId: string): Promise<XTweet[]> {
  const url = `${API_BASE}/twitter/user/${userId}/tweets`;
  try {
    // Fetch only the pages needed for the 50 most recent tweets.
    let allTweets: XTweet[] = [];
    let cursor: string | undefined;

    for (let page = 0; page < 3 && allTweets.length < MAX_TWEETS; page++) {
      const params: Record<string, string> = {};
      if (cursor) params.cursor = cursor;

      const { data } = await axios.get(url, { headers: getHeaders(), params, ...REQUEST_OPTIONS });

      const tweets: XTweet[] = data.tweets || [];
      allTweets = allTweets.concat(tweets);
      cursor = data.next_cursor;
      if (!cursor || tweets.length === 0) break;
    }

    return allTweets.slice(0, MAX_TWEETS);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 429) throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    throw new Error('Failed to fetch tweets. Please try again.');
  }
}

export async function fetchUserHighlights(userId: string): Promise<XTweet[]> {
  const url = `${API_BASE}/twitter/user/${userId}/highlights`;
  try {
    const { data } = await axios.get(url, { headers: getHeaders(), ...REQUEST_OPTIONS });
    const tweets: XTweet[] = data.tweets || [];
    return tweets;
  } catch (error) {
    // Highlights are optional — don't fail the whole flow
    return [];
  }
}
