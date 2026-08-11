'use client';

import { useEffect } from 'react';
import { BREAKPOINTS } from '@/lib/breakpoints';
import type { LayerConfig } from '@/types/splash';

// How fast smoothed cursor catches real cursor each frame (lower = laggier / softer).
const SMOOTHING_RATIO = 0.065;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
// Back-to-front stack: farther layers move more on scroll (scrollYMult) and mouse (maxX/maxY).
const LAYERS: LayerConfig[] = [
  { id: 'bg5', maxX: 30, maxY: 20, scale: 0.93, scrollYMult: 0.5 },
  { id: 'bg4', maxX: 24, maxY: 16, scale: 0.91, scrollYMult: 0.4 },
  { id: 'bg3', maxX: 18, maxY: 12, scale: 0.9, scrollYMult: 0.3 },
  { id: 'bg2', maxX: 12, maxY: 8, scale: 0.89, scrollYMult: 0.15 },
  { id: 'bg1', maxX: 10, maxY: 6, scale: 0.88, scrollYMult: 0 },
];

// Cached DOM nodes so we don’t query document every animation frame.
type LayerEntry = { config: LayerConfig; el: HTMLElement };

function lerp(start: number, end: number, ratio: number): number {
  return start + (end - start) * ratio;
}

/** Mouse + scroll parallax for Splash layers (ids bg1–bg5); run after those nodes exist. */
export function useSplashParallax() {
  useEffect(() => {
    // Cache DOM nodes
    const layerEntries: LayerEntry[] = [];
    for (const config of LAYERS) {
      const el = document.getElementById(config.id);
      if (el) layerEntries.push({ config, el });
    }
    if (layerEntries.length === 0) return; // No layers found, so don't do anything.

    let scrollY = window.scrollY;
    // Treat “no movement yet” as centered so first frame isn’t jumpy.
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    let currentMouseX = centerX;
    let currentMouseY = centerY;
    let actualMouseX = centerX;
    let actualMouseY = centerY;

    let rafId = 0; // Non-zero while full-motion RAF loop is scheduled.

    function stopAnimationLoop() {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    function updateTransforms(useMouseParallax: boolean) {
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;
      // Normalized offset from center (-1 to 1); drives how far each layer shifts.
      const relX = useMouseParallax
        ? (currentMouseX - screenCenterX) / screenCenterX // // if mouse at center (500,500), then relX = 0 (center)
        : 0;
      const relY = useMouseParallax ? (currentMouseY - screenCenterY) / screenCenterY : 0;
      const isTabletOrSmaller = window.innerWidth <= BREAKPOINTS.mobile;

      // Update transforms for each cached layer
      for (const { config, el } of layerEntries) {
        const { maxX, maxY, scale, scrollYMult } = config;
        const mouseXOffset = useMouseParallax && !isTabletOrSmaller ? relX * maxX : 0;
        const mouseYOffset = useMouseParallax && !isTabletOrSmaller ? relY * maxY : 0;
        el.style.transform = `
          translateX(calc(-50% - ${mouseXOffset}px))
          translateY(${scrollY * scrollYMult - mouseYOffset}px)
          scale(${scale})
        `;
      }
    }

    // For handling reduced motion preference media query (Accessibility)
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);

    // Reduced motion:
    // No RAF / no cursor tracking: scroll-only depth
    function runReducedMotion() {
      updateTransforms(false);
      const onScroll = () => {
        scrollY = window.scrollY;
        updateTransforms(false);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }

    function runFullMotion() {
      function animate() {
        // Smooth chase toward latest pointer so motion isn’t jittery.
        currentMouseX = lerp(currentMouseX, actualMouseX, SMOOTHING_RATIO);
        currentMouseY = lerp(currentMouseY, actualMouseY, SMOOTHING_RATIO);
        updateTransforms(true);
        rafId = requestAnimationFrame(animate);
      }

      const onMouseMove = (e: MouseEvent) => {
        actualMouseX = e.clientX;
        actualMouseY = e.clientY;
      };
      const onScroll = () => {
        scrollY = window.scrollY;
        updateTransforms(true);
      };
      const onVisibilityChange = () => {
        // Tab wake can skip frames; one sync avoids stale transforms.
        if (document.visibilityState === 'visible') updateTransforms(true);
      };

      updateTransforms(true);
      rafId = requestAnimationFrame(animate); // start animation loop
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('visibilitychange', onVisibilityChange);

      return () => {
        stopAnimationLoop();
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('visibilitychange', onVisibilityChange);
      };
    }

    let teardownMode = mq.matches ? runReducedMotion() : runFullMotion();

    const onReducedMotionChange = () => {
      teardownMode();
      stopAnimationLoop(); // Safe when switching away from full motion (RAF may still be pending).
      scrollY = window.scrollY;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // Fresh centered baseline so switching modes doesn’t inherit stale smoothing state.
      currentMouseX = cx;
      currentMouseY = cy;
      actualMouseX = cx;
      actualMouseY = cy;
      teardownMode = mq.matches ? runReducedMotion() : runFullMotion();
    };

    mq.addEventListener('change', onReducedMotionChange);

    return () => {
      mq.removeEventListener('change', onReducedMotionChange);
      teardownMode();
      stopAnimationLoop(); // Guarantees no RAF after unmount or after mode teardown quirks.
    };
  }, []);
}
