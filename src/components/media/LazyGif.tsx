'use client';

import { useRef } from 'react';
import { useNearViewport } from '@/hooks/useNearViewport';

type LazyGifProps = {
  src: string;
  alt: string;
  className?: string;
  /** Preload when near viewport (default). Set false only for rare above-the-fold heroes. */
  deferUntilVisible?: boolean;
};

/** Defers GIF `src` until near viewport; uses native lazy/async decoding once loaded. */
export default function LazyGif({ src, alt, className, deferUntilVisible = true }: LazyGifProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(hostRef, { enabled: deferUntilVisible });
  const active = !deferUntilVisible || near;

  return (
    <div ref={hostRef} className='lazy-gif-host'>
      {active ? (
        // eslint-disable-next-line @next/next/no-img-element -- preserve GIF animation
        <img src={src} alt={alt} className={className} decoding='async' />
      ) : (
        <div
          className={className ? `${className} lazy-media-skeleton` : 'lazy-media-skeleton'}
          aria-hidden
        />
      )}
    </div>
  );
}
