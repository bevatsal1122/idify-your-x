'use client';

import { useEffect, useState, useMemo } from 'react';
import { User, MessageSquare, Brain, Lightbulb, Check, Twitter, TrendingUp, Zap } from 'lucide-react';
import { IdifyAvatar } from './IdifyAvatar';

const STEPS = [
  { label: 'Fetching profile', emoji: '👤', icon: User, duration: 2500 },
  { label: 'Reading tweets', emoji: '🐦', icon: MessageSquare, duration: 3500 },
  { label: 'Analyzing interests', emoji: '🧠', icon: Brain, duration: 5000 },
  { label: 'Generating ideas', emoji: '💡', icon: Lightbulb, duration: 0 },
];

const FUN_FACTS = [
  { text: 'Did you know the first tweet was "just setting up my twttr"?', emoji: '🐣' },
  { text: 'The average person scrolls 300 feet of content per day...', emoji: '📱' },
  { text: 'Over 500 million tweets are sent every single day.', emoji: '🌊' },
  { text: 'Fun fact: Twitter was almost called "FriendStalker".', emoji: '👀' },
  { text: 'The most liked tweet ever has 4.3 million likes.', emoji: '❤️' },
  { text: 'Our AI reads tweets faster than your ex stalks your profile.', emoji: '🏃' },
  { text: "We promise we're not judging your tweets. Much.", emoji: '🤫' },
  { text: 'Turning your hot takes into hot startups...', emoji: '🔥' },
  { text: "Analyzing your vibe... it's immaculate.", emoji: '✨' },
  { text: 'Finding business ideas in your shitposts...', emoji: '💎' },
  { text: 'If your tweets were a startup pitch, would VCs fund it?', emoji: '💰' },
  { text: 'Connecting the dots between your 3am thoughts...', emoji: '🌙' },
];

const TWEET_PREVIEWS = [
  'Looks like they tweet a lot about tech...',
  'Found some interesting patterns here...',
  'This profile has strong opinions...',
  'Detecting a serial entrepreneur vibe...',
  'Their tweet game is strong...',
  'AI is connecting the dots...',
];

interface Props {
  username: string;
}

