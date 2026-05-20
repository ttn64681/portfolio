/**
 * RAG corpus for portfolio chat — assembled in resume-friendly order.
 *
 * It DOES affect maintainability and matches `src/data/thai.txt` section flow.
 *
 * Folder map:
 *   01-bio.ts                  → bio-summary, philosophy-design, bio-executive
 *   02-contact-education.ts    → contact-info, education-uga
 *   03-leadership-experience.ts → leadership-acm, exp-freelance-holywatr, exp-devdogs-bulldog-planner
 *   04-projects.ts             → proj-cinema-*, proj-rag-*, proj-coursehub-*, proj-bird-audio, proj-domain-*, proj-bill-*
 *   05-games.ts                → game-* (UGA Game Builders & jams)
 *   06-skills.ts               → skills-*
 *   07-hobbies-career.ts       → hobbies-*, career-goals
 */

import type { Document } from '@/types/chat';
import { bioDocuments } from './01-bio';
import { contactEducationDocuments } from './02-contact-education';
import { leadershipExperienceDocuments } from './03-leadership-experience';
import { projectDocuments } from './04-projects';
import { gameDocuments } from './05-games';
import { skillDocuments } from './06-skills';
import { hobbiesCareerDocuments } from './07-hobbies-career';

export { toDocument } from './to-document';

export const portfolioDocuments: Document[] = [
  ...bioDocuments,
  ...contactEducationDocuments,
  ...leadershipExperienceDocuments,
  ...projectDocuments,
  ...gameDocuments,
  ...skillDocuments,
  ...hobbiesCareerDocuments,
];
