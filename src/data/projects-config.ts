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
  /** One-line summary of what the app is and what you did */
  summary?: string;
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
  },
];

/**
 * Helper to get config for a project by its base ID.
 */
export function getProjectConfig(baseId: string): ProjectConfig | undefined {
  return projectsConfig.find((config) => config.id === baseId);
}
