'use client';

import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import type { AnalysisError } from '@/types';

interface Props {
  error: AnalysisError;
  onRetry: () => void;
  onReset: () => void;
}

export function ErrorState({ error, onRetry, onReset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-accent-red/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-accent-red" />
      </div>
      <h2 className="text-xl font-bold text-content mb-2">Something went wrong</h2>
      <p className="text-content-secondary mb-6 text-center max-w-md">{error.message}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2.5 border border-surface-border rounded-xl text-content-secondary hover:border-brand-500 hover:text-brand-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
