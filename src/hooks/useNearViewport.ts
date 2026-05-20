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
 * True when `ref` is near the viewport. With `once`, the IntersectionObserver disconnects
 * after the first hit so long pages do not keep observers for off-screen tiles forever.
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
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver( // params: callback function, options object
      ([entry]) => { // entry: IntersectionObserverEntry object
        if (!entry?.isIntersecting) return; // if not intersecting, return
        setNear(true); // trigger re-render -> useNearViewport(true)
        if (once) obs.disconnect();
      },
      { rootMargin, threshold },
    ); // IntersectionObserver
    obs.observe(el);
    return () => obs.disconnect(); // clean up observer when component unmounts
    }, // callback
    [enabled, once, near, rootMargin, threshold, ref]
  ); // useEffect

  return near;
}
