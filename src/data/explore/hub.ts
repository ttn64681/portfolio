import { experienceConfig } from '@/data/config/experience';
import { gameEntries } from '@/data/extras/games';
import { projectsConfig } from '@/data/config/projects';
import type { HubFocusParam } from '@/types/explore/hub';

// Flip-panel link lists: projects + experiences --> /explore/<slug>, games --> /extras/games/<slug>.

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
  return gameEntries.map((g) => ({ slug: g.slug, label: g.title }));
}

export function isHubFocus(v: string | null): v is HubFocusParam {
  return v === 'projects' || v === 'experiences' || v === 'games';
}
