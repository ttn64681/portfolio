/**
 * Manual project configuration for UI display.
 * This supplements the RAG documents in portfolio.ts with UI-specific metadata:
 * - Condensed bullet points (3 max)
 * - Manual tech badges (if different from RAG)
 * - Dates
 * - Any other display-specific info
 */

export type ProjectConfig = {
  /** Project ID matching the base name from portfolio.ts (e.g., "cinema", "coursehub") */
  id: string;
  /** Condensed bullet points (max 3) for flip cards and carousel expanded view */
  bullets: string[];
  /** Manual tech stack badges (if you want different/cleaner badges than what's in RAG) */
  techStack?: string[];
  /** Project date range or completion date */
  date?: string;
  /** Optional: custom title override */
  title?: string;
};

export const projectsConfig: ProjectConfig[] = [
  {
    id: 'cinema',
    bullets: [
      'Architected robust backend with Spring Boot 3.5 and PostgreSQL, designing 80+ RESTful API endpoints and managing 15 JPA entities.',
      'Implemented Caffeine caching and applied Facade/Virtual Proxy patterns to reduce API payloads by ~30-45%.',
      'Led UI/UX design using Figma, creating a seamless booking flow from movie browsing to seat selection and payment.',
    ],
    date: 'Aug 2025 - Present',
  },
  {
    id: 'rag-portfolio',
    bullets: [
      'Built a zero-dollar RAG architecture using Upstash Redis as vector store and Google Gemini embeddings for semantic search.',
      'Implemented SHA-256 version hashing and query embedding caching to optimize costs.',
      'Hand-drew all pixel art assets in Aseprite and engineered a custom multi-layer parallax background system with CSS sprites.',
    ],
    date: 'June 2025 - Present',
  },
  {
    id: 'coursehub',
    bullets: [
      'Led development of educational platform that integrated Gemini AI and YouTube APIs, reducing manual study plan creation time by ~90%.',
      'Engineered 15+ RESTful endpoints for resource sharing and authentication.',
      'Owned UI/UX design, defining the design system with Tailwind CSS and building reusable components for accessibility and responsiveness.',
    ],
    date: 'Spring 2025',
  },
  {
    id: 'tower-ascent',
    bullets: [
      'Designed componentized inventory UI using dependency injection to decouple display logic from game state.',
      'Creates pixel art assets and animations in Aseprite for the game.',
      "Implements assets using Godot's AnimationPlayer, keyframing UI transitions and cutscenes.",
    ],
    date: 'Sep 2025 - Present',
  },
];

/**
 * Helper to get config for a project by its base ID.
 */
export function getProjectConfig(baseId: string): ProjectConfig | undefined {
  return projectsConfig.find((config) => config.id === baseId);
}
