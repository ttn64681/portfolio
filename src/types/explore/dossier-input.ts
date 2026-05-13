import type { ExploreFigureSection, ExploreGalleryItem, ExploreYoutubeItem } from './poster-media';

// Shape of optional `exploreDossier` on a project or experience row. Each field wins over the matching default in
// `src/data/explore/dossier-defaults.ts`. Skip the whole object until you care about the Explore poster.

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
