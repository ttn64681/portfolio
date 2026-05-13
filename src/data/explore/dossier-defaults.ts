import type { ExploreDetail } from '@/types/explore';
import type { ExploreDossierInput } from '@/types/explore/dossier-input';

// Fill-ins for the Explore poster when `exploreDossier` on a row doesn’t set that piece yet.
//
// Where you edit:
// • New project --> `src/data/config/projects.ts`: push `{ id: 'my-slug', ... }`. Route is `/explore/my-slug`.
// • New job/club line --> `src/data/config/experience.ts` the same way (ids run after all projects on Explore).
// • Real poster copy/media for one slug --> same row, add `exploreDossier: { ... }`. Any field you set replaces
//   the matching default below for that slug only. `figures` merges by section; everything else is all-or-nothing.
// • Less filler everywhere --> shorten the DEFAULT_* arrays / gallery here. More filler for one page only --> use
//   `exploreDossier` on that row instead.
//
// Clearing placeholders for good: once every slug has `exploreDossier` covering what you care about, you can gut
// these defaults or leave a tiny neutral line — new slugs you add later would fall back to that until you fill them.

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

export const DEFAULT_EXPLORE_GALLERY: ExploreDetail['gallery'] = [
  { alt: 'Screenshot slot 1', caption: 'Replace with capture or mockup.' },
  { alt: 'Screenshot slot 2', src: '/pixel/webp/link-walk.webp' },
  { alt: 'Environment tile reference', src: '/pixel/webp/tiles.webp' },
  { alt: 'Portrait / mood', src: '/pixel/webp/portrait.webp' },
  { alt: 'Screenshot slot 5', caption: 'Add more entries freely — the grid accepts any count.' },
  { alt: 'Screenshot slot 6' },
];

export const DEFAULT_EXPLORE_FIGURES: NonNullable<ExploreDetail['figures']> = {
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

export const DEFAULT_EXPLORE_YOUTUBE: ExploreDetail['youtube'] = [
  { title: 'Walkthrough / trailer (optional)', videoId: undefined },
];

export const EXPLORE_OVERVIEW_FALLBACK =
  'Add summary/bullets on this row, or set exploreDossier.overview, when you’re ready to replace this line.';

export function mergeExploreDossier(overrides?: ExploreDossierInput): {
  features: string[];
  implementation: string[];
  challenges: string[];
  reflection: string[];
  gallery: ExploreDetail['gallery'];
  youtube: ExploreDetail['youtube'];
  figures: NonNullable<ExploreDetail['figures']>;
} {
  return {
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
