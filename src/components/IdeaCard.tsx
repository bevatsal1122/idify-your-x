'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Quote, DollarSign } from 'lucide-react';
import type { GeneratedIdea } from '@/types';

const DIFFICULTY_STYLES = {
  low: 'bg-accent-green/10 text-accent-green',
  medium: 'bg-accent-yellow/10 text-accent-yellow',
  high: 'bg-accent-red/10 text-accent-red',
};

interface Props {
  idea: GeneratedIdea;
  index: number;
}

export function IdeaCard({ idea, index }: Props) {
  const [showEvidence, setShowEvidence] = useState(false);

  return (
    <div
      className="bg-white border border-surface-border rounded-2xl p-5 hover:border-brand-200 hover:shadow-sm transition-all animate-slide-up"
      style={{ animationDelay: `${0.15 + index * 0.08}s`, opacity: 0 }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-50 text-brand-600">
          {idea.category}
        </span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${DIFFICULTY_STYLES[idea.difficulty]}`}>
          {idea.difficulty}
        </span>
      </div>

      <h4 className="text-lg font-bold text-content mb-2">{idea.title}</h4>
      <p className="text-sm text-content-secondary mb-3 leading-relaxed">{idea.description}</p>

      <p className="text-sm text-content leading-relaxed mb-3">
        <span className="font-medium">Why you:</span> {idea.reasoning}
      </p>

      <div className="flex items-center gap-1.5 text-xs text-content-tertiary mb-3">
        <DollarSign className="w-3.5 h-3.5" />
        <span>{idea.monetization}</span>
      </div>

      {idea.evidence.length > 0 && (
        <div className="border-t border-surface-border pt-3">
          <button
            onClick={() => setShowEvidence(!showEvidence)}
            className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            <Quote className="w-3.5 h-3.5" />
            Evidence ({idea.evidence.length})
            {showEvidence ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {showEvidence && (
            <div className="mt-2 space-y-2 animate-fade-in">
              {idea.evidence.map((ev, i) => (
                <div key={i} className="bg-surface-secondary rounded-lg p-2.5">
                  <span className="text-[10px] uppercase tracking-wide font-medium text-content-tertiary block mb-1">
                    {ev.source.replace('_', ' ')}
                  </span>
                  <p className="text-xs text-content-secondary italic">&ldquo;{ev.text}&rdquo;</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