export function LoadingState({ username }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [funFactIndex, setFunFactIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tweetPreview, setTweetPreview] = useState('');
  const [showTweetPreview, setShowTweetPreview] = useState(false);

  // Randomize initial fun fact
  const startIndex = useMemo(() => Math.floor(Math.random() * FUN_FACTS.length), []);

  // Step progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    let cumulative = 0;

    STEPS.forEach((step, i) => {
      if (i === STEPS.length - 1) return;
      cumulative += step.duration;
      timers.push(setTimeout(() => setActiveStep(i + 1), cumulative));
    });

    // Show tweet preview after step 2 starts
    timers.push(setTimeout(() => {
      setTweetPreview(TWEET_PREVIEWS[Math.floor(Math.random() * TWEET_PREVIEWS.length)]);
      setShowTweetPreview(true);
    }, 4000));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        const stepTarget = ((activeStep + 1) / STEPS.length) * 100;
        return Math.min(prev + 0.4, stepTarget - 2);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [activeStep]);

  // Fun facts rotation
  useEffect(() => {
    setFunFactIndex(startIndex);
    const interval = setInterval(() => {
      setFunFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [startIndex]);

  const funFact = FUN_FACTS[funFactIndex];

  return (
    <div className="animate-fade-in">
      {/* Top progress bar — thicker, with glow */}
      <div className="h-[3px] bg-[#202327] relative overflow-hidden">
        <div
          className="h-full bg-x-blue transition-all duration-300 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-x-blue rounded-full blur-[4px]" />
        </div>
      </div>

      <div className="px-4 pt-5 pb-4">
        <div className="flex gap-3">
          <IdifyAvatar />

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[15px] font-bold text-x-text">idify your X</span>
              <svg viewBox="0 0 22 22" className="w-[18px] h-[18px] fill-x-blue shrink-0">
                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.141.27.587.7 1.086 1.24 1.44.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.894.14.634-.132 1.22-.437 1.69-.882.445-.47.749-1.055.878-1.691.13-.634.08-1.29-.144-1.898.587-.27 1.087-.7 1.443-1.242.355-.54.554-1.17.573-1.817z" /><path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="black" />
              </svg>
              <span className="text-[15px] text-x-secondary">@idifyyourx</span>
            </div>

            {/* Scanning headline */}
            <p className="text-[22px] font-bold text-x-text mb-5 leading-7">
              Scanning <span className="text-x-blue">@{username}</span>
            </p>

            {/* Steps — card style */}
            <div className="bg-[#16181c] rounded-2xl border border-x-border overflow-hidden mb-4">
              {STEPS.map((step, i) => {
                const isDone = i < activeStep;
                const isActive = i === activeStep;
                const isFuture = i > activeStep;

                return (
                  <div
                    key={step.label}
                    className={`flex items-center gap-3 px-4 py-3 transition-all duration-500 ${
                      i < STEPS.length - 1 ? 'border-b border-x-border/50' : ''
                    } ${isActive ? 'bg-x-blue/5' : ''}`}
                    style={{ opacity: isFuture ? 0.35 : 1 }}
                  >
                    {/* Status indicator */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                        isDone
                          ? 'bg-x-green/15'
                          : isActive
                          ? 'bg-x-blue/15'
                          : 'bg-[#202327]'
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-[18px] h-[18px] text-x-green" />
                      ) : (
                        <span className="text-[16px]">{step.emoji}</span>
                      )}
                    </div>

                    {/* Label + progress */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[15px] font-medium transition-colors duration-300 ${
                            isDone ? 'text-x-green' : isActive ? 'text-x-text' : 'text-x-tertiary'
                          }`}
                        >
                          {step.label}
                        </span>
                        {isDone && (
                          <span className="text-[12px] text-x-green animate-fade-in">Done</span>
                        )}
                      </div>
                      {isActive && (
                        <div className="mt-2 h-[3px] bg-[#202327] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-x-blue rounded-full relative"
                            style={{
                              animation: `step-progress ${step.duration}ms ease-out forwards`,
                            }}
                          >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-x-blue rounded-full blur-[3px]" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tweet preview insight — appears mid-scan */}
            {showTweetPreview && (
              <div className="bg-x-blue/5 border border-x-blue/20 rounded-2xl px-4 py-3 mb-4 animate-slide-up flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-x-blue shrink-0 mt-0.5" />
                <p className="text-[14px] text-x-blue leading-5">{tweetPreview}</p>
              </div>
            )}

            {/* Fun fact card — rotates */}
            <div className="border border-x-border rounded-2xl px-4 py-3 mb-4 relative overflow-hidden">
              <div className="flex items-start gap-2.5" key={funFactIndex}>
                <span className="text-[18px] shrink-0 animate-fade-in">{funFact.emoji}</span>
                <div className="animate-fade-in">
                  <p className="text-[12px] text-x-secondary uppercase tracking-wider mb-0.5 font-bold">While you wait</p>
                  <p className="text-[14px] text-x-text leading-5">{funFact.text}</p>
                </div>
              </div>
            </div>

            {/* Elapsed time + overall progress */}
            <div className="flex items-center justify-between">
              <ElapsedTime />
              <span className="text-[13px] text-x-tertiary tabular-nums">
                {Math.round(progress)}% complete
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes step-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

function ElapsedTime() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const display = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  return (
    <div className="flex items-center gap-2 text-[13px] text-x-tertiary">
      <div className="relative flex items-center justify-center w-2 h-2">
        <div className="w-1.5 h-1.5 rounded-full bg-x-blue" />
        <div className="absolute w-2 h-2 rounded-full bg-x-blue/50 animate-ping" />
      </div>
      <span className="tabular-nums">{display} elapsed</span>
    </div>
  );
}
