'use client';

import { Header } from '@/components/Header';
import { UsernameInput } from '@/components/UsernameInput';
import { LoadingState } from '@/components/LoadingState';
import { ResultsView } from '@/components/ResultsView';
import { ErrorState } from '@/components/ErrorState';
import { useAnalysis } from '@/hooks/useAnalysis';

export default function HomePage() {
  const { state, result, error, username, analyze, reset } = useAnalysis();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {state === 'idle' && <UsernameInput onSubmit={analyze} />}
        {state === 'loading' && <LoadingState username={username} />}
        {state === 'results' && result && (
          <ResultsView result={result} onReset={reset} />
        )}
        {state === 'error' && error && (
          <ErrorState error={error} onRetry={() => analyze(username)} onReset={reset} />
        )}
      </main>
    </div>
  );
}
