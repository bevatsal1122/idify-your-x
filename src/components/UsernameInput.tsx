'use client';

import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const EXAMPLES = ['levelsio', 'naval', 'paulg', 'saborman02'];

interface Props {
  onSubmit: (username: string) => void;
}

export function UsernameInput({ onSubmit }: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = value.replace(/^@/, '').trim();
    if (clean) onSubmit(clean);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-content mb-4">
          What should <span className="text-brand-500">you</span> build?
        </h2>
        <p className="text-lg text-content-secondary max-w-lg mx-auto">
          Enter any X username and we&apos;ll analyze their tweets, bio, and interests
          to generate personalized startup ideas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="relative flex items-center">
          <span className="absolute left-4 text-content-tertiary text-lg">@</span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="username"
            className="w-full pl-10 pr-36 py-4 text-lg rounded-2xl border-2 border-surface-border bg-white focus:border-brand-500 focus:outline-none transition-colors placeholder:text-content-tertiary"
            autoFocus
          />
          <button
            type="submit"
            disabled={!value.replace(/^@/, '').trim()}
            className="absolute right-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-content-tertiary text-white font-medium rounded-xl flex items-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Generate</span>
            <ArrowRight className="w-4 h-4 sm:hidden" />
          </button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-sm text-content-tertiary">Try:</span>
        {EXAMPLES.map((name) => (
          <button
            key={name}
            onClick={() => {
              setValue(name);
              onSubmit(name);
            }}
            className="px-3 py-1.5 text-sm bg-surface-secondary border border-surface-border rounded-full hover:border-brand-500 hover:text-brand-600 transition-colors"
          >
            @{name}
          </button>
        ))}
      </div>
    </div>
  );
}
