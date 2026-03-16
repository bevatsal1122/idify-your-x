'use client';

import { useState, useCallback } from 'react';
import type { AnalysisResult, AppState, AnalysisError } from '@/types';

export function useAnalysis() {
  const [state, setState] = useState<AppState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<AnalysisError | null>(null);
  const [username, setUsername] = useState('');

  const analyze = useCallback(async (inputUsername: string) => {
    setState('loading');
    setError(null);
    setResult(null);
    setUsername(inputUsername);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: inputUsername }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
      setState('results');
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Something went wrong',
      });
      setState('error');
    }
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setResult(null);
    setError(null);
    setUsername('');
  }, []);

  return { state, result, error, username, analyze, reset };
}
