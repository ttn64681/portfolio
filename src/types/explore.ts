/**
 * Explore showcase: /explore/[slug] detail shape (placeholder-friendly).
 */

export type ExploreKind = 'project' | 'experience';

/** Slug matches `ProjectConfig.id` or `ExperienceConfig.id`. */
export type ExploreSlug = string;

export type ExploreAccent = 'aurora' | 'forge' | 'arcade' | 'ledger';

export type ExploreFigureSection =
  | 'overview'
  | 'features'
  | 'implementation'
  | 'challenges'
  | 'reflection';

export type ExploreGalleryItem = {
  alt: string;
  caption?: string;
  /** Set when a real asset exists; omit for dashed placeholders. */
  src?: string;
  /** GIFs should use `<img>` in the UI to preserve animation. */
  mediaKind?: 'image' | 'gif';
};

export type ExploreYoutubeItem = {
  title?: string;
  videoId?: string;
};

export type ExploreDetail = {
  slug: ExploreSlug;
  kind: ExploreKind;
  title: string;
  role?: string;
  date?: string;
  summary?: string;
  overview: string;
  /** Live site / demo URL (projects). Shown as Link sprite in poster. */
  demoLink?: string;
  /** GitHub or repo URL (projects). Shown as Octocat sprite in poster. */
  repoLink?: string;
  /** Achievement line from project config when applicable. */
  award?: string;
  stack: string[];
  features: string[];
  implementation: string[];
  challenges: string[];
  reflection: string[];
  gallery: ExploreGalleryItem[];
  youtube: ExploreYoutubeItem[];
  /** Full-bleed hero backdrop (Next Image `src`). */
  heroBackdrop?: string;
  heroBackdropPosition?: string;
  /** 0–1 darkness over backdrop for text legibility. */
  heroOverlayOpacity?: number;
  accent?: ExploreAccent;
  /** Inline imagery after each narrative block. */
  figures?: Partial<Record<ExploreFigureSection, ExploreGalleryItem[]>>;
};
