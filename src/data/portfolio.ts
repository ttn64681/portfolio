import type { Document } from '@/types/chat';

/** Helper to build rich content for embedding from item fields. */
function toDocument(
  id: string,
  content: string,
  options?: { title?: string; techStack?: string[]; category?: string },
): Document {
  const parts = [
    options?.title,
    options?.techStack?.length ? `Tech: ${options.techStack.join(', ')}` : null,
    content,
  ].filter(Boolean) as string[];
  return {
    id,
    content: parts.join('. '),
    metadata: options?.category ? { category: options.category } : undefined,
  };
}

/** Portfolio documents for RAG. Includes bio, projects, skills, and hobbies. */
export const portfolioDocuments: Document[] = [
  // --- BIO & PHILOSOPHY ---
  toDocument(
    'bio-summary',
    `Thai Nguyen is a senior Computer Science student at the University of Georgia (UGA) with a unique blend of backend engineering skills and creative design passion. He specializes in full-stack architecture (Spring Boot, Next.js) and AI integration (RAG, Gemini), but distinguishes himself through a deep commitment to meaningful UI/UX. Thai doesn't just write code; he crafts cohesive user experiences, often leading the design process in Figma or creating custom pixel art assets in Aseprite to ensure the final product feels polished and intentional.`,
    { title: 'Professional Summary', category: 'bio' },
  ),
  toDocument(
    'philosophy-design',
    `Thai holds a strong passion for good and meaningful design, believing that software functionality must be matched by an intuitive and aesthetic user experience. He often bridges the gap between engineering and design teams. Tools: He is proficient in Figma for high-fidelity prototyping and Aseprite for creating pixel art assets. Impact: He frequently takes ownership of UI revisions and UX implementations in his projects (CourseHub, Cinema E-Booking), ensuring accessibility, responsiveness, and visual consistency.`,
    { title: 'Design Philosophy & UI/UX Passion', category: 'philosophy' },
  ),

  // --- EDUCATION ---
  toDocument(
    'education-uga',
    `Thai is pursuing a Bachelor of Computer Science at the University of Georgia (Athens, GA), expected to graduate in May 2026. Relevant coursework includes Data Structures, Algorithms, Software Engineering, Full-Stack Development, Computer Graphics, and Human-Computer Interaction concepts through his frontend work.`,
    { title: 'University of Georgia - BS Computer Science', category: 'education' },
  ),

  // --- EXPERIENCE: FREELANCE ---
  toDocument(
    'exp-freelance-holywatr',
    `In Fall 2025, Thai worked as a contract Full-Stack Developer for "Holywatr," a rock band. He engineered a multi-page brand platform using vanilla JavaScript and CSS to meet a strict "digital-horror" aesthetic. Design & Art: Thai implemented creative visual workarounds to match the band's gritty aesthetic, including custom assets and styling. Tech: Integrated the Shopify Storefront API via customized GraphQL queries and implemented complex visual effects using VFX.js (chromatic aberration, CRT distortion). UX: Solved performance bottlenecks using requestAnimationFrame loops to maintain 60fps even with heavy shaders.`,
    {
      title: 'Freelance Web Developer (Rock Band Brand Platform)',
      techStack: ['JavaScript', 'CSS', 'Shopify Storefront API', 'GraphQL', 'VFX.js', 'Aseprite'],
      category: 'experience',
    },
  ),

  // --- PROJECT: CINEMA E-BOOKING ---
  toDocument(
    'proj-cinema-backend',
    `For the "Actual Cinema Movies" project (Aug 2025 - Present), Thai architected a robust backend using Spring Boot 3.5 and PostgreSQL. He designed 80+ RESTful API endpoints, managed 15 JPA entities, and implemented Caffeine caching to optimize database loads. He also applied Facade and Virtual Proxy patterns to reduce API payloads by ~30-45%.`,
    {
      title: 'Cinema E-Booking System - Backend Architecture',
      techStack: ['Spring Boot 3.5', 'Java 17', 'PostgreSQL', 'Spring Security', 'Caffeine'],
      category: 'project',
    },
  ),
  toDocument(
    'proj-cinema-ui',
    `Thai led the UI/UX design for the Cinema E-Booking project. He utilized Figma to prototype the interface and spearheaded major UI revisions during the development phase. His focus was on creating a seamless booking flow—from movie browsing to seat selection and payment—ensuring the complex backend logic was presented through an intuitive, user-friendly frontend.`,
    {
      title: 'Cinema E-Booking System - UI/UX Design',
      techStack: ['Figma', 'Next.js 16', 'Tailwind CSS'],
      category: 'project',
    },
  ),

  // --- PROJECT: RAG PORTFOLIO ---
  toDocument(
    'proj-rag-portfolio-tech',
    `Thai built this portfolio (June 2025 - Present) using a "zero-dollar" RAG architecture. It uses Upstash Redis as a vector store and Google's gemini-embedding-001 model for semantic search. To optimize costs, he implemented SHA-256 version hashing and query embedding caching. The chat interface uses the Vercel AI SDK to stream responses from the gemini-2.5-flash model via the Edge Runtime.`,
    {
      title: 'RAG-Powered AI Portfolio - Technical Architecture',
      techStack: ['Next.js 15', 'Gemini API', 'Upstash Redis', 'Vercel AI SDK', 'Edge Runtime'],
      category: 'project',
    },
  ),
  toDocument(
    'proj-rag-portfolio-art',
    `The portfolio showcases Thai's artistic abilities alongside his code. He used Aseprite to hand-draw all pixel art assets and animations found on the site. He engineered a custom multi-layer parallax background system using CSS sprite sheets and linear interpolation (lerp) to create smooth, interactive depth without compromising browser performance.`,
    {
      title: 'RAG-Powered AI Portfolio - Art & Design',
      techStack: ['Aseprite', 'CSS', 'Framer Motion', 'Pixel Art'],
      category: 'project',
    },
  ),

  // --- PROJECT: COURSEHUB ---
  toDocument(
    'proj-coursehub-tech',
    `CourseHub ("Best Class Project," Spring 2025) is an educational platform led by Thai. He integrated Gemini AI and YouTube APIs to reduce manual study plan creation time by ~90% and engineered 15+ RESTful endpoints for resource sharing and authentication.`,
    {
      title: 'CourseHub - Technical Implementation',
      techStack: ['Next.js 14', 'MongoDB', 'NextAuth.js', 'Gemini AI'],
      category: 'project',
    },
  ),
  toDocument(
    'proj-coursehub-ui',
    `Thai owned the UI/UX design for CourseHub. He defined the project's design system using Tailwind CSS, creating a cohesive color palette and typography scale. He built reusable components (Navbar, ResourceForum) and iterated on the design based on user flow testing to ensure the platform was accessible and responsive across devices.`,
    {
      title: 'CourseHub - UI/UX & Design System',
      techStack: ['Figma', 'Tailwind CSS', 'Responsive Design'],
      category: 'project',
    },
  ),

  // --- PROJECT: TOWER ASCENT ---
  toDocument(
    'proj-tower-ascent',
    `For "Tower Ascent" (Sep 2025 - Present), Thai serves as both a Programmer and Artist. Engineering: He designed a componentized inventory UI using dependency injection to decouple display logic from game state. Art & Animation: Thai uses Aseprite to create pixel art assets and animations for the game. He implements these assets using Godot's AnimationPlayer, keyframing UI transitions and cutscenes to bring the pixel art to life.`,
    {
      title: 'Tower Ascent - Game Development & Art',
      techStack: ['Godot 4.4', 'GDScript', 'Aseprite'],
      category: 'project',
    },
  ),

  // --- SKILLS ---
  toDocument(
    'skills-technical',
    `Thai's technical stack includes: Core: Java, JavaScript, TypeScript, Python, GDScript. Full-Stack: Spring Boot 3.5, Next.js, React, Node.js. Data: PostgreSQL, MongoDB, Redis (Upstash), Vector Search. AI: RAG, Gemini API, Vercel AI SDK, Embeddings. Design & Art Tools: Figma (UI/UX), Aseprite (Pixel Art/Animation), VFX.js.`,
    { title: 'Technical Skills', category: 'skill' },
  ),
  toDocument(
    'skills-soft',
    `Thai excels in leadership (Scrum Master, ACM Exec) and bridging the gap between technical and creative teams. He has a passion for meaningful design, strong client collaboration skills, and experience managing iterative feedback loops to refine UI/UX.`,
    { title: 'Soft Skills', category: 'skill' },
  ),

  // --- HOBBIES ---
  toDocument(
    'hobbies-creative',
    `Thai enjoys creative outlets like drawing and sketching. He plays drums, guitar, and violin, and loves listening to music. These hobbies complement his work in pixel art and UI design, bringing an artistic sensibility to his technical projects.`,
    { category: 'hobbies' },
  ),
  toDocument(
    'hobbies-media',
    `Thai watches anime and reads manga, manhwa, and webtoons. He grew up on One Piece and still follows it. He's also known to doomscroll on YouTube, Discord, and Instagram—classic college student behavior.`,
    { category: 'hobbies' },
  ),
  toDocument(
    'hobbies-outdoors',
    `Thai likes to get outside and walk trails, explore canyons, and hike mountains. It's a nice break from the screen and helps clear his head between coding sessions.`,
    { category: 'hobbies' },
  ),
  toDocument(
    'hobbies-sports',
    `Thai plays volleyball and badminton when he can. Good for staying active and blowing off steam during busy semesters.`,
    { category: 'hobbies' },
  ),
  toDocument(
    'hobbies-dev-play',
    `Thai loves making games and building UI outside of coursework—it's both a hobby and a way to level up his skills. He also enjoys playing games in his downtime.`,
    { category: 'hobbies' },
  ),
];
