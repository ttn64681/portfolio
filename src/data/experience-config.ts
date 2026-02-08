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
      "Created a DOPE new mascot! He's a little robot boy.",
    ],
    techStack: ['Figma', 'Workshop Leadership', 'Recruitment'],
  },
  {
    id: 'holywatr',
    title: 'Holywatr',
    role: 'Freelance Full-Stack Developer',
    date: 'Fall 2025',
    summary: 'Multi-page brand platform for a rock band with a digital-horror aesthetic.',
    bullets: [
      'Co-Developed a multi-page brand platform using vanilla JavaScript and CSS to meet a strict "digital-horror" aesthetic.',
      'Integrated Shopify Storefront API and customized GraphQL queries while implementing visual effects with VFX.js (chromatic aberration, CRT distortion).',
      'Managed iterative client feedback to deliver a high-fidelity, responsive UI/UX under time/technical limitations.',
    ],
    techStack: ['JavaScript', 'CSS', 'Shopify Storefront API', 'GraphQL', 'VFX.js'],
  },
];
