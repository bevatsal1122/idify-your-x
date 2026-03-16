'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, DollarSign } from 'lucide-react';
import type { GeneratedIdea } from '@/types';

const DIFFICULTY_LABELS: Record<string, { text: string; color: string }> = {
  low: { text: 'Easy', color: 'text-x-green' },
  medium: { text: 'Medium', color: 'text-x-yellow' },
  high: { text: 'Hard', color: 'text-x-red' },
};

interface Props {
  idea: GeneratedIdea;
  index: number;
}

export function IdeaCard({ idea, index }: Props) {
  const [showEvidence, setShowEvidence] = useState(false);
  const diff = DIFFICULTY_LABELS[idea.difficulty] || DIFFICULTY_LABELS.medium;

  return (
    <div
      className="border-b border-x-border px-4 py-3 hover:bg-[#080808] transition-colors animate-slide-up"
      style={{ animationDelay: `${0.15 + index * 0.06}s`, opacity: 0 }}
    >
      <div className="flex gap-3">
        {/* Idea avatar */}
        <div className="w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center shrink-0">
          <Lightbulb className="w-5 h-5 text-x-blue" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Header row - like tweet author line */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[15px] font-bold text-x-text">{idea.title}</span>
            <span className="text-[13px] text-x-secondary bg-[#202327] px-2 py-0.5 rounded-full">{idea.category}</span>
            <span className={`text-[13px] font-bold ${diff.color}`}>{diff.text}</span>
          </div>

          {/* Description */}
          <p className="text-[15px] text-x-text leading-5 mt-1">{idea.description}</p>

          {/* Why you - styled as quote */}
          <p className="text-[15px] text-x-secondary leading-5 mt-2">
            <span className="text-x-text font-bold">Why you: </span>
            {idea.reasoning}
          </p>

          {/* Monetization */}
          <div className="flex items-center gap-1.5 mt-2 text-[13px] text-x-secondary">
            <DollarSign className="w-3.5 h-3.5" />
            {idea.monetization}
          </div>

          {/* Evidence toggle */}
          {idea.evidence.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setShowEvidence(!showEvidence)}
                className="flex items-center gap-1 text-[13px] text-x-blue hover:underline cursor-pointer"
              >
                {showEvidence ? 'Hide' : 'Show'} evidence ({idea.evidence.length})
                {showEvidence ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {showEvidence && (
                <div className="mt-2 space-y-2 animate-fade-in">
                  {idea.evidence.map((ev, i) => (
                    <div key={i} className="border border-x-border rounded-2xl p-3">
                      <span className="text-[12px] text-x-secondary uppercase tracking-wide">
                        {ev.source.replace('_', ' ')}
                      </span>
                      <p className="text-[14px] text-x-text mt-1 leading-5">{ev.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action bar - like tweet actions */}
          <div className="flex items-center justify-between mt-3 max-w-[425px] text-x-secondary">
            <span className="flex items-center gap-1 text-[13px] hover:text-x-blue transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.25-.893 4.306-2.394 5.862l-5.091 5.28c-.33.34-.872.34-1.202.003l-5.11-5.285A8.15 8.15 0 011.751 10zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 1.665.662 3.258 1.838 4.433l4.412 4.56 4.382-4.555C15.542 13.29 16.2 11.702 16.2 10.13 16.2 6.894 13.607 4 10.122 4H9.756z" /></svg>
            </span>
            <span className="flex items-center gap-1 text-[13px] hover:text-x-green transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" /></svg>
            </span>
            <span className="flex items-center gap-1 text-[13px] hover:text-x-pink transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.56-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" /></svg>
            </span>
            <span className="flex items-center gap-1 text-[13px] cursor-pointer">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M8.75 21V3h2v18h-2zM18.25 21V8.5h2V21h-2zM13.5 21V13h2v8h-2zM3.25 21v-6h2v6h-2z" /></svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
