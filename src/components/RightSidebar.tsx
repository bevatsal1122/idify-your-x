'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const TRENDS = [
  { category: 'Business · Trending', topic: '#BuildInPublic', posts: '45.1K posts' },
  { category: 'Technology · Trending', topic: 'OpenAI', posts: '125K posts' },
  { category: 'Trending', topic: 'Startup Ideas', posts: '89.2K posts' },
  { category: 'Technology · Trending', topic: 'Indie Hackers', posts: '32.8K posts' },
  { category: 'Business · Trending', topic: 'SaaS', posts: '28.4K posts' },
];

const WHO_TO_FOLLOW = [
  { name: 'Pieter Levels', handle: '@levelsio', emoji: '🚀' },
  { name: 'Naval', handle: '@naval', emoji: '🧭' },
  { name: 'Paul Graham', handle: '@paulg', emoji: '📝' },
];

const PREMIUM_MESSAGES = [
  "You're already premium in our hearts. ❤️",
  'Your personality is premium enough. ✨',
  'Premium? In THIS economy? 😂',
  'Subscribe with 3 easy payments of your dignity.',
  'Error: Wallet not found. 💸',
  'You clicked it. Now Elon knows.',
  'Premium activated! Just kidding. 🎭',
];

const FOLLOW_REACTIONS = [
  'They just followed you back! (not really)',
  "They saw this and smiled. (we think)",
  'Friendship request sent to the void. 🕳️',
  "You're basically best friends now.",
];

const UNFOLLOW_REACTIONS = [
  "They'll be devastated. Absolutely wrecked. 😭",
  'The sound of a heart breaking... 💔',
  'They just refreshed their follower count. Ouch.',
  '*sad trombone noises* 🎺',
];

const SEARCH_PLACEHOLDERS = [
  'Search',
  'Search for meaning...',
  'Google is the other tab',
  'The answer is 42',
  'Search your feelings',
  'Have you tried turning it off and on?',
];

