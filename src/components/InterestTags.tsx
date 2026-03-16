'use client';

import { useState } from 'react';
import type { DetectedInterest } from '@/types';

interface Props {
  interests: DetectedInterest[];
}

export function InterestTags({ interests }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!interests.length) return null;

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
      <h3 className="text-lg font-semibold text-content mb-3">
        Detected Interests
        <span className="text-content-tertiary font-normal text-sm ml-2">({interests.length})</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => {
          const isExpanded = expanded === interest.name;
          return (
            <div key={interest.name}>
              <button
                onClick={() => setExpanded(isExpanded ? null : interest.name)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  isExpanded
                    ? 'bg-brand-500 text-white border-brand-500'
                    : 'bg-brand-50 text-brand-700 border-brand-200 hover:border-brand-400'
                }`}
              >
                {interest.name}
                <span className="ml-1.5 opacity-60">
                  {Math.round(interest.confidence * 100)}%
                </span>
              </button>
              {isExpanded && interest.evidence.length > 0 && (
                <div className="mt-2 mb-1 bg-surface-secondary rounded-lg p-3 max-w-md animate-fade-in">
                  {interest.evidence.map((e, i) => (
                    <p key={i} className="text-xs text-content-secondary italic">
                      &ldquo;{e}&rdquo;
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
