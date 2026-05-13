import { extrasGames } from '@/data/extras-games';

/**
 * Ordered URLs for extras prev/next (ExtrasHero keyboard + pager).
 * Games follow `extrasGames` array order; then music → gallery → animanga.
 */
export function getExtrasNavHrefSequence(): string[] {
  return [
    ...extrasGames.map((g) => `/extras/games/${g.slug}`),
    '/extras/music',
    '/extras/gallery',
    '/extras/animanga',
  ];
}

/** Wraps around the ring; unknown paths map to index 0 so navigation still resolves. */
export function getExtrasNavNeighbors(currentPath: string): { prev: string; next: string } {
  const seq = getExtrasNavHrefSequence();
  const path = currentPath.replace(/\/$/, '') || '/';
  const idx = seq.findIndex((h) => path === h);
  const i = idx >= 0 ? idx : 0;
  const len = seq.length;
  return {
    prev: seq[(i - 1 + len) % len],
    next: seq[(i + 1) % len],
  };
}
