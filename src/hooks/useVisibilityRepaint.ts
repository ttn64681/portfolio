'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Force a reflow on the ref's element when the tab becomes visible.
 * Use for sprite/background layers that can render blank after backgrounding.
 */
export function useVisibilityRepaint(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && ref.current) {
        void ref.current.offsetHeight;
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [ref]);
}
