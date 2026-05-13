import { experienceConfig } from '@/data/experience-config';
import { extrasGames } from '@/data/extras-games';
import { projectsConfig } from '@/data/projects-config';

/**
 * Link lists for `ExploreHubClient` flip panels (`?focus=projects|experiences|games`).
 * Games items → `/extras/games/[slug]`; projects/experiences → `/explore/[slug]`.
 */
export function getHubProjectLinks(): { slug: string; label: string }[] {
  return projectsConfig.map((p) => ({
    slug: p.id,
    label: p.title ?? p.id,
  }));
}

/** Hub flip panel: experiences — links to showcase slugs. */
export function getHubExperienceLinks(): { slug: string; label: string }[] {
  return experienceConfig.map((e) => ({
    slug: e.id,
    label: e.title,
  }));
}

/** Hub flip panel: games — links to dossier routes (no lobby page). */
export function getHubGameLinks(): { slug: string; label: string }[] {
  return extrasGames.map((g) => ({ slug: g.slug, label: g.title }));
}

export type HubFocusParam = 'projects' | 'experiences' | 'games';

export function isHubFocus(v: string | null): v is HubFocusParam {
  return v === 'projects' || v === 'experiences' || v === 'games';
}
