import type { ExploreAccent, ExploreKind } from '@/types/explore';

/**
 * Visual-only overrides merged in `buildExploreDetail`.
 * Tune `ACCENT_BY_SLUG` for palette class; optional hero images live in `HERO_BACKDROPS` below.
 */
export type ExploreVisualConfig = {
  heroBackdrop?: string;
  heroBackdropPosition?: string;
  heroOverlayOpacity?: number;
  accent?: ExploreAccent;
};

/** Override accent per slug; defaults are aurora (projects) / forge (experiences). */
export const ACCENT_BY_SLUG: Partial<Record<string, ExploreAccent>> = {};

/** Optional per-slug backdrops — rest fall back to accent-only hero gradient. */
const HERO_BACKDROPS: Partial<Record<string, string>> = {
  cinema: '/pixel/webp/4 buildings.webp',
  'rag-portfolio': '/pixel/webp/tiles.webp',
  coursehub: '/pixel/webp/3 midland.webp',
  'tower-ascent': '/pixel/webp/5 sky.webp',
  acm: '/pixel/webp/pfp-me.webp',
  holywatr: '/pixel/webp/bubble-me.webp',
};

function defaultAccentForKind(kind: ExploreKind): ExploreAccent {
  return kind === 'project' ? 'aurora' : 'forge';
}

export function getExploreVisualConfig(slug: string, kind: ExploreKind): ExploreVisualConfig {
  const backdrop = HERO_BACKDROPS[slug];
  const accent = ACCENT_BY_SLUG[slug] ?? defaultAccentForKind(kind);
  return {
    heroBackdrop: backdrop,
    heroBackdropPosition: 'center',
    heroOverlayOpacity: backdrop ? 0.62 : 0.45,
    accent,
  };
}
