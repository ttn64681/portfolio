/**
 * Manual project configuration for UI display.
 * - Condensed bullet points (3 max)
 * - Tech stack badges
 * - Dates
 * - Any other display-specific info
 */

export type ProjectConfig = {
  /** Project ID matching the base name from portfolio.ts (e.g., "cinema", "coursehub") */
  id: string;
  /** Title */
  title?: string;
  /** Role */
  role?: string;
  /** Optional colorful award or achievement badge */
  award?: string;
  /** Condensed bullet points (max 3) for flip cards and carousel expanded view */
  bullets: string[];
  /** Manual tech stack badges shown as bubbles at top of card */
  techStack?: string[];
  /** Project date range or completion date */
  date?: string;
};

export const projectsConfig: ProjectConfig[] = [
  {
    id: 'cinema',
    title: 'Absolute Cinema Movies - E-Booking Mockup',
    role: 'Scrum Master & Full-Stack Developer',
    award: 'Top Class Projects',
    bullets: [
      'Architected robust backend with Spring Boot 3.5 and PostgreSQL, designing 80+ RESTful API endpoints and managing 15 JPA entities.',
      'Implemented Caffeine caching and applied Facade/Virtual Proxy patterns to reduce API payloads by ~30-45%.',
      'Led UI/UX design using Figma, creating a seamless booking flow from movie browsing to seat selection and payment.',
    ],
    techStack: ['Spring Boot 3.5', 'Java 17', 'PostgreSQL', 'Spring Security', 'Caffeine'],
    date: 'Aug 2025 - Present',
  },
  {
    id: 'rag-portfolio',
    title: 'RAG-Powered AI Portfolio',
    role: 'Full-Stack Developer & Artist',
    bullets: [
      'Built a zero-dollar RAG architecture using Upstash Redis as vector store and Google Gemini embeddings for semantic search.',
      'Implemented SHA-256 version hashing and query embedding caching to optimize costs.',
      'Hand-drew all pixel art assets in Aseprite and engineered a custom multi-layer parallax background system with CSS sprites.',
    ],
    techStack: ['Next.js 15', 'Gemini API', 'Upstash Redis', 'Vercel AI SDK', 'Edge Runtime', 'Aseprite'],
    date: 'June 2025 - Present',
  },
  {
    id: 'coursehub',
    title: 'CourseHub - Educational Platform',
    role: 'Team Lead & Full-Stack Developer',
    award: 'Best Class Project',
    bullets: [
      'Led development of educational platform that integrated Gemini AI and YouTube APIs, reducing manual study plan creation time by ~90%.',
      'Engineered 15+ RESTful endpoints for resource sharing and authentication.',
      'Owned UI/UX design, defining the design system with Tailwind CSS and building reusable components for accessibility and responsiveness.',
    ],
    techStack: ['Next.js 14', 'MongoDB', 'NextAuth.js v5', 'Gemini AI', 'YouTube API', 'Tailwind CSS'],
    date: 'Spring 2025',
  },
  {
    id: 'tower-ascent',
    title: 'Tower Ascent - 2D Rogue-like RPG',
    role: 'Game Developer & Artist',
    bullets: [
      'Designed componentized inventory UI using dependency injection to decouple display logic from game state.',
      'Creates pixel art assets and animations in Aseprite for the game.',
      "Implements assets using Godot's AnimationPlayer, keyframing UI transitions and cutscenes.",
    ],
    techStack: ['Godot 4', 'GDScript', 'Aseprite'],
    date: 'Sep 2025 - Present',
  },
];

/**
 * Helper to get config for a project by its base ID.
 */
export function getProjectConfig(baseId: string): ProjectConfig | undefined {
  return projectsConfig.find((config) => config.id === baseId);
}
