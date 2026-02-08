/**
 * Experience entry for the Experience section (full-width blocks).
 */

export type ExperienceConfig = {
  id: string;
  /** Company or organization name */
  title: string;
  role?: string;
  date?: string;
  /** Short summary line */
  summary?: string;
  /** Key points (displayed as list) */
  bullets?: string[];
  techStack?: string[];
};
