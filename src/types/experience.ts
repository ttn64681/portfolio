import type { ExploreDossierInput } from '@/types/explore/dossier-input';

// One row in `data/config/experience.ts`. Same object feeds the homepage (`Experience.tsx` --> `ExperienceBlock`)
// and Explore (`/explore/[id]`, hub, merge). `exploreDossier` is optional poster overrides only — not a second copy
// of title/bullets/stack; those stay on this type for both surfaces.

export type ExperienceConfig = {
  id: string;
  title: string;
  role?: string;
  date?: string;
  summary?: string;
  bullets?: string[];
  techStack?: string[];
  /** Live site / demo (Explore overview actions). */
  link?: string;
  github?: string;
  exploreDossier?: ExploreDossierInput;
};
