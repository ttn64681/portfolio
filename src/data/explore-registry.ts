import { experienceConfig } from '@/data/experience-config';
import { getProjectConfig, projectsConfig } from '@/data/projects-config';
import type { ExperienceConfig } from '@/types/experience';
import type { ExploreDetail, ExploreKind } from '@/types/explore';
import { getExploreVisualConfig } from '@/data/explore-visual-overrides';

/**
 * Explore hub order + dossier data builder.
 *
 * `EXPLORE_ORDER` drives `/explore` hub lists, the chip strip under heroes, and prev/next rings — edit only via
 * projects-config + experience-config order. `buildExploreDetail` merges that entry with `explore-visual-overrides`
 * and placeholder copy/media; swap placeholders per slug when you wire real content (or extend the builder).
 */
export type ExploreOrderEntry = {
  slug: string;
  kind: ExploreKind;
};

/** Projects first (config order), then experiences (config order). */
export const EXPLORE_ORDER: ExploreOrderEntry[] = [
  ...projectsConfig.map((p) => ({ slug: p.id, kind: 'project' as const })),
  ...experienceConfig.map((e) => ({ slug: e.id, kind: 'experience' as const })),
];

export type ExploreMergedEntry =
  | ({ kind: 'project'; slug: string } & NonNullable<ReturnType<typeof getProjectConfig>>)
  | ({ kind: 'experience'; slug: string } & ExperienceConfig);

export function getAllExploreSlugs(): string[] {
  return EXPLORE_ORDER.map((e) => e.slug);
}

export function getFirstExploreSlug(): string {
  return EXPLORE_ORDER[0]?.slug ?? '';
}

export function getExploreOrderIndex(slug: string): number {
  return EXPLORE_ORDER.findIndex((e) => e.slug === slug);
}

export function getNeighbors(slug: string): { prev: string; next: string } | null {
  const idx = getExploreOrderIndex(slug);
  if (idx === -1) return null;
  const len = EXPLORE_ORDER.length;
  /** Circular prev/next within `EXPLORE_ORDER` (used by hero keyboard + footer pager). */
  return {
    prev: EXPLORE_ORDER[(idx - 1 + len) % len].slug,
    next: EXPLORE_ORDER[(idx + 1) % len].slug,
  };
}

export function getExploreEntry(slug: string): ExploreMergedEntry | undefined {
  const meta = EXPLORE_ORDER.find((e) => e.slug === slug);
  if (!meta) return undefined;

  if (meta.kind === 'project') {
    const cfg = getProjectConfig(slug);
    if (!cfg) return undefined;
    return { kind: 'project', slug, ...cfg };
  }

  const exp = experienceConfig.find((e) => e.id === slug);
  if (!exp) return undefined;
  return { kind: 'experience', slug, ...exp };
}

const PLACEHOLDER_FEATURES = [
  'Shipped responsive layouts with pixel-aware spacing tokens shared across breakpoints.',
  'Added lightweight instrumentation on critical flows so regressions surface early.',
];

const PLACEHOLDER_IMPL = [
  'Next.js App Router with server components where IO-bound, client islands for interaction.',
  'Typed config-driven sections so showcase content stays centralized and auditable.',
];

const PLACEHOLDER_CHALLENGES = [
  'Balancing motion-heavy UI with reduced-motion accessibility expectations.',
  'Keeping bundle weight predictable while layering optional embeds and media.',
];

const PLACEHOLDER_REFLECTION = [
  'Would prototype the riskiest integration earlier instead of polishing chrome first.',
  'More snapshot coverage around layout primitives before scaling card variants.',
];

export function getExploreOrderByKind(kind: ExploreKind): ExploreOrderEntry[] {
  return EXPLORE_ORDER.filter((e) => e.kind === kind);
}

/** Labels for horizontal showcase strip under hero (projects + experiences order). */
export function getExploreStripItems(): { slug: string; title: string; kind: ExploreKind }[] {
  return EXPLORE_ORDER.map((e) => {
    const entry = getExploreEntry(e.slug);
    const title =
      entry?.kind === 'project'
        ? entry.title ?? e.slug
        : entry && entry.kind === 'experience'
          ? entry.title
          : e.slug;
    return { slug: e.slug, title: title ?? e.slug, kind: e.kind };
  });
}

/** Builds the prop object for `ExplorePoster` + hero metadata — starts from config and overlays visuals + demo gallery slots. */
export function buildExploreDetail(slug: string): ExploreDetail | null {
  const entry = getExploreEntry(slug);
  if (!entry) return null;

  const title =
    entry.kind === 'project'
      ? entry.title ?? entry.id
      : entry.title;

  const stack =
    entry.techStack && entry.techStack.length > 0 ? [...entry.techStack] : ['— add stack —'];

  const visual = getExploreVisualConfig(slug, entry.kind);

  const gallery = [
    { alt: 'Screenshot slot 1', caption: 'Replace with capture or mockup.' },
    { alt: 'Screenshot slot 2', src: '/pixel/webp/link-walk.webp' },
    { alt: 'Environment tile reference', src: '/pixel/webp/tiles.webp' },
    { alt: 'Portrait / mood', src: '/pixel/webp/portrait.webp' },
    { alt: 'Screenshot slot 5', caption: 'Add more entries freely — the grid accepts any count.' },
    { alt: 'Screenshot slot 6' },
  ];

  const figures: ExploreDetail['figures'] = {
    overview: [{ alt: 'Overview figure', src: '/pixel/webp/bubble-me.webp', caption: 'Pair imagery with the story.' }],
    features: [{ alt: 'Feature highlight', src: '/pixel/webp/octocat-float.webp' }],
    implementation: [{ alt: 'Implementation note', src: '/pixel/webp/pfp-me.webp' }],
  };

  return {
    slug,
    kind: entry.kind,
    title,
    role: entry.role,
    date: entry.date,
    summary: entry.summary,
    overview:
      entry.summary ??
      entry.bullets?.[0] ??
      'Overview placeholder — pull from your config or write custom detail later.',
    ...(entry.kind === 'project'
      ? {
          demoLink: entry.link,
          repoLink: entry.github,
          award: entry.award,
        }
      : {}),
    stack,
    features: PLACEHOLDER_FEATURES,
    implementation: PLACEHOLDER_IMPL,
    challenges: PLACEHOLDER_CHALLENGES,
    reflection: PLACEHOLDER_REFLECTION,
    gallery,
    youtube: [{ title: 'Walkthrough / trailer (optional)', videoId: undefined }],
    heroBackdrop: visual.heroBackdrop,
    heroBackdropPosition: visual.heroBackdropPosition,
    heroOverlayOpacity: visual.heroOverlayOpacity,
    accent: visual.accent,
    figures,
  };
}
