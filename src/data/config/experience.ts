// Homepage strip + `/explore/<id>`. Listed after projects in Explore order.

import type { ExperienceConfig } from '@/types/experience';

export const experienceConfig: ExperienceConfig[] = [
  {
    id: 'holywatr',
    title: 'Holywatr',
    role: 'Web Developer',
    date: 'Fall 2025 – Present',
    link: 'https://www.holywatr.com/',
    summary:
      'Vanilla JS + Shopify GraphQL brand platform for a rock band with shader-heavy “digital horror” presentation.',
    bullets: [
      'Custom Storefront API integration with hand-tuned GraphQL for merch flows.',
      'VFX.js GLSL stack (CRT, chromatic aberration, fish-eye) aligned to usable hit targets.',
      'Hardened structure: page modules, compressed assets, responsive passes, SEO basics.',
    ],
    techStack: ['Vanilla JS', 'Shopify', 'GraphQL', 'VFX.js', '✚'],
    exploreDossier: {
      overview:
        'Freelance engagement delivering Holywatr’s multi-page presence: home, merch powered by Shopify, and contact flows with Klaviyo polish. The creative bar was high—distortion had to feel cinematic without breaking click fidelity.',
      features: [
        'Home template plus cohesive navigation.',
        'Merch views backed by Storefront GraphQL.',
        'Contact page and upgraded Klaviyo footer treatment.',
        'Slide-in YouTube mini-player on Home.',
        'Custom ASCII art and border language reinforcing the cathedral/digital-horror vibe.',
        'Hover/click micro-interactions sitewide.',
        'Responsive consistency across breakpoints.',
      ],
      implementation: [
        'Adapted and refactored existing Shopify Storefront GraphQL code paths for merch display flow and UI consistency.',
        'Organized project structure into cleaner page-level and asset-level modules to reduce coupling and duplicated logic.',
        'Implemented shader presentation layer with VFX.js and iteratively tuned effect intensity/placement behavior.',
        'Manually aligned interactive HTML elements under shader-distorted visuals so click regions remained usable.',
        'Tuned z-order and render behavior to reduce visual conflicts and preserve interaction reliability.',
        'Compressed image assets and tuned responsive CSS breakpoints for improved performance.',
        'Added robots/meta indexing signals to support crawlability and basic search visibility.',
      ],
      challenges: [
        'Biggest pain point: fish-eye warp made visual element location diverge from clickable DOM hitboxes.',
        'Shader rendering cost was a major bottleneck on weaker hardware.',
        'Required repeated trial-and-error to balance effect intensity with usability.',
        'Needed to align creative direction with partner/client final approvals and constraints.',
        'Early shader assumptions were naive, and debugging real browser render behavior took time and all-nighters.',
      ],
      reflection: [
        'This was genuinely exciting because real fans use it, so it didn’t feel like just another class artifact.',
        'I got humbled hard by shaders. At first I misunderstood what the browser was doing under the hood, and I assumed interactivity under heavy distortion would be near-impossible.',
        'The real problem ended up being warped visuals versus real hitboxes. I burned nights trying to make that passable, and while it wasn’t mathematically “perfect,” we got it to a usable state.',
        'If I revisit it now, I’d implement automatic quality tiers so shader intensity scales based on device capability.',
        'Also learned an important real-world lesson: I can push ideas and be creative, but final calls belong to contractor/client, and that balance matters.',
      ],
    },
  },
  {
    id: 'acm',
    title: 'UGA ACM',
    role: 'Executive Officer & CSIP Co-Chair',
    date: 'May 2025 – Present',
    summary:
      'Workshop program leader and brand steward for UGA ACM — DSA, system design, AI, and interview prep at scale.',
    bullets: [
      'Ran weekly CSIP sessions (20+ students) spanning algorithms, system design, AI, and behavioral prep.',
      'Hosted AWS, Google, and other industry rooms with Q&A and technical labs.',
      'Drove mascot, merch, and flyer refreshes in Figma to sharpen recruiting and culture.',
    ],
    techStack: ['Figma', 'Workshops', 'Mentorship', '✚'],
    exploreDossier: {
      overview:
        'Leadership role balancing curriculum design for Computer Science Interview Prep with broader ACM branding and event operations. The through-line is tight feedback loops: plan, teach, measure attendee signal, refine.',
      features: [
        'Weekly CSIP technical prep programming.',
        'Company-hosted Q&A and hands-on workshop nights.',
        'Interactive formats including technical Jeopardy.',
        'Brand modernization: mascot, stickers, flyers, merch concepts, digital assets.',
      ],
      implementation: [
        'Built workshop agendas around high-value interview topics and under-taught practical concepts (e.g., CI/CD, SQL vs NoSQL tradeoffs, scheduling concepts, interview framing).',
        'Iterated pacing and topic scope using attendee feedback and meeting overrun analysis.',
        'Applied visual hierarchy/readability/contrast design guidance to posters/flyers and PR graphics.',
        'Coordinated recurring delivery cadence while balancing leadership duties with intensive coursework and external projects.',
      ],
      challenges: [
        'Early workshops were overpacked and often ran overtime.',
        'One-hour time constraints forced sharper scope discipline and prioritization.',
        'Significant prep burden required recurring relearning and synthesis across technical topics.',
        'Sustained engagement and event quality under heavy semester load was stressful.',
      ],
      reflection: [
        'This role was stressful and time-consuming, but also really rewarding whenever attendees had an “aha” moment.',
        'My first meetings were honestly rough, and I had to learn quickly how not to cram everything into one hour.',
        'It boosted my public speaking and presentation confidence a lot.',
        'I had weeks where I questioned if I was really cut out to be an exec while juggling classes and side projects, but overall I’m glad I stuck with it.',
        'Being part of ACM opened up genuinely valuable connections with alumni and industry speakers, and I’m grateful for that.',
      ],
    },
  },
];
