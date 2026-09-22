'use client';

import { useState, useCallback, useRef } from 'react';
import type { AnalysisResult, AppState, AnalysisError } from '@/types';

export function useAnalysis() {
  const [state, setState] = useState<AppState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<AnalysisError | null>(null);
  const [username, setUsername] = useState('');
  const lastTurnstileToken = useRef<string | undefined>(undefined);

  const analyze = useCallback(async (inputUsername: string, turnstileToken?: string) => {
    if (turnstileToken) lastTurnstileToken.current = turnstileToken;
    setState('loading');
    setError(null);
    setResult(null);
    setUsername(inputUsername);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: inputUsername, turnstileToken: turnstileToken ?? lastTurnstileToken.current }),
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
    lastTurnstileToken.current = undefined;
  }, []);

  return { state, result, error, username, analyze, reset };
}
