'use client';

import { useState } from 'react';
import type { DetectedInterest } from '@/types';
import { IdifyAvatar } from './IdifyAvatar';

const TAG_COLORS = [
  'bg-x-blue/10 text-x-blue',
  'bg-x-purple/10 text-x-purple',
  'bg-x-green/10 text-x-green',
  'bg-x-orange/10 text-x-orange',
  'bg-x-pink/10 text-x-pink',
  'bg-x-yellow/10 text-x-yellow',
  'bg-x-red/10 text-x-red',
  'bg-x-blue/10 text-x-blue',
];

interface Props {
  interests: DetectedInterest[];
}

export function InterestTags({ interests }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!interests.length) return null;

  return (
    <div
      className="border-b border-x-border px-4 py-3 animate-slide-up"
      style={{ animationDelay: '0.1s', opacity: 0 }}
    >
      <div className="flex gap-3">
        <IdifyAvatar />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[15px] font-bold text-x-text">Detected Interests</span>
            <svg viewBox="0 0 22 22" className="w-[18px] h-[18px] fill-x-blue">
              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.141.27.587.7 1.086 1.24 1.44.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.894.14.634-.132 1.22-.437 1.69-.882.445-.47.749-1.055.878-1.691.13-.634.08-1.29-.144-1.898.587-.27 1.087-.7 1.443-1.242.355-.54.554-1.17.573-1.817z" /><path d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" fill="black" />
            </svg>
            <span className="text-[15px] text-x-secondary">@idifyyourx · now</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {interests.map((interest, i) => {
              const isExpanded = expanded === interest.name;
              const colorClass = TAG_COLORS[i % TAG_COLORS.length];
              return (
                <div key={interest.name}>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : interest.name)}
                    className={`px-3 py-1.5 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                      isExpanded ? 'ring-1 ring-current' : ''
                    } ${colorClass}`}
                  >
                    {interest.name}
                  </button>
                  {isExpanded && interest.evidence.length > 0 && (
                    <div className="mt-2 mb-1 space-y-1 animate-fade-in">
                      {interest.evidence.map((e, j) => (
                        <p key={j} className="text-[13px] text-x-secondary pl-3 border-l-2 border-x-border">
                          {e}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
