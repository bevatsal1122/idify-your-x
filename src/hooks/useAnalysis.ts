'use client';

import { useState, useCallback, useRef } from 'react';
import type { AnalysisResult, AppState, AnalysisError } from '@/types';

function getErrorMessage(payload: unknown, fallback: string) {
  if (typeof payload === 'string') return payload;
  if (!payload || typeof payload !== 'object') return fallback;

  const error = 'error' in payload ? payload.error : undefined;
  if (typeof error === 'string') return error;

  const message = 'message' in payload ? payload.message : undefined;
  if (typeof message === 'string') return message;

  return fallback;
}

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

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 429) {
          const retryAfter = res.headers.get('retry-after');
          const waitMessage = retryAfter
            ? `Please wait about ${retryAfter} seconds before trying again.`
            : 'Please wait a few minutes before trying again.';

          setError({
            code: 'rate_limited',
            message: `You are sending analyses too quickly. ${waitMessage}`,
          });
          setState('error');
          return;
        }

        throw new Error(getErrorMessage(data, 'Analysis failed'));
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
