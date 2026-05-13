// Shapes for `/explore` (poster, hub, merge). Site copy and `buildExploreDetail` live under `src/data/explore/`.

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
  overview: string;
  demoLink?: string;
  repoLink?: string;
  award?: string;
  stack: string[];
  features: string[];
  implementation: string[];
  challenges: string[];
  reflection: string[];
  gallery: ExploreGalleryItem[];
  youtube: ExploreYoutubeItem[];
  heroBackdrop?: string;
  heroBackdropPosition?: string;
  heroOverlayOpacity?: number;
  accent?: ExploreAccent;
  figures?: Partial<Record<ExploreFigureSection, ExploreGalleryItem[]>>;
};
