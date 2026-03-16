'use client';

import { useEffect, useState } from 'react';
import { User, MessageSquare, Brain, Lightbulb, Check, Loader2 } from 'lucide-react';

const STEPS = [
  { label: 'Fetching profile', icon: User, duration: 2000 },
  { label: 'Reading tweets', icon: MessageSquare, duration: 3000 },
  { label: 'Analyzing interests', icon: Brain, duration: 4000 },
  { label: 'Generating ideas', icon: Lightbulb, duration: 0 },
];

interface Props {
  username: string;
}

export function LoadingState({ username }: Props) {
  const [activeStep, setActiveStep] = useState(0);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-content mb-2">
          Scanning <span className="text-brand-500">@{username}</span>
        </h2>
        <p className="text-content-secondary">This usually takes 15-30 seconds</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === activeStep;
          const isDone = i < activeStep;

          return (
            <div
              key={step.label}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-brand-50 border border-brand-200'
                  : isDone
                  ? 'bg-accent-green/5 border border-accent-green/20'
                  : 'bg-surface-secondary border border-transparent'
              }`}
              style={{
                opacity: i <= activeStep ? 1 : 0.4,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDone
                    ? 'bg-accent-green/10 text-accent-green'
                    : isActive
                    ? 'bg-brand-100 text-brand-600'
                    : 'bg-surface-secondary text-content-tertiary'
                }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4" />
                ) : isActive ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`font-medium ${
                  isDone
                    ? 'text-accent-green'
                    : isActive
                    ? 'text-brand-600'
                    : 'text-content-tertiary'
                }`}
              >
                {step.label}
                {isActive && '...'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
