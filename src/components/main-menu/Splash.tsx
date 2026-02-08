'use client';

import { useSplashParallax } from '@/hooks/useSplashParallax';

type SplashProps = {
  /** Rendered between water (bg2) and black (bg1) for correct z-ordering. */
  children?: React.ReactNode;
};

const LAYER_STYLE = {
  willChange: 'transform' as const,
  contain: 'layout style paint' as const,
};

export default function Splash({ children }: SplashProps) {
  useSplashParallax();

  return (
    <div className='animated-bg-container'>
      <div id='bg5' className='sprite-layer' style={LAYER_STYLE} />
      <div id='bg4' className='sprite-layer' style={LAYER_STYLE} />
      <div id='bg3' className='sprite-layer' style={LAYER_STYLE} />
      <div id='bg2' className='sprite-layer' style={LAYER_STYLE} />
      {children != null ? (
        <div className='absolute inset-0 z-[5] pointer-events-auto'>{children}</div>
      ) : null}
      <div id='bg1' className='sprite-layer-bg1' style={LAYER_STYLE} />
    </div>
  );
}
