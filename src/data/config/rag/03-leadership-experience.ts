import { toDocument } from './to-document';

/** Clubs + paid/contract work. Holywatr first; DevDogs is secondary experience. */
export const leadershipExperienceDocuments = [
  toDocument(
    'leadership-acm',
    `May 2025 – May 2026: Thai served as Executive Officer and CSIP Chair for UGA ACM, a 300+ member organization. \
    He co-led technical/professional events in collaboration with Google, AWS, and Toyota; led weekly interview-prep \
    workshops for 20+ students (DSA, system design, behavioral) and iterated content from attendee feedback; directed \
    UI/UX and branding refreshes in Figma for recruiting/club visibility; and mentored incoming executive board members.`,
    {
      title: 'UGA ACM — Executive Officer & CSIP Chair',
      techStack: ['Figma', 'Workshop curriculum', 'Jira', 'Event operations'],
      category: 'leadership',
    },
  ),
  toDocument(
    'exp-freelance-holywatr',
    `Nov 2025 – Mar 2026: Freelance Web Developer for Holywatr — a multi-page brand platform (JS/CSS/HTML) for an artist \
    with 659K+ monthly listeners. Integrated Shopify Storefront GraphQL queries to power merch catalog flows and storefront \
    interactions. Optimized SEO via asset compression and crawlability setup (Open Graph, sitemap.xml, robots.txt). Also \
    shipped a VFX.js shader layer (CRT, chromatic aberration, fish-eye) with usable hit targets. Site: holywatr.com`,
    {
      title: 'Holywatr — Freelance Web Developer',
      techStack: [
        'JavaScript',
        'HTML5',
        'CSS3',
        'Shopify Storefront API',
        'GraphQL',
        'VFX.js',
        'Klaviyo',
      ],
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
