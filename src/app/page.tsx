'use client';

import { LeftSidebar } from '@/components/LeftSidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { BottomNav } from '@/components/BottomNav';
import { MobileHeader } from '@/components/MobileHeader';
import { UsernameInput } from '@/components/UsernameInput';
import { LoadingState } from '@/components/LoadingState';
import { ResultsView } from '@/components/ResultsView';
import { ErrorState } from '@/components/ErrorState';
import { useAnalysis } from '@/hooks/useAnalysis';

export default function HomePage() {
  const { state, result, error, username, analyze, reset } = useAnalysis();

  const showTimelineTabs = state === 'idle' || state === 'loading' || state === 'error';

  return (
    <div className="min-h-screen bg-x-bg flex justify-center">
      {/* Left sidebar — hidden on mobile */}
      <div className="hidden lg:block">
        <LeftSidebar onHomeClick={reset} analyzedProfile={result?.profile ?? null} />
      </div>

      <main className="w-full lg:w-[605px] min-h-screen lg:border-x border-x-border lg:shrink-0 pb-[53px] lg:pb-0">
        {/* Mobile header — only on mobile, only on timeline views */}
        {showTimelineTabs && <MobileHeader avatarUrl={result?.profile?.avatar} />}

        {/* Desktop "For you / Following" tabs — hidden on mobile */}
        {showTimelineTabs && (
          <div className="sticky top-0 z-10 bg-x-bg/80 backdrop-blur-md border-b border-x-border hidden lg:block">
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
        )}

        {state === 'idle' && <UsernameInput onSubmit={analyze} />}
        {state === 'loading' && <LoadingState username={username} />}
        {state === 'results' && result && (
          <ResultsView result={result} onReset={reset} />
        )}
        {state === 'error' && error && (
          <ErrorState error={error} onRetry={() => analyze(username)} onReset={reset} />
        )}
      </main>

      {/* Right sidebar — hidden on mobile */}
      <div className="hidden lg:block">
        <RightSidebar />
      </div>

      {/* Bottom nav — only on mobile */}
      <BottomNav onHomeClick={reset} />
    </div>
  );
}
