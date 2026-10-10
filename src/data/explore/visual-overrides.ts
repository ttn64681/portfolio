import { getExploreHeroBackdrop } from '@/data/explore/media-assets';
import type { ExploreAccent } from '@/types/explore/accent';
import type { ExploreKind } from '@/types/explore/kind';
import type { ExploreVisualConfig } from '@/types/explore/visual-config';

// Hero backdrop + accent classes per slug. Gallery / figures: `media-assets.ts` (or `exploreDossier` override).

// Optional accent override per slug. Otherwise projects --> aurora, experiences --> forge.
export const ACCENT_BY_SLUG: Partial<Record<string, ExploreAccent>> = {};

/** Fallback when a slug has no `hero_*` (or other) asset in `public/images/explore`. */
const HERO_PLACEHOLDER = '/pixel/webp/tiles.webp';

// Manual hero overrides (win over media-assets). Prefer naming files `hero_*` instead.
const HERO_BACKDROPS: Partial<Record<string, string>> = {};

function defaultAccentForKind(kind: ExploreKind): ExploreAccent {
  return kind === 'project' ? 'aurora' : 'forge';
}

export function getExploreVisualConfig(slug: string, kind: ExploreKind): ExploreVisualConfig {
  const backdrop = HERO_BACKDROPS[slug] ?? getExploreHeroBackdrop(slug) ?? HERO_PLACEHOLDER;
  const accent = ACCENT_BY_SLUG[slug] ?? defaultAccentForKind(kind);
  return {
    heroBackdrop: backdrop,
    heroBackdropPosition: 'center',
    heroOverlayOpacity: 0.62,
    accent,
  };
}
