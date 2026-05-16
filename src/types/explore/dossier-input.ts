import type { ExploreFigureSection, ExploreGalleryItem, ExploreYoutubeItem } from './poster-media';

// Shape of optional `exploreDossier` on a project or experience row. Only set fields you want on `/explore/[slug]`.
// `mergeExploreDossier` in `src/data/explore/dossier-defaults.ts` applies `DEFAULT_*` samples when `EXPLORE_USE_PLACEHOLDERS` is true.

export type ExploreDossierInput = {
  overview?: string;
  features?: string[];
  implementation?: string[];
  challenges?: string[];
  reflection?: string[];
  gallery?: ExploreGalleryItem[];
  youtube?: ExploreYoutubeItem[];
  figures?: Partial<Record<ExploreFigureSection, ExploreGalleryItem[]>>;
};
