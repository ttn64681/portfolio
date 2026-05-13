import { experienceConfig } from '@/data/config/experience';
import { getProjectConfig, projectsConfig } from '@/data/config/projects';
import { EXPLORE_OVERVIEW_FALLBACK, mergeExploreDossier } from '@/data/explore/dossier-defaults';
import { getExploreVisualConfig } from '@/data/explore/visual-overrides';
import type { ExploreDetail, ExploreKind } from '@/types/explore';
import type { ExploreMergedEntry, ExploreOrderEntry } from '@/types/explore/registry-types';

// Hub order: all of `projects.ts` in array order, then all of `experience.ts`. Poster body merges each row’s
// optional `exploreDossier` with `src/data/explore/dossier-defaults.ts`.

export const EXPLORE_ORDER: ExploreOrderEntry[] = [
  ...projectsConfig.map((p) => ({ slug: p.id, kind: 'project' as const })),
  ...experienceConfig.map((e) => ({ slug: e.id, kind: 'experience' as const })),
];

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
  // Wrap around for prev/next pager + keyboard.
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

export function getExploreOrderByKind(kind: ExploreKind): ExploreOrderEntry[] {
  return EXPLORE_ORDER.filter((e) => e.kind === kind);
}

export function getExploreStripItems(): { slug: string; title: string; kind: ExploreKind }[] {
  return EXPLORE_ORDER.map((e) => {
    const entry = getExploreEntry(e.slug);
    const title =
      entry?.kind === 'project'
        ? (entry.title ?? e.slug)
        : entry && entry.kind === 'experience'
          ? entry.title
          : e.slug;
    return { slug: e.slug, title: title ?? e.slug, kind: e.kind };
  });
}

export function buildExploreDetail(slug: string): ExploreDetail | null {
  const entry = getExploreEntry(slug);
  if (!entry) return null;

  const dossier = mergeExploreDossier(entry.exploreDossier);

  const title = entry.kind === 'project' ? (entry.title ?? entry.id) : entry.title;

  const stack =
    entry.techStack && entry.techStack.length > 0 ? [...entry.techStack] : ['— add stack —'];

  const visual = getExploreVisualConfig(slug, entry.kind);

  return {
    slug,
    kind: entry.kind,
    title,
    role: entry.role,
    date: entry.date,
    summary: entry.summary,
    overview:
      entry.exploreDossier?.overview ??
      entry.summary ??
      entry.bullets?.[0] ??
      EXPLORE_OVERVIEW_FALLBACK,
    ...(entry.kind === 'project'
      ? {
          demoLink: entry.link,
          repoLink: entry.github,
          award: entry.award,
        }
      : {}),
    stack,
    features: dossier.features,
    implementation: dossier.implementation,
    challenges: dossier.challenges,
    reflection: dossier.reflection,
    gallery: dossier.gallery,
    youtube: dossier.youtube,
    heroBackdrop: visual.heroBackdrop,
    heroBackdropPosition: visual.heroBackdropPosition,
    heroOverlayOpacity: visual.heroOverlayOpacity,
    accent: visual.accent,
    figures: dossier.figures,
  };
}
