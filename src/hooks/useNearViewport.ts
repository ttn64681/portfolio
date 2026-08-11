'use client';

import { useEffect, useState, type RefObject } from 'react';

export type NearViewportOptions = {
  rootMargin?: string;
  threshold?: number;
  /** Stop observing after the first intersection (default true — limits live observer count). */
  once?: boolean;
  /** When false, always returns false and skips the observer. */
  enabled?: boolean;
};

/**
 * True when `ref` is near viewport. With `once`, IntersectionObserver disconnects
 * after first hit so long pages do not keep observers for off-screen tiles forever.
 */
export function useNearViewport(
  ref: RefObject<Element | null>,
  options: NearViewportOptions = {},
): boolean {
  // rootMargin: amount of space around the viewport to consider the element near
  // threshold: percentage of the element's visibility to consider it near
  // once: if true, the observer will disconnect after the first intersection
  // enabled: if false, the observer will not be created
  const { rootMargin = '120px', threshold = 0.01, once = true, enabled = true } = options;
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (!enabled || (once && near)) return;

    let obs: IntersectionObserver | undefined;
    let raf = 0;
    let cancelled = false;

    const attach = () => {
      if (cancelled) return;
      const el = ref.current;
      if (!el) return;

      // Above-fold embeds can already be visible before IntersectionObserver fires
      const marginPx = 120;
      const rect = el.getBoundingClientRect();
      // manually calculate if element is near viewport
      if (rect.top < window.innerHeight + marginPx && rect.bottom > -marginPx) {
        setNear(true);
        if (once) return;
      }

      obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          setNear(true);
          if (once) obs?.disconnect();
        },
        { rootMargin, threshold },
      );
      obs.observe(el);
    };

    attach();
    // Ref may not be set on first effect tick; retry once on next frame.
    if (!ref.current) {
      raf = requestAnimationFrame(attach);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      obs?.disconnect();
    };
  }, [enabled, once, near, rootMargin, threshold, ref]);

  return near;
}
