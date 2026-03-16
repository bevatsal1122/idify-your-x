import OpenAI from 'openai';
import type { XUserProfile, XTweet, AnalysisResult } from '@/types';

function getClient() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY environment variable is not set');
  console.log('[openai] API key present, length:', key.length);
  return new OpenAI({ apiKey: key });
}

const SYSTEM_PROMPT = `You are an expert startup advisor, trend analyst, and business strategist. Given a Twitter/X user's profile and recent tweets, analyze their interests, expertise, and potential business opportunities.

Your task:
1. Identify 4-8 key interest clusters from their bio and tweets (e.g., "indie hacking", "remote work", "AI/ML", "travel")
2. For each interest, provide a confidence score (0.0-1.0) and specific evidence quotes from their tweets or bio
3. Generate 5-8 creative, actionable startup/business ideas tailored to their unique combination of interests and expertise
4. For each idea, explain WHY this person specifically should build it, citing specific tweets or bio elements as evidence
5. Write a one-paragraph summary of who this person is and what makes them unique

Return a JSON object with this EXACT structure:
{
  "interests": [
    {
      "name": "string - interest name",
      "confidence": 0.0-1.0,
      "evidence": ["string - direct quote or paraphrase from tweets/bio"]
    }
  ],
  "ideas": [
    {
      "title": "string - concise idea name (3-6 words)",
      "description": "string - 2-3 sentence pitch of the idea",
      "category": "string - one of: SaaS, Marketplace, Creator Tool, Community, Agency, Info Product, Hardware, Mobile App, Browser Extension, API Service",
      "difficulty": "low | medium | high",
      "reasoning": "string - why this person should build this, referencing their specific skills and interests",
      "evidence": [
        {
          "source": "bio | tweet | pinned_tweet",
          "text": "string - the actual text that inspired this idea"
        }
      ],
      "monetization": "string - suggested revenue model in one sentence"
    }
  ],
  "summary": "string - one paragraph personality and expertise summary"
}

Be specific, creative, and practical. Ideas should be things this person could realistically start building today. Avoid generic suggestions - make them deeply personal to this user's interests and expertise.`;

export async function analyzeProfile(
  profile: XUserProfile,
  tweets: XTweet[],
  highlightsCount: number = 0,
): Promise<AnalysisResult> {
  console.log('[openai] Starting analysis for @' + profile.screen_name);
  const client = getClient();

  // Mark highlights (they come first in the merged array)
  const tweetTexts = tweets
    .map((t, i) => {
      const isHighlight = i < highlightsCount;
      const prefix = isHighlight ? '[HIGHLIGHT] ' : '';
      return `${prefix}Tweet ${i + 1} [${t.favorite_count} likes, ${t.retweet_count} RTs]: ${t.full_text}`;
    })
    .join('\n\n');

  const highlightNote = highlightsCount > 0
    ? `\n\nNote: ${highlightsCount} tweets are marked [HIGHLIGHT] — these are tweets the user chose to highlight on their profile, meaning they consider them especially important or representative of who they are. Weigh these more heavily in your analysis.`
    : '';

  const userMessage = `Analyze this X/Twitter profile:

**Name:** ${profile.name}
**Username:** @${profile.screen_name}
**Bio:** ${profile.description || 'No bio'}
**Location:** ${profile.location || 'Not specified'}
**Followers:** ${profile.followers_count.toLocaleString()}
**Following:** ${profile.friends_count.toLocaleString()}
**Total Tweets:** ${profile.statuses_count.toLocaleString()}

---

**Tweets analyzed (${tweets.length} total${highlightsCount > 0 ? `, including ${highlightsCount} highlights` : ''}):**

${tweetTexts || 'No recent tweets available.'}${highlightNote}`;

  console.log('[openai] User message length:', userMessage.length, 'chars');
  console.log('[openai] Calling GPT-4o...');

  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.8,
    max_tokens: 4000,
  });

  console.log('[openai] Response received, usage:', JSON.stringify(completion.usage));
  console.log('[openai] Finish reason:', completion.choices[0]?.finish_reason);

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error('No response from AI. Please try again.');

  console.log('[openai] Response content length:', content.length, 'chars');
  console.log('[openai] Response preview:', content.substring(0, 200));

  const parsed = JSON.parse(content);
  console.log('[openai] Parsed interests:', parsed.interests?.length, 'ideas:', parsed.ideas?.length);

  return {
    profile: {
      name: profile.name,
      username: profile.screen_name,
      avatar: profile.profile_image_url_https?.replace('_normal', '_400x400') || '',
      banner: profile.profile_banner_url || undefined,
      bio: profile.description || '',
      followers: profile.followers_count,
      following: profile.friends_count,
      location: profile.location,
    },
    interests: parsed.interests || [],
    ideas: parsed.ideas || [],
    summary: parsed.summary || '',
    analyzedTweetsCount: tweets.length,
    analyzedHighlightsCount: highlightsCount,
  };
}
