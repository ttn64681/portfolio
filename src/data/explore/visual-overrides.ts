import type { ExploreAccent } from '@/types/explore/accent';
import type { ExploreKind } from '@/types/explore/kind';
import type { ExploreVisualConfig } from '@/types/explore/visual-config';

// Hero backdrop + accent classes per slug. Mosaic gallery / figures = `exploreDossier` on the config row.

// Optional accent override per slug. Otherwise projects --> aurora, experiences --> forge.
export const ACCENT_BY_SLUG: Partial<Record<string, ExploreAccent>> = {};

// Hero image paths (public/). Slugs not listed keep gradient-only heroes.
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
