import { toDocument } from './to-document';

/** Clubs + paid/contract work. Holywatr first; DevDogs is secondary experience. */
export const leadershipExperienceDocuments = [
  toDocument(
    'leadership-acm',
    `May 2025 - May 2026: Thai serves as an Executive Officer and CSIP Co-Chair for UGA ACM (May 2025 – Present). He leads weekly technical \
    workshops for 20+ students on DSA, system design, AI topics, and behavioral interview prep; hosts industry sessions \
    with companies such as AWS and Google; and directs visual/brand refreshes in Figma (mascot, stickers, flyers, merch). \
    He iterates workshop scope using attendee feedback and manages recruitment event logistics.`,
    {
      title: 'UGA ACM — Executive Officer & CSIP Co-Chair',
      techStack: ['Figma', 'Workshop curriculum', 'Jira', 'Event operations'],
      category: 'leadership',
    },
  ),
  toDocument(
    'exp-freelance-holywatr',
    `Nov 2025 – Mar 2026: contract Web Developer for Holywatr (rock band brand platform, $2k+ project value). Built a \
    multi-page vanilla JS/CSS site with Shopify Storefront API + custom GraphQL for merch, Klaviyo contact flows, and a \
    VFX.js shader layer (CRT distortion, chromatic aberration, fish-eye warp). Solved warped-visual vs clickable hitbox \
    alignment, z-order/render-order issues, responsive breakpoints, asset compression, and basic SEO (meta, robots.txt). \
    Site: holywatr.com`,
    {
      title: 'Holywatr — Freelance Web Developer',
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'Shopify Storefront API', 'GraphQL', 'VFX.js', 'Klaviyo'],
      category: 'experience',
    },
  ),
  toDocument(
    'exp-devdogs-bulldog-planner',
    `Spring 2025: Bulldog Planner / Optimal Schedule Builder (UGA DevDogs — Google Developer Group at UGA): \
    contributed React + TypeScript + Tailwind frontend work on a student schedule optimization tool—filtering UX, \
    responsive pages, and bug fixes while learning React on a team where some implementations were later refactored. \
    Smaller scope than Holywatr or ACM leadership but solid early full-stack club experience. \
    GitHub: github.com/DevDogs-UGA/Optimal-Schedule-Builder`,
    {
      title: 'Bulldog Planner — UGA DevDogs (GDG)',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      category: 'experience',
    },
  ),
];
