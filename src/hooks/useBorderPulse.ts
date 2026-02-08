'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const PULSE_DURATION_MS = 50;

/**
 * Single border brighten pulse per trigger (e.g. on keypress).
 * Returns whether the pulse is currently active and a function to trigger it.
 */
export function useBorderPulse() {
  const [isBorderPulsing, setIsBorderPulsing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerPulse = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsBorderPulsing(true);
    timeoutRef.current = setTimeout(() => {
      setIsBorderPulsing(false);
      timeoutRef.current = null;
    }, PULSE_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { isBorderPulsing, triggerPulse };
}
