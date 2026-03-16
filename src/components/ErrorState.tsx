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
    <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in">
      <div className="w-14 h-14 rounded-full bg-x-red/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-7 h-7 text-x-red" />
      </div>
      <p className="text-[20px] font-bold text-x-text mb-1">Something went wrong</p>
      <p className="text-[15px] text-x-secondary mb-6 text-center max-w-sm">{error.message}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-x-blue hover:bg-x-blue-hover text-white font-bold text-[15px] rounded-full transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2.5 border border-x-border rounded-full text-[15px] text-x-secondary hover:bg-[#181919] hover:text-x-text transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
