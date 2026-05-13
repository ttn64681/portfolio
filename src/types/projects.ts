// One authoring row in `data/config/projects.ts`. `id` is always the Explore slug (and portfolio base id).
// `carouselId` is optional: set only in `Projects.tsx` when mapping for list keys (`proj-…`). Omit in the data
// file so Explore / registry never see it.

import type { ExploreDossierInput } from '@/types/explore/dossier-input';

export type ProjectConfig = {
  id: string;
  /** Homepage carousel/grid — React `key` (`proj-…`). Omit in `projects.ts`. */
  carouselId?: string;
  title?: string;
  summary?: string;
  role?: string;
  award?: string;
  bullets: string[];
  techStack?: string[];
  date?: string;
  link?: string;
  github?: string;
  exploreDossier?: ExploreDossierInput;
};
