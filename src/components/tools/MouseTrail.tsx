'use client';

import { useEffect, useRef, useState } from 'react';
import { BREAKPOINTS } from '@/lib/breakpoints';

const MAX_POOL = 10;
const MIN_DIST = 6;
const FADE_MS = 450;
const TAIL_SIZE = 3;
const HEAD_SIZE = 9;

// Front-of-trail color (ratio = 1, newest pixel). Tail fades to white (sat -> 0).
const HEAD_HUE = 190;
const HEAD_SAT = 92;
const HEAD_LIGHT = 62;

type TrailPoint = {
  x: number;
  y: number;
  id: number;
  bornAt: number;
};

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Stable 0–1 per stamp id so jitter doesn't flicker as the dot ages. */
function stableRand(id: number, seed: number): number {
  const x = Math.sin(id * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Color along the trail. ratio 1 = newest (teal), ratio 0 = oldest (white).
 * To change the front color, edit HEAD_HUE / HEAD_SAT / HEAD_LIGHT above.
 */
function trailColor(ratio: number, hueJitter: number): string {
  const hue = lerp(210, HEAD_HUE, ratio) + hueJitter * ratio;
  const sat = lerp(0, HEAD_SAT, ratio);
  const light = lerp(100, HEAD_LIGHT, ratio);
  return `hsl(${hue} ${sat}% ${light}%)`;
}

function paintTrail(els: (HTMLDivElement | null)[], trail: TrailPoint[], now: number) {
  for (let i = 0; i < MAX_POOL; i++) {
    const el = els[i];
    if (!el) continue;

    const point = trail[i];
    if (!point) {
      el.style.opacity = '0';
      el.style.boxShadow = 'none';
      continue;
    }

    const life = 1 - (now - point.bornAt) / FADE_MS;
    if (life <= 0) {
      el.style.opacity = '0';
      el.style.boxShadow = 'none';
      continue;
    }

    // Position in trail: 0 = just stamped, higher = older sibling
    const trailRatio = trail.length <= 1 ? 1 : 1 - i / (trail.length - 1);

    const hueJitter = (stableRand(point.id, 1) - 0.5) * 24;
    const rot = (stableRand(point.id, 2) - 0.5) * 80;
    const sizeJitter = 0.65 + stableRand(point.id, 3) * 0.7;
    const size = lerp(TAIL_SIZE, HEAD_SIZE, trailRatio) * sizeJitter;
    const color = trailColor(trailRatio, hueJitter);
    const fade = life * life;
    const glow = size * 2.5 * fade;

    el.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) rotate(${rot}deg)`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.backgroundColor = color;
    el.style.boxShadow = `0 0 ${glow}px ${color}, 0 0 ${glow * 1.6}px ${color}`;
    el.style.opacity = String(fade * lerp(0.5, 1, trailRatio));
  }
}

export default function MouseTrail() {
  const [enabled, setEnabled] = useState(false);
  const poolRef = useRef<(HTMLDivElement | null)[]>([]);
  const trailRef = useRef<TrailPoint[]>([]);
  const nextIdRef = useRef(0);

  // Desktop only
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${BREAKPOINTS.tablet}px)`);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let rafId = 0;

    // Repaint every frame so dots fade out and get removed when life hits 0
    const tick = (now: number) => {
      const trail = trailRef.current;
      trailRef.current = trail.filter((p) => now - p.bornAt < FADE_MS);
      paintTrail(poolRef.current, trailRef.current, now);
      rafId = requestAnimationFrame(tick);
    };

    // Stamp a new pixel at the cursor; older pixels stay put until they fade
    const onMove = (e: MouseEvent) => {
      const trail = trailRef.current;
      const pos = { x: e.clientX, y: e.clientY };
      const head = trail[0];

      if (head && dist(head, pos) < MIN_DIST) return;

      trail.unshift({
        ...pos,
        id: nextIdRef.current++,
        bornAt: performance.now(),
      });
      if (trail.length > MAX_POOL) trail.pop();
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className='pointer-events-none fixed inset-0 z-[9999] overflow-hidden' aria-hidden>
      {Array.from({ length: MAX_POOL }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            poolRef.current[i] = el;
          }}
          className='mouse-trail-pixel'
        />
      ))}
    </div>
  );
}
