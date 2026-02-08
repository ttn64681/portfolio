/**
 * Experience section config: full-width blocks (e.g. roles, freelance, leadership).
 */

import type { ExperienceConfig } from '@/types/experience';

export const experienceConfig: ExperienceConfig[] = [
  {
    id: 'acm',
    title: 'UGA ACM',
    role: 'Executive Officer & CSIP Co-Chair',
    date: 'May 2025 – Present',
    summary: 'Leading technical workshops and UI/UX for student engagement.',
    bullets: [
      'Lead weekly technical workshops on Data Structures, Algorithms, and behavioral interview prep for 10+ students.',
      'Direct UI/UX redesigns in Figma for club branding and digital presence.',
      'Manage recruitment event logistics and help increase engagement across the organization.',
    ],
    techStack: ['Figma', 'Workshop Leadership', 'Recruitment'],
  },
  {
    id: 'holywatr',
    title: 'Holywatr',
    role: 'Contract Full-Stack Developer',
    date: 'Fall 2025',
    summary: 'Multi-page brand platform for a rock band with a digital-horror aesthetic.',
    bullets: [
      'Engineered a multi-page brand platform using vanilla JavaScript and CSS to meet a strict "digital-horror" aesthetic.',
      'Integrated Shopify Storefront API via customized GraphQL queries and implemented visual effects with VFX.js (chromatic aberration, CRT distortion).',
      'Solved performance bottlenecks using requestAnimationFrame to maintain 60fps with heavy shaders.',
    ],
    techStack: ['JavaScript', 'CSS', 'Shopify Storefront API', 'GraphQL', 'VFX.js'],
  },
];
