'use client';

import { RotateCcw, Lightbulb } from 'lucide-react';
import type { AnalysisResult } from '@/types';
import { ProfileCard } from './ProfileCard';
import { InterestTags } from './InterestTags';
import { IdeaCard } from './IdeaCard';

interface Props {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsView({ result, onReset }: Props) {
  return (
    <div className="space-y-8 pb-16">
      <ProfileCard
        profile={result.profile}
        summary={result.summary}
        analyzedTweetsCount={result.analyzedTweetsCount}
      />

      <InterestTags interests={result.interests} />

      <div className="animate-slide-up" style={{ animationDelay: '0.12s', opacity: 0 }}>
        <h3 className="text-lg font-semibold text-content mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-brand-500" />
          Startup Ideas
          <span className="text-content-tertiary font-normal text-sm">({result.ideas.length})</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.ideas.map((idea, i) => (
            <IdeaCard key={i} idea={idea} index={i} />
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 border-2 border-surface-border rounded-xl text-content-secondary hover:border-brand-500 hover:text-brand-600 transition-colors font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          Analyze another profile
        </button>
      </div>
    </div>
  );
}
