/**
 * Types for projects: derived from projects-config.ts and used by Projects list and cards.
 */

export type ProjectInfo = {
  id: string;
  baseId: string;
  title: string;
  summary: string;
  role?: string;
  award?: string;
  techStack?: string[];
  date?: string;
  bullets: string[];
  link?: string;
  github?: string;
};
