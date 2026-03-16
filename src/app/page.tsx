'use client';

import { LeftSidebar } from '@/components/LeftSidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { UsernameInput } from '@/components/UsernameInput';
import { LoadingState } from '@/components/LoadingState';
import { ResultsView } from '@/components/ResultsView';
import { ErrorState } from '@/components/ErrorState';
import { useAnalysis } from '@/hooks/useAnalysis';

export default function HomePage() {
  const { state, result, error, username, analyze, reset } = useAnalysis();

  return (
    <div className="min-h-screen bg-x-bg flex justify-center">
      <LeftSidebar />

      <main className="w-[600px] min-h-screen border-x border-x-border shrink-0">
        {/* Header tabs like X */}
        <div className="sticky top-0 z-10 bg-x-bg/80 backdrop-blur-md border-b border-x-border">
          <div className="flex">
            <button className="flex-1 py-4 text-center text-[15px] font-bold text-x-text hover:bg-[#181919] transition-colors relative cursor-pointer">
              For you
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-x-blue rounded-full" />
            </button>
            <button className="flex-1 py-4 text-center text-[15px] text-x-secondary hover:bg-[#181919] transition-colors cursor-pointer">
              Following
            </button>
          </div>
        </div>

        {state === 'idle' && <UsernameInput onSubmit={analyze} />}
        {state === 'loading' && <LoadingState username={username} />}
        {state === 'results' && result && (
          <ResultsView result={result} onReset={reset} />
        )}
        {state === 'error' && error && (
          <ErrorState error={error} onRetry={() => analyze(username)} onReset={reset} />
        )}
      </main>

      <RightSidebar />
    </div>
  );
}
