'use client';

import { RotateCcw } from 'lucide-react';
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
    <div className="pb-16">
      <ProfileCard
        profile={result.profile}
        summary={result.summary}
        analyzedTweetsCount={result.analyzedTweetsCount}
        analyzedHighlightsCount={result.analyzedHighlightsCount}
        onBack={onReset}
      />

      <InterestTags interests={result.interests} />

      <div className="animate-slide-up" style={{ animationDelay: '0.12s', opacity: 0 }}>
        {result.ideas.map((idea, i) => (
          <IdeaCard key={i} idea={idea} index={i} />
        ))}
      </div>

      {/* Reset button styled as a "show more" area */}
      <div className="border-b border-x-border px-4 py-4 flex justify-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-2.5 border border-x-border rounded-full text-[15px] font-bold text-x-blue hover:bg-x-blue/10 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Analyze another profile
        </button>
      </div>
    </div>
  );
}
