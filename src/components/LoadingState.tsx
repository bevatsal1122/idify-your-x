'use client';

import { useEffect, useState } from 'react';
import { User, MessageSquare, Brain, Lightbulb, Check } from 'lucide-react';
import { IdifyAvatar } from './IdifyAvatar';

const STEPS = [
  { label: 'Fetching profile', icon: User, duration: 2500 },
  { label: 'Reading tweets', icon: MessageSquare, duration: 3500 },
  { label: 'Analyzing interests', icon: Brain, duration: 5000 },
  { label: 'Generating ideas', icon: Lightbulb, duration: 0 },
];

const FUN_FACTS = [
  'Did you know the first tweet was "just setting up my twttr"?',
  'The average person scrolls 300 feet of content per day...',
  'Over 500 million tweets are sent every single day.',
  'Fun fact: Twitter was almost called "FriendStalker".',
  'The most liked tweet ever has 4.3 million likes.',
  'Our AI is reading tweets faster than you ever could.',
  'We promise we\'re not judging your tweets. Much.',
  'Turning your hot takes into hot startups...',
  'Analyzing your vibe... it\'s immaculate.',
  'Finding business ideas in your shitposts...',
];

interface Props {
  username: string;
}

export function LoadingState({ username }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [funFact, setFunFact] = useState('');
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  // Step progression
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    let cumulative = 0;

    STEPS.forEach((step, i) => {
      if (i === STEPS.length - 1) return;
      cumulative += step.duration;
      timers.push(setTimeout(() => setActiveStep(i + 1), cumulative));
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  // Progress bar
  useEffect(() => {
    const totalDuration = STEPS.reduce((sum, s) => sum + s.duration, 0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        const step = activeStep;
        const stepTarget = ((step + 1) / STEPS.length) * 100;
        const speed = step === activeStep ? 0.3 : 0.8;
        return Math.min(prev + speed, stepTarget - 2);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [activeStep]);

  // Fun facts rotation
  useEffect(() => {
    setFunFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
    const interval = setInterval(() => {
      setFunFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Top progress bar */}
      <div className="h-1 bg-x-panel relative overflow-hidden">
        <div
          className="h-full bg-x-blue transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            left: `${progress - 10}%`,
            animation: 'shimmer 1.5s infinite',
          }}
        />
      </div>

      {/* Main tweet-style content */}
      <div className="px-4 py-4">
        <div className="flex gap-3">
          {/* Animated avatar */}
          <IdifyAvatar />

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[15px] font-bold text-x-text">idify your X</span>
              <svg viewBox="0 0 22 22" className="w-[18px] h-[18px] fill-x-blue shrink-0">
                <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.141.27.587.7 1.086 1.24 1.44.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.894.14.634-.132 1.22-.437 1.69-.882.445-.47.749-1.055.878-1.691.13-.634.08-1.29-.144-1.898.587-.27 1.087-.7 1.443-1.242.355-.54.554-1.17.573-1.817z" /><path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="black" />
              </svg>
              <span className="text-[15px] text-x-secondary">@idifyyourx · now</span>
            </div>

            {/* Scanning message */}
            <p className="text-[17px] text-x-text mb-4">
              Scanning <span className="text-x-blue font-bold">@{username}</span>{dots}
            </p>

            {/* Steps */}
            <div className="space-y-3 mb-4">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === activeStep;
                const isDone = i < activeStep;
                const isFuture = i > activeStep;

                return (
                  <div
                    key={step.label}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      isFuture ? 'opacity-30' : 'opacity-100'
                    }`}
                  >
                    {/* Icon container */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                        isDone
                          ? 'bg-x-green/15'
                          : isActive
                          ? 'bg-x-blue/15'
                          : 'bg-[#202327]'
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-4 h-4 text-x-green" />
                      ) : isActive ? (
                        <div className="w-4 h-4 relative">
                          <Icon className="w-4 h-4 text-x-blue" />
                          <div className="absolute inset-0 rounded-full border border-x-blue/50 animate-ping" />
                        </div>
                      ) : (
                        <Icon className="w-4 h-4 text-x-tertiary" />
                      )}
                    </div>

                    {/* Label + mini progress */}
                    <div className="flex-1 min-w-0">
                      <span
                        className={`text-[15px] font-medium transition-colors duration-300 ${
                          isDone
                            ? 'text-x-green'
                            : isActive
                            ? 'text-x-text'
                            : 'text-x-tertiary'
                        }`}
                      >
                        {step.label}
                        {isDone && ' — done'}
                      </span>
                      {isActive && (
                        <div className="mt-1.5 h-[3px] bg-[#202327] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-x-blue rounded-full"
                            style={{
                              animation: `step-progress ${step.duration}ms ease-out forwards`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fun fact card */}
            <div className="border border-x-border rounded-2xl p-3 mb-3" key={funFact}>
              <p className="text-[12px] text-x-secondary uppercase tracking-wide mb-1 font-bold">While you wait</p>
              <p className="text-[14px] text-x-text leading-5 animate-fade-in">{funFact}</p>
            </div>

            {/* Elapsed time */}
            <ElapsedTime />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
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

  return (
    <div className="flex items-center gap-2 text-[13px] text-x-tertiary">
      <div className="w-1.5 h-1.5 rounded-full bg-x-blue animate-pulse-dot" />
      <span>{elapsed}s elapsed</span>
    </div>
  );
}
