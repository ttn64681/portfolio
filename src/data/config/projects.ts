// Carousel + `/explore/<id>` (id = slug). Order = Explore hub list. Card: title, summary, bullets, stack, dates,
// link, github. Poster-only bits: optional `exploreDossier` (see `src/data/explore/dossier-defaults.ts`).

import type { ProjectConfig } from '@/types/projects';

export const projectsConfig: ProjectConfig[] = [
  {
    id: 'cinema',
    title: 'ACM Cinema',
    role: 'Scrum Master & Full-Stack',
    award: 'Top Class Projects',
    summary: 'A mock Cinema E-booking System using Spring Boot 3.5 and PostgreSQL.',
    bullets: [
      'Architected robust backend with Spring Boot 3.5 and PostgreSQL, designing 80+ RESTful API endpoints and managing 15 JPA entities.',
      'Implemented Caffeine caching and applied Facade/Virtual Proxy patterns to reduce API payloads by ~30-45%.',
      'Led UI/UX design using Figma, creating a seamless booking flow from movie browsing to seat selection and payment.',
    ],
    techStack: ['Spring Boot', 'PostgreSQL', 'Spring Security', 'Docker', '✚'],
    date: 'Aug 2025 - Present',
    link: 'https://acm-cinema.vercel.app',
    github: 'https://github.com/ttn64681/Absolute-Cinema-Movies',
  },
  {
    id: 'rag-portfolio',
    title: 'This Website!',
    role: 'Full-Stack & Artist',
    summary: 'My passion project portfolio, featuring pixel art/animations and a RAG Chatbot.',
    bullets: [
      'Built a zero-dollar RAG architecture using Upstash Redis as vector store and Google Gemini embeddings for semantic search.',
      'Implemented SHA-256 version hashing, query embedding caching, rate-limiting, and exponential back-off to minimize api costs.',
      'Hand-drew all pixel art assets in Aseprite and created a multi-layer parallax background wallpaper with CSS sprites.',
    ],
    techStack: [
      'Next.js',
      'Gemini API',
      'Upstash Redis',
      'Vercel AI SDK',
      'Framer Motion',
      'Aseprite',
    ],
    date: 'June 2025 - Present',
    github: 'https://github.com/ttn64681/portfolio'
  },
  {
    id: 'coursehub',
    title: 'CourseHub',
    role: 'Team Lead & Full-Stack',
    award: 'Best Class Project',
    summary:
      'An educational platform for UGA students to chat, post, and generate study resources.',
    bullets: [
      'Led development of educational platform that integrated Gemini AI and YouTube Data API, reducing manual study plan creation time by ~90%.',
      'Engineered 15+ RESTful endpoints for resource sharing and authentication.',
      'Owned UI/UX design, defining the design system with Tailwind CSS and building reusable components for accessibility and responsiveness.',
    ],
    techStack: ['Next.js', 'MongoDB', 'NextAuth.js', 'Gemini API', 'YouTube API', '✚'],
    date: 'Spring 2025',
    link: 'https://course-hub-uga.vercel.app',
    github: 'https://github.com/ttn64681/Web-Dev-Group-Project',
  },
  {
    id: 'tower-ascent',
    title: 'Tower Ascent',
    role: 'Game Developer & Artist',
    summary: 'A 2D rogue-like RPG with a modular trading and inventory system.',
    bullets: [
      'Designed componentized inventory UI using dependency injection to decouple display logic from game state.',
      'Created pixel art assets in Aseprite and keyframed animations in Godot for enhanced immersion.',
      "Implements assets using Godot's AnimationPlayer, keyframing UI transitions and cutscenes.",
    ],
    techStack: ['Godot 4', 'GDScript', 'Keyframes', 'Aseprite'],
    date: 'Sep 2025 - Present',
    link: 'https://opuhlos.itch.io/tower-ascent',
  },
  {
    id: 'bill-cypher',
    title: 'Bill Cipher',
    role: 'Developer',
    summary: 'Three.js scene / experiment — Bill Cipher themed (Mar 2026).',
    bullets: [
      'Three.js build — add your one-liners when ready.',
      'Wire live demo + repo links on this row when URLs exist.',
      'Optional exploreDossier.gallery / figures on this entry for poster media.',
    ],
    techStack: ['Three.js', 'WebGL'],
    date: 'Mar 2026',
    link: undefined,
    github: undefined,
  },
  {
    id: 'domain-expansion',
    title: 'Domain Expansion',
    role: 'Developer',
    summary: 'Three.js project — domain expansion vibe (Apr 2026).',
    bullets: [
      'Three.js — replace with real feature bullets.',
      'Add demo + GitHub on this row when you have them.',
      'Drop captures under /public and list paths in exploreDossier.gallery.',
    ],
    techStack: ['Three.js', 'WebGL'],
    date: 'Apr 2026',
    link: undefined,
    github: undefined,
  },
  {
    id: 'bird-audio-classification',
    title: 'Bird audio classification',
    role: 'Research / ML',
    summary: 'Transfer learning with HuBERT and AST transformer models (Apr 2026).',
    bullets: [
      'HuBERT + AST — tighten wording when paper / writeup is ready.',
      'GitHub + video demo: fill link fields when published.',
      'Poster gallery / figures: set exploreDossier on this entry when ready.',
    ],
    techStack: ['Python', 'PyTorch', 'HuBERT', 'AST', 'Audio ML'],
    date: 'Apr 2026',
    link: undefined,
    github: undefined,
  },
];

export function getProjectConfig(slug: string): ProjectConfig | undefined {
  return projectsConfig.find((config) => config.id === slug);
}
