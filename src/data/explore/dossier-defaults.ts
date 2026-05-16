import type { ExploreDossierInput } from '@/types/explore/dossier-input';
import type {
  ExploreFigureSection,
  ExploreGalleryItem,
  ExploreYoutubeItem,
} from '@/types/explore/poster-media';

/**
 * When `true`, `mergeExploreDossier` fills any omitted dossier field with `DEFAULT_*` samples.
 * When `false` (default), only fields you set on the row are returned — poster hides empty sections.
 */
export const EXPLORE_USE_PLACEHOLDERS = false;

export const DEFAULT_EXPLORE_FEATURES = [
  'Shipped responsive layouts with pixel-aware spacing tokens shared across breakpoints.',
  'Added lightweight instrumentation on critical flows so regressions surface early.',
];

export const DEFAULT_EXPLORE_IMPLEMENTATION = [
  'Next.js App Router with server components where IO-bound, client islands for interaction.',
  'Typed config-driven sections so showcase content stays centralized and auditable.',
];

export const DEFAULT_EXPLORE_CHALLENGES = [
  'Balancing motion-heavy UI with reduced-motion accessibility expectations.',
  'Keeping bundle weight predictable while layering optional embeds and media.',
];

export const DEFAULT_EXPLORE_REFLECTION = [
  'Would prototype the riskiest integration earlier instead of polishing chrome first.',
  'More snapshot coverage around layout primitives before scaling card variants.',
];

export const DEFAULT_EXPLORE_GALLERY: ExploreGalleryItem[] = [
  { alt: 'Screenshot slot 1', caption: 'Replace with capture or mockup.' },
  { alt: 'Screenshot slot 2', src: '/pixel/webp/link-walk.webp' },
  { alt: 'Environment tile reference', src: '/pixel/webp/tiles.webp' },
  { alt: 'Portrait / mood', src: '/pixel/webp/portrait.webp' },
  { alt: 'Screenshot slot 5', caption: 'Add more entries freely — the grid accepts any count.' },
  { alt: 'Screenshot slot 6' },
];

export const DEFAULT_EXPLORE_FIGURES: Partial<
  Record<ExploreFigureSection, ExploreGalleryItem[]>
> = {
  overview: [
    {
      alt: 'Overview figure',
      src: '/pixel/webp/bubble-me.webp',
      caption: 'Pair imagery with the story.',
    },
  ],
  features: [{ alt: 'Feature highlight', src: '/pixel/webp/octocat-float.webp' }],
  implementation: [{ alt: 'Implementation note', src: '/pixel/webp/pfp-me.webp' }],
};

export const DEFAULT_EXPLORE_YOUTUBE: ExploreYoutubeItem[] = [
  { title: 'Walkthrough / trailer (optional)', videoId: undefined },
];

/** Fallback description hint only (e.g. metadata); not injected into the poster body unless placeholders are on. */
export const EXPLORE_OVERVIEW_FALLBACK =
  'Add summary/bullets on this row, or set exploreDossier.overview, when you’re ready to replace this line.';

export type MergedExploreDossier = {
  overview?: string;
  features?: string[];
  implementation?: string[];
  challenges?: string[];
  reflection?: string[];
  gallery?: ExploreGalleryItem[];
  youtube?: ExploreYoutubeItem[];
  figures?: Partial<Record<ExploreFigureSection, ExploreGalleryItem[]>>;
};

/**
 * Resolves dossier fields for `buildExploreDetail`.
 * With placeholders off, only keys present on `overrides` are returned (figures are not deep-merged with defaults).
 * With placeholders on, omitted keys get `DEFAULT_*` copy and figures merge per section.
 */
export function mergeExploreDossier(
  overrides?: ExploreDossierInput,
  usePlaceholders: boolean = EXPLORE_USE_PLACEHOLDERS,
): MergedExploreDossier {
  if (!usePlaceholders) {
    return {
      overview: overrides?.overview,
      features: overrides?.features,
      implementation: overrides?.implementation,
      challenges: overrides?.challenges,
      reflection: overrides?.reflection,
      gallery: overrides?.gallery,
      youtube: overrides?.youtube,
      figures: overrides?.figures,
    };
  }

  return {
    overview: overrides?.overview,
    features: overrides?.features ?? DEFAULT_EXPLORE_FEATURES,
    implementation: overrides?.implementation ?? DEFAULT_EXPLORE_IMPLEMENTATION,
    challenges: overrides?.challenges ?? DEFAULT_EXPLORE_CHALLENGES,
    reflection: overrides?.reflection ?? DEFAULT_EXPLORE_REFLECTION,
    gallery: overrides?.gallery ?? DEFAULT_EXPLORE_GALLERY,
    youtube: overrides?.youtube ?? DEFAULT_EXPLORE_YOUTUBE,
    figures: {
      ...DEFAULT_EXPLORE_FIGURES,
      ...overrides?.figures,
    },
  };
}
