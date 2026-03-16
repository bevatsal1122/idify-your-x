'use client';

import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-surface-border bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-brand-500" />
        <h1 className="text-xl font-bold text-content">
          idify your <span className="text-brand-500">X</span>
        </h1>
        <span className="text-sm text-content-secondary ml-2 hidden sm:inline">
          Turn any X profile into startup ideas
        </span>
      </div>
    </header>
  );
}
