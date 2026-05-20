import { toDocument } from './to-document';

/** Major shipped projects (class + portfolio + graphics + ML). Same order as thai.txt “MAJOR PROJECT” sections. */
export const projectDocuments = [
  // ACM Cinema
  toDocument(
    'proj-cinema-backend',
    `ACM Cinema (Fall 2025): Thai architected the Spring Boot 3.5 + PostgreSQL (Neon) backend with 80+ REST endpoints, \
    15 JPA entities, Spring Security JWT/RBAC, BCrypt hashing, Caffeine cache (10 min TTL), pagination, and Facade / Virtual Proxy \
    patterns to cut payload weight ~30–45%.`,
    {
      title: 'ACM Cinema — Backend Architecture',
      techStack: ['Spring Boot 3.5', 'Java 17', 'PostgreSQL', 'Neon', 'Spring Security', 'JWT', 'Caffeine'],
      category: 'project',
    },
  ),
  toDocument(
    'proj-cinema-ui',
    `Thai led UI/UX for ACM Cinema in Figma and on the Next.js 16 client: booking flow from discovery/search through seat selection \
    and checkout, Framer Motion polish, TanStack Query domain hooks, and responsive layouts that keep complex backend logic approachable.`,
    {
      title: 'ACM Cinema — UI/UX & Frontend',
      techStack: ['Figma', 'Next.js 16', 'React 19', 'TypeScript', 'TanStack Query', 'Framer Motion', 'Tailwind CSS'],
      category: 'project',
    },
  ),
  toDocument(
    'proj-cinema-detail',
    `ACM Cinema is a multi-domain cinema booking platform (auth, movies, seats, promos, payments, orders, admin). Thai was Scrum Master \
    and full-stack lead for a 5-person team across four Scrum sprints. JWT auth with custom filters, role-based gates, typed API client \
    layer, and layered UI→hooks→API→services architecture. PostgreSQL on Neon with iterative schema/migration work (Flyway was attempted \
    but not used in the final stack). Recognized among the strongest projects in the Software Engineering course. Demo: acm-movies.vercel.app`,
    {
      title: 'ACM Cinema — Full-Stack Overview',
      techStack: [
        'Next.js 16',
        'Spring Boot 3.5',
        'PostgreSQL',
        'Neon',
        'TanStack Query',
        'Spring Security',
        'JWT',
        'Jira',
      ],
      category: 'project',
    },
  ),
  // RAG portfolio (this site)
  toDocument(
    'proj-rag-portfolio-tech',
    `Thai built this portfolio (June 2025 - Present) using a "zero-dollar" RAG architecture. It uses Upstash Redis as a vector \
    store and Google's gemini-embedding-001 model for semantic search. To optimize costs, he implemented SHA-256 version hashing \
    and query embedding caching. The chat interface uses the Vercel AI SDK to stream responses from the gemini-2.5-flash model via \
    the Edge Runtime.`,
    {
      title: 'RAG-Powered AI Portfolio — Technical Architecture',
      techStack: ['Next.js 15', 'Gemini API', 'Upstash Redis', 'Vercel AI SDK', 'Edge Runtime', 'TypeScript'],
      category: 'project',
    },
  ),
  toDocument(
    'proj-rag-portfolio-art',
    `The portfolio showcases Thai's artistic abilities alongside his code. He used Aseprite to hand-draw all pixel art assets\
     and animations found on the site. He engineered a custom multi-layer parallax background system using CSS sprite sheets\
      and linear interpolation (lerp) to create smooth, interactive depth without compromising browser performance.`,
    {
      title: 'RAG-Powered AI Portfolio - Art & Design',
      techStack: ['Aseprite', 'CSS', 'Framer Motion', 'Pixel Art'],
      category: 'project',
    },
  ),
  // CourseHub
  toDocument(
    'proj-coursehub-tech',
    `CourseHub ("Best Class Project," Spring 2025) is an educational platform led by Thai. He integrated Gemini AI and \
    YouTube APIs to reduce manual study plan creation time by ~90% and engineered 15+ RESTful endpoints for resource \
    sharing and authentication.`,
    {
      title: 'CourseHub - Technical Implementation',
      techStack: ['Next.js 14', 'MongoDB', 'NextAuth.js', 'Gemini AI'],
      category: 'project',
    },
  ),
  toDocument(
    'proj-coursehub-ui',
    `Thai owned the UI/UX design for CourseHub. He defined the project's design system using Tailwind CSS, creating a \
    cohesive color palette and typography scale. He built reusable components (Navbar, ResourceForum) and iterated on \
    the design based on user flow testing to ensure the platform was accessible and responsive across devices.`,
    {
      title: 'CourseHub - UI/UX & Design System',
      techStack: ['Figma', 'Tailwind CSS', 'Responsive Design'],
      category: 'project',
    },
  ),
  toDocument(
    'proj-coursehub-detail',
    `CourseHub (Mar-May 2025): full-stack educational resource hub for UGA students. Thai was Team Lead and \
    Full-Stack Developer. It automates study planning and resource sharing. Tech: Google Gemini AI and YouTube Data API v3 \
    for auto-generated course success plans and study links. Data: 4 MongoDB schemas using Mongoose for post-course associations \
    and resource management. Auth: NextAuth.js v5 with middleware-based route protection and JWT session strategies. \
    Award: "Best Class Project" for polished design and multiple features including content posting, liking, commenting, generation.`,
    {
      title: 'CourseHub - Full Detail',
      techStack: [
        'Next.js 14',
        'MongoDB',
        'Mongoose',
        'NextAuth.js v5',
        'Gemini AI',
        'YouTube API',
      ],
      category: 'project',
    },
  ),
  // Spring 2026 — ML & graphics
  toDocument(
    'proj-bird-audio',
    `Bird Audio Classification (April 2026 deep learning final, partner project). Compared HuBERT Base vs AST on \
    BirdCLEF+ for 10-class bird audio classification. Built PyTorch + HuggingFace Trainer pipeline with cached \
    datasets, macro-F1/precision/recall, confusion matrices, inference latency and FLOPs estimates, and demo inference. \
    GitHub: github.com/ttn64681/Bird-Audio-Classification`,
    {
      title: 'Bird Audio Classification (PyTorch / HuBERT / AST)',
      techStack: ['PyTorch', 'Hugging Face', 'HuBERT', 'AST', 'Pandas', 'NumPy'],
      category: 'project',
    },
  ),
  toDocument(
    'proj-domain-expansion',
    `Domain Expansion Exhibit (Computer Graphics, Apr–May 2026). Three.js infinite-zoom exhibition with exponent-based \
    domain scaling, queue rotation, procedural generators, Perlin noise shaders, PBR + custom GLSL injection, quality \
    tiers, lil-gui diagnostics, and transparency/render-order tuning. Demo: domain-expansion-exhibit.vercel.app`,
    {
      title: 'Domain Expansion Exhibit (Three.js / GLSL)',
      techStack: ['Three.js', 'GLSL', 'JavaScript', 'lil-gui'],
      category: 'project',
    },
  ),
  toDocument(
    'proj-bill-cypher',
    `Bill Cipher Vaporwave Render (Computer Graphics, Feb 2026). Browser Three.js scene with fat-line outlines, \
    emissive/fog aesthetics, bloom/afterimage/RGB shift post stack, grouped scene architecture, and modulo floor-scroll \
    illusion. Demo: bill-cypher-vaporwave.vercel.app`,
    {
      title: 'Bill Cipher Vaporwave (Three.js)',
      techStack: ['Three.js', 'GLSL', 'JavaScript'],
      category: 'project',
    },
  ),
];
