import type { ExploreAccent } from '@/types/explore/accent';
import type { ExploreKind } from '@/types/explore/kind';
import type { ExploreVisualConfig } from '@/types/explore/visual-config';

// Hero backdrop + accent classes per slug. Mosaic gallery / figures = `exploreDossier` on the config row.

// Optional accent override per slug. Otherwise projects --> aurora, experiences --> forge.
export const ACCENT_BY_SLUG: Partial<Record<string, ExploreAccent>> = {};

/** Unified hero backdrop until media is served from CMS (keeps `/public` lean). */
const HERO_PLACEHOLDER = '/pixel/webp/tiles.webp';

// Hero image paths (public/). Unlisted slugs still get `HERO_PLACEHOLDER` below.
const HERO_BACKDROPS: Partial<Record<string, string>> = {};

function defaultAccentForKind(kind: ExploreKind): ExploreAccent {
  return kind === 'project' ? 'aurora' : 'forge';
}

export function getExploreVisualConfig(slug: string, kind: ExploreKind): ExploreVisualConfig {
  const backdrop = HERO_BACKDROPS[slug] ?? HERO_PLACEHOLDER;
  const accent = ACCENT_BY_SLUG[slug] ?? defaultAccentForKind(kind);
  return {
    heroBackdrop: backdrop,
    heroBackdropPosition: 'center',
    heroOverlayOpacity: 0.62,
    accent,
  };
}