export function RightSidebar() {
  const [premiumMsg, setPremiumMsg] = useState<string | null>(null);
  const [premiumIndex, setPremiumIndex] = useState(0);
  const [followState, setFollowState] = useState<Record<string, boolean>>({});
  const [followToast, setFollowToast] = useState<string | null>(null);
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search');
  const [searchClicks, setSearchClicks] = useState(0);

  // Auto-hide toasts
  useEffect(() => {
    if (!premiumMsg) return;
    const t = setTimeout(() => setPremiumMsg(null), 2500);
    return () => clearTimeout(t);
  }, [premiumMsg]);

  useEffect(() => {
    if (!followToast) return;
    const t = setTimeout(() => setFollowToast(null), 2500);
    return () => clearTimeout(t);
  }, [followToast]);

  const handlePremium = () => {
    setPremiumMsg(PREMIUM_MESSAGES[premiumIndex % PREMIUM_MESSAGES.length]);
    setPremiumIndex((prev) => prev + 1);
  };

  const handleFollow = (handle: string) => {
    const isFollowing = followState[handle];
    setFollowState((prev) => ({ ...prev, [handle]: !isFollowing }));

    if (isFollowing) {
      const msg = UNFOLLOW_REACTIONS[Math.floor(Math.random() * UNFOLLOW_REACTIONS.length)];
      setFollowToast(msg);
    } else {
      const msg = FOLLOW_REACTIONS[Math.floor(Math.random() * FOLLOW_REACTIONS.length)];
      setFollowToast(msg);
    }
  };

  const handleSearchFocus = () => {
    const next = (searchClicks + 1) % SEARCH_PLACEHOLDERS.length;
    setSearchClicks(next);
    setSearchPlaceholder(SEARCH_PLACEHOLDERS[next]);
  };

  return (
    <aside className="sticky top-0 h-screen ml-7 hidden lg:block">
      <div className="w-[350px] py-1 relative">
        {/* Follow toast */}
        {followToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 bg-x-blue text-white text-[14px] rounded-2xl animate-slide-up z-50 whitespace-nowrap">
            {followToast}
          </div>
        )}

        {/* Search — placeholder changes on click */}
        <div className="sticky top-0 pt-1 pb-3 bg-x-bg z-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-x-secondary" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              onFocus={handleSearchFocus}
              className="w-full bg-[#202327] rounded-full py-3 pl-12 pr-4 text-[15px] text-x-text placeholder:text-x-secondary border border-transparent focus:border-x-blue focus:bg-x-bg focus:outline-none"
              readOnly
            />
          </div>
        </div>

        {/* Subscribe to Premium — funny messages */}
        <div className="bg-x-bg border border-x-border rounded-2xl p-4 mb-4 relative overflow-hidden">
          <h2 className="text-[20px] font-extrabold text-x-text mb-1">Upgrade to Premium+</h2>
          <p className="text-[15px] text-x-text leading-5 mb-3">
            Enjoy additional benefits, zero ads and the largest reply prioritization.
          </p>
          <button
            onClick={handlePremium}
            className="px-4 py-1.5 bg-white hover:bg-white/90 text-black font-extrabold text-[15px] rounded-full transition-colors cursor-pointer active:scale-95"
          >
            Upgrade to Premium+
          </button>
          {premiumMsg && (
            <div className="mt-3 px-3 py-2 bg-[#202327] rounded-xl text-[14px] text-x-text animate-slide-up">
              {premiumMsg}
            </div>
          )}
        </div>

        {/* What's happening */}
        <div className="bg-x-bg border border-x-border rounded-2xl overflow-hidden mb-4">
          <h2 className="text-[20px] font-extrabold text-x-text px-4 py-3">What&apos;s happening</h2>
          {TRENDS.map((trend) => (
            <div
              key={trend.topic}
              className="px-4 py-3 hover:bg-[#080808] transition-colors cursor-pointer"
            >
              <p className="text-[13px] text-x-secondary leading-4">{trend.category}</p>
              <p className="text-[15px] font-bold text-x-text leading-5">{trend.topic}</p>
              <p className="text-[13px] text-x-secondary leading-4">{trend.posts}</p>
            </div>
          ))}
          <div className="px-4 py-3 hover:bg-[#080808] transition-colors cursor-pointer">
            <span className="text-[15px] text-x-blue">Show more</span>
          </div>
        </div>

        {/* Who to follow — follow/unfollow with reactions */}
        <div className="bg-x-bg border border-x-border rounded-2xl overflow-hidden mb-4">
          <h2 className="text-[20px] font-extrabold text-x-text px-4 py-3">You might like</h2>
          {WHO_TO_FOLLOW.map((user) => {
            const isFollowing = followState[user.handle] || false;
            return (
              <div
                key={user.handle}
                className="px-4 py-3 hover:bg-[#080808] transition-colors cursor-pointer flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-x-panel flex items-center justify-center text-lg">
                  {user.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-x-text truncate">{user.name}</p>
                  <p className="text-[15px] text-x-secondary truncate">{user.handle}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFollow(user.handle);
                  }}
                  className={`px-4 py-1.5 font-bold text-[14px] rounded-full transition-all cursor-pointer active:scale-95 ${
                    isFollowing
                      ? 'bg-transparent border border-x-border text-x-text hover:border-x-red hover:text-x-red'
                      : 'bg-x-text text-x-bg hover:opacity-90'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
          <div className="px-4 py-3 hover:bg-[#080808] transition-colors cursor-pointer">
            <span className="text-[15px] text-x-blue">Show more</span>
          </div>
        </div>

        {/* Footer links */}
        <div className="px-4 py-3">
          <p className="text-[13px] text-x-secondary leading-5">
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            {' | '}
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            {' | '}
            <span className="hover:underline cursor-pointer">Cookie Policy</span>
            {' | '}
            <span className="hover:underline cursor-pointer">Accessibility</span>
            {' | '}
            <span className="hover:underline cursor-pointer">Ads info</span>
            {' | '}
            <span className="hover:underline cursor-pointer">More ...</span>
            {' | '}
            <span>&copy; 2026 X Corp.</span>
          </p>
          <p className="text-[13px] text-x-tertiary mt-2 leading-5">
            Built by{' '}
            <a href="https://x.com/xvatsall" target="_blank" rel="noopener noreferrer" className="text-x-blue hover:underline">
              @xvatsall
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}
