'use client';

import { useEffect } from 'react';
import type { LayerConfig } from '@/types/splash';

const SMOOTHING_RATIO = 0.065;
const LAYERS: LayerConfig[] = [
  { id: 'bg5', maxX: 30, maxY: 20, scale: 0.93, scrollYMult: 0.5 },
  { id: 'bg4', maxX: 24, maxY: 16, scale: 0.91, scrollYMult: 0.4 },
  { id: 'bg3', maxX: 18, maxY: 12, scale: 0.9, scrollYMult: 0.3 },
  { id: 'bg2', maxX: 12, maxY: 8, scale: 0.89, scrollYMult: 0.15 },
  { id: 'bg1', maxX: 10, maxY: 6, scale: 0.88, scrollYMult: 0 },
];

function lerp(start: number, end: number, ratio: number): number {
  return start + (end - start) * ratio;
}

/**
 * Sets up mouse + scroll parallax for splash layer elements (bg1–bg5).
 * Call once in Splash; layers must be in the DOM (e.g. by id).
 */
export function useSplashParallax() {
  useEffect(() => {
    let scrollY = window.scrollY;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    let currentMouseX = centerX;
    let currentMouseY = centerY;
    let actualMouseX = centerX;
    let actualMouseY = centerY;

    function updateTransforms() {
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;
      const relX = (currentMouseX - screenCenterX) / screenCenterX;
      const relY = (currentMouseY - screenCenterY) / screenCenterY;
      const isTabletOrSmaller = window.innerWidth <= 768;

      LAYERS.forEach(({ id, maxX, maxY, scale, scrollYMult }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const mouseXOffset = isTabletOrSmaller ? 0 : relX * maxX;
        const mouseYOffset = isTabletOrSmaller ? 0 : relY * maxY;
        el.style.transform = `
          translateX(calc(-50% - ${mouseXOffset}px))
          translateY(${scrollY * scrollYMult - mouseYOffset}px)
          scale(${scale})
        `;
      });
    }

    function animate() {
      currentMouseX = lerp(currentMouseX, actualMouseX, SMOOTHING_RATIO);
      currentMouseY = lerp(currentMouseY, actualMouseY, SMOOTHING_RATIO);
      updateTransforms();
      requestAnimationFrame(animate);
    }

    const onMouseMove = (e: MouseEvent) => {
      actualMouseX = e.clientX;
      actualMouseY = e.clientY;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      updateTransforms();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') updateTransforms();
    };

    updateTransforms();
    requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);
}
