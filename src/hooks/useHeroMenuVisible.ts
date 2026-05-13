'use client';

import { useSyncExternalStore } from 'react';
import { BREAKPOINTS } from '@/lib/breakpoints';

// subscribe to scroll and resize events and call onChange when they happen
function subscribe(onChange: () => void) {
  const opts = { passive: true } as const;
  const handler = () => onChange();
  window.addEventListener('scroll', handler, opts);
  window.addEventListener('resize', handler);
  return () => {
    window.removeEventListener('scroll', handler);
    window.removeEventListener('resize', handler);
  };
}

// calc the scroll threshold for hero menu
function heroScrollThresholdPx() {
  const vh = window.innerHeight;
  if (window.innerWidth <= BREAKPOINTS.mobile) {
    return vh * 0.42; // 42% of viewport height for mobile
  }
  return vh * 0.62; // 62% of viewport height
}

function getSnapshot() {
  return window.scrollY < heroScrollThresholdPx();
}

function getServerSnapshot() {
  return true;
}

/**
 * Whether the fixed hero menu (title / nav) should be visible and interactive.
 * After the user scrolls into the portfolio body, the overlay hides.
 */
export function useHeroMenuVisible() {
  // useSyncExternalStore is a clean way to handle subscribing to events and calling onChange when they happen
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
