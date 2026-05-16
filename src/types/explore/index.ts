// Shapes for `/explore` (poster, hub). Detail rows come from `buildExploreDetail` (`src/data/explore/registry.ts`).

export type { ExploreAccent } from './accent';
export type { ExploreDossierInput } from './dossier-input';
export type { ExploreFigureSection, ExploreGalleryItem, ExploreYoutubeItem } from './poster-media';
export type { ExploreKind } from './kind';
export type { HubFocusParam } from './hub';
export type { ExploreOrderEntry, ExploreMergedEntry } from './registry-types';
export type { ExploreVisualConfig } from './visual-config';

import type { ExploreAccent } from './accent';
import type { ExploreFigureSection, ExploreGalleryItem, ExploreYoutubeItem } from './poster-media';
import type { ExploreKind } from './kind';

/** URL segment: same as `id` on that row in `data/config/projects.ts` or `data/config/experience.ts`. */
export type ExploreSlug = string;

export type ExploreDetail = {
  slug: ExploreSlug;
  kind: ExploreKind;
  title: string;
  role?: string;
  date?: string;
  summary?: string;
  /** Poster overview copy; omit `exploreDossier.overview` to hide the narrative block (meta may still use summary). */
  overview?: string;
  demoLink?: string;
  repoLink?: string;
  award?: string;
  /** Tech pills in the overview band; empty when the row has no `techStack`. */
  stack: string[];
  features?: string[];
  implementation?: string[];
  challenges?: string[];
  reflection?: string[];
  gallery?: ExploreGalleryItem[];
  youtube?: ExploreYoutubeItem[];
  heroBackdrop?: string;
  heroBackdropPosition?: string;
  heroOverlayOpacity?: number;
  accent?: ExploreAccent;
  figures?: Partial<Record<ExploreFigureSection, ExploreGalleryItem[]>>;
};
