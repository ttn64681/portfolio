import { toDocument } from './to-document';

/** Major shipped projects (class + portfolio + graphics + ML). Same order as thai.txt “MAJOR PROJECT” sections. */
export const projectDocuments = [
  // ACM Cinema
  toDocument(
    'proj-cinema-backend',
    `ACM Cinema (Aug 2025 – Feb 2026): Thai architected the Spring Boot 3.5 + PostgreSQL (Neon) backend with 80+ REST endpoints, \
    15 JPA entities, Spring Security JWT/RBAC, BCrypt hashing, Caffeine cache (10 min TTL), pagination, and Facade / Virtual Proxy \
    patterns to cut payload weight ~30–45%. Backend was containerized with Docker and deployed to Render.`,
    {
      title: 'ACM Cinema — Backend Architecture',
      techStack: [
        'Spring Boot 3.5',
        'Java 17',
        'PostgreSQL',
        'Neon',
        'Docker',
        'Render',
        'Spring Security',
        'JWT',
        'Caffeine',
      ],
      category: 'project',
    },
  ),
  toDocument(
    'proj-cinema-ui',
    `Thai led UI/UX for ACM Cinema in Figma and on the Next.js 16 client: booking flow from discovery/search through seat selection \
    and checkout, Framer Motion polish, TanStack Query domain hooks, and responsive layouts that keep complex backend logic approachable.`,
    {
      title: 'ACM Cinema — UI/UX & Frontend',
      techStack: [
        'Figma',
        'Next.js 16',
        'React 19',
        'TypeScript',
        'TanStack Query',
        'Framer Motion',
        'Tailwind CSS',
      ],
      category: 'project',
    },
  ),
  toDocument(
    'proj-cinema-detail',
    `ACM Movies / Cinema E-Booking (Aug 2025 – Feb 2026): multi-domain cinema booking platform. Thai was Scrum Master \
    and full-stack lead for a 5-person Scrum/SWE team in Jira, improving sprint velocity by ~10% through refined user stories, \
    system modeling, and standardized layered architecture. Architected Spring Boot + PostgreSQL with 80+ REST endpoints and \
    15 JPA entities; containerized backend with Docker and deployed to Render. Reduced API payloads ~30–45% using DTO mapping, \
    pagination, and facade/proxy patterns. Implemented JWT + Spring Security RBAC with BCrypt/AES-based sensitive data protection. \
    Demo: acm-movies.vercel.app`,
    {
      title: 'ACM Cinema — Full-Stack Overview',
      techStack: [
        'Next.js 16',
        'Spring Boot 3.5',
        'PostgreSQL',
        'Docker',
        'Render',
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
    `RAG-AI Portfolio (Jun 2025 – Present): Thai built a RAG chat pipeline using Gemini embeddings, Upstash Redis for the \
    vector store, and the Vercel AI SDK to stream responses grounded by cosine similarity and prompt engineering. He manages \
    AI infrastructure costs via IP-based rate limiting, query embedding caching, and SHA-256 hashing. Production runs on Vercel; \
    Dockerized staging deploys to a local Proxmox Ubuntu VM via a self-hosted GitHub Actions runner with lint/typecheck and \
    RAG sync gates before docker compose up.`,
    {
      title: 'RAG-Powered AI Portfolio — Technical Architecture',
      techStack: [
        'Next.js 15',
        'Gemini API',
        'Upstash Redis',
        'Vercel AI SDK',
        'Docker',
        'GitHub Actions',
        'Proxmox',
        'TypeScript',
      ],
      category: 'project',
    },
  ),
  toDocument(
    'proj-rag-portfolio-homelab',
    `For the RAG portfolio staging environment, Thai authored a multi-stage Dockerfile (Node alpine deps/builder/runner with \
    Next.js standalone output) and Compose healthchecks/resource limits. The deploy-staging GitHub Actions workflow on a \
    self-hosted Linux runner: checkout → quality checks → write .env.staging from secrets → npm run rag:sync → docker compose \
    up --build -d → prune old images. He troubleshot Linux DNS host conflicts across vNICs, Windows NAT routing to the VM, \
    and Docker port bindings so staging stayed reachable from the host network.`,
    {
      title: 'RAG Portfolio — Docker / CI/CD Homelab Staging',
      techStack: [
        'Docker',
        'Docker Compose',
        'GitHub Actions',
        'Proxmox',
        'Ubuntu',
        'Linux networking',
      ],
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
  toDocument(
    'proj-homelab',
    `Homelab Staging Lab (2025 – Present): Thai runs Proxmox hypervisors and Ubuntu VMs as a hobby systems lab. He uses the \
    lab to Dockerize and CI/CD-deploy this portfolio's staging environment with a self-hosted GitHub Actions runner, practice \
    Linux networking (DNS, multi-vNIC, NAT), and keep container/image hygiene (compose limits, healthchecks, image prune). \
    Homelabbing is both a skill-building hobby and a concrete project demonstrating Docker + Actions integration.`,
    {
      title: 'Homelab — Proxmox, Ubuntu, Docker, GitHub Actions',
      techStack: ['Proxmox', 'Ubuntu', 'Linux', 'Docker', 'GitHub Actions', 'Bash'],
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
    `Bird Audio Classification (Apr 2026 – Present, research project). Fine-tuned and evaluated AST + HuBERT transformer \
    models with PyTorch/HuggingFace to classify 10 birds. Achieved 94%/91% accuracy on a large dataset (~5,000 samples) and \
    85%/69% on a small dataset (~1,500 samples) by analyzing macro-F1 scores and confusion matrices. Further optimized accuracy \
    by ~1–4% via data augmentation, L2 regularization, and learning rate scheduling. \
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
