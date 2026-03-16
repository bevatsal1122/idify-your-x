export interface XUserProfile {
  id_str: string;
  name: string;
  screen_name: string;
  description: string;
  profile_image_url_https: string;
  profile_banner_url?: string;
  followers_count: number;
  friends_count: number;
  statuses_count: number;
  location?: string;
  url?: string;
  verified: boolean;
  created_at: string;
}

export interface XTweet {
  id_str: string;
  full_text: string;
  created_at: string;
  favorite_count: number;
  retweet_count: number;
}

export interface DetectedInterest {
  name: string;
  confidence: number;
  evidence: string[];
}

export interface GeneratedIdea {
  title: string;
  description: string;
  category: string;
  difficulty: 'low' | 'medium' | 'high';
  reasoning: string;
  evidence: IdeaEvidence[];
  monetization: string;
}

export interface IdeaEvidence {
  source: 'bio' | 'tweet' | 'pinned_tweet';
  text: string;
}

export interface AnalysisResult {
  profile: {
    name: string;
    username: string;
    avatar: string;
    banner?: string;
    bio: string;
    followers: number;
    following: number;
    location?: string;
  };
  interests: DetectedInterest[];
  ideas: GeneratedIdea[];
  summary: string;
  analyzedTweetsCount: number;
  analyzedHighlightsCount: number;
}

export type AppState = 'idle' | 'loading' | 'results' | 'error';

export interface AnalysisError {
  message: string;
  code?: string;
}
