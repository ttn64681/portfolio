/**
 * Types for projects: derived from portfolio documents and used by Projects list and cards.
 */

export type ProjectInfo = {
  id: string;
  baseId: string;
  title: string;
  summary: string;
  techStack?: string[];
  date?: string;
  bullets: string[];
};
