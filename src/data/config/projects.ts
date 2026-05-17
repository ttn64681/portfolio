// Carousel + `/explore/<id>` (id = slug). Order = Explore hub list. Card: title, summary, bullets (≥2 for back),
// stack (~2 lines on card). Poster: `exploreDossier` — no gallery/figures until CMS.

import { watchUrlToEmbedFields } from '@/lib/parse-media-url';
import type { ProjectConfig } from '@/types/projects';

export const projectsConfig: ProjectConfig[] = [
  {
    id: 'cinema',
    title: 'ACM Cinema',
    role: 'Scrum Master & Full-Stack',
    award: 'Strong class demo / top-tier feedback',
    summary:
      'Multi-domain cinema booking: auth, movies, seats, promos, payments, orders, and admin — Spring + Next.',
    bullets: [
      'Architected an 80+ endpoint, 15-entity booking platform with JWT/RBAC, facades, pagination, and Caffeine caching.',
      'Led a five-person Scrum team in Jira and delivered a typed React client with domain hooks and Framer Motion polish.',
      'Shipped end-to-end booking from discovery to checkout with promos, admin tools, and post-demo hardening.',
    ],
    techStack: ['Next.js 16', 'Spring Boot 3.5', 'PostgreSQL', 'TanStack Query', '✚'],
    date: 'Aug 2025 – Present',
    link: 'https://acm-movies.vercel.app/',
    github: 'https://github.com/ttn64681/Absolute-Cinema-Movies',
    exploreDossier: {
      overview:
        'Layered full-stack cinema product spanning authentication, catalog search, seat orchestration, promotions, payments, orders, and admin workflows. I owned architecture direction, Spring Security integration, caching/pagination strategy, and frontend API boundaries while running Scrum across four sprints.',
      features: [
        'End-to-end booking lifecycle: discovery/search → seat selection → checkout/payment → order flows.',
        'AuthN/AuthZ with role-based gates for user vs admin capabilities.',
        'Pricing and promotions integrated into booking and payment paths.',
        'Admin workflows for domain management and operational controls.',
        'Reusable frontend domain hooks for movies, search, seats, payments, orders, and users.',
        'UI polish via Framer Motion on promotional and background components.',
        'Pagination and caching to keep data-heavy views responsive.',
      ],
      implementation: [
        'Designed layered frontend/backend flow to preserve maintainability as feature scope expanded.',
        'Implemented 80+ REST endpoints and 15 JPA entities over PostgreSQL (Neon), with relational modeling and migration iteration.',
        'Integrated BCrypt for one-way password hashing and AES-based reversible encryption in sensitive payment-related flows (with later acknowledgment that this security model needed stricter server authority/tokenization strategy).',
        'Applied facade-like client wrappers and aggregation strategies to standardize integrations across auth/movies/booking/promotions/payments/admin.',
        'Implemented Virtual Proxy/lazy-loading style responses in targeted flows to reduce initial payload overhead.',
        'Used React optimization primitives (`useMemo`, `useCallback`, `useRef`, context composition) to stabilize render behavior in complex pages.',
        'Added Caffeine cache TTL strategy (10 min) and coordinated with query/refetch behavior to manage freshness/performance tradeoffs.',
        'Added pagination and indexing-focused query improvements for frequently accessed records.',
        'Established Jira process, team ticketing discipline, and dev-guide conventions for multi-sprint consistency.',
      ],
      challenges: [
        'Requirements were strict and sometimes unclear; documentation overhead was large.',
        'Architectural ambition introduced conflicting partial abstractions (multiple wrapper/facade variants with inconsistent semantics).',
        'AI-assisted scaffolding accelerated development but often introduced inconsistent patterns and premature optimization debt.',
        'AuthN/AuthZ was one of the hardest subsystems and created difficult debugging cycles when implementation shortcuts were taken.',
        'Testing maturity lagged behind implementation pace (manual Postman/curl/print-debug heavy), causing regression risk.',
        'Some server authority weaknesses around client-supplied context.',
        'Difficulty with using Flyway for migration with Springboot/Neon.',
        'Duplicated request logic across multiple client wrappers.',
        'Oversized hooks (especially seat orchestration) as complexity hotspots.',
        'Overlapping caching layers (manual cache + query cache + memoization) increasing stale-data invalidation complexity.',
      ],
      reflection: [
        'This is still my hardest and most ambitious project by far.',
        'The challenge wasn’t just feature count—it was balancing architecture quality, team coordination, docs/process requirements, and all the new patterns I wanted to try.',
        'I learned that trying to implement every “industry-style” optimization at once can backfire if consistency and testing don’t keep up.',
        'AI helped a lot for skeletons and refactor suggestions, but it also made it easier to accidentally introduce inconsistent code and “premature optimization” traps.',
        'Biggest regret: we did not establish stronger automated testing/GitOps early enough.',
        'Still, I’m proud of the grind: tons of self-learning in Spring/React/Postgres, many all-nighters, and real leadership reps through Jira and project structure.',
        'We received strict demo feedback, fixed issues post-demo, and were told it was among the strongest projects in class. We were absolutely cheesing.',
      ],
      youtube: [{ title: 'ACM Cinema demo', ...watchUrlToEmbedFields('https://youtu.be/92fEVh5wNyI') }],
    },
  },
  {
    id: 'rag-portfolio',
    title: 'RAG-Powered Portfolio',
    role: 'Full-Stack & Artist',
    summary:
      'This site: Gemini edge chat, Redis RAG, rate limits, and a pixel-art interface you are browsing now.',
    bullets: [
      'Built Redis-backed RAG with embeddings, cosine ranking, corpus-hash re-embedding, and 24h query-embed cache.',
      'Streamed Gemini via Vercel AI SDK with guards, retries, and IP rate limiting surfaced to the client.',
      'Authored the pixel identity in Aseprite and choreographed menu/portrait/parallax interactions.',
    ],
    techStack: ['Next.js 15', 'Gemini', 'Upstash Redis', 'Vercel AI SDK', '✚'],
    date: 'June 2025 – Present',
    github: 'https://github.com/ttn64681/portfolio',
    exploreDossier: {
      overview:
        'Personal portfolio and chat surface where retrieval-augmented answers stay grounded in my resume and project corpus. The build couples streaming LLM output with cost controls, Redis vector search, and a handcrafted pixel UI layer.',
      features: [
        'Chatbot grounded in a personal project/experience corpus.',
        'Config-driven content architecture for fast updates.',
        'Edge-streamed responses with resilient error and retry-aware UX.',
        'Portrait idle animation, glasses toggle, dialogue variants, icon buttons, layered parallax.',
        'Distinct art direction with handmade pixel assets and motion polish.',
      ],
      implementation: [
        'Implemented embedding generation and Redis retrieval pipeline with cosine similarity ranking.',
        'Added SHA-256 query-embedding cache (24h TTL) to lower repeated embedding cost and latency.',
        'Implemented corpus hashing to auto-trigger re-embedding when underlying content changes.',
        'Added request-size and message-count guards for usage control and stability.',
        'Implemented Redis IP-based rate limiting with frontend-readable error semantics.',
        'Built typed hooks for typing state, timeline orchestration, responsive/parallax control, and interaction feedback pulses.',
        'Optimized media assets (including WebP compression) to reduce animation-heavy performance bottlenecks.',
        'Carried full cross-functional pipeline from Aseprite/Figma visual ideation to production code integration.',
        'Experimented with RabbitMQ during this project era and reused related queueing ideas later, though free-tier limits constrained continued usage.',
      ],
      challenges: [
        'Early performance was rough due to heavy parallax + animated menu combinations.',
        'Ongoing tradeoff between visual richness and runtime stability/performance.',
        'Security and durability still require hardening for larger traffic bursts.',
        'Free-tier limits on supporting infrastructure constrained some experimentation depth.',
        'Significant QA/refinement still needed for production-grade reliability.',
      ],
      reflection: [
        'This project is super personal to me. Seeing Aseprite -> Figma -> code turn into a living site over nearly a year was insanely rewarding.',
        'I put a lot of effort into tiny details because I wanted it to feel fun, not sterile.',
        'Fun fact: I made my own pixel GitHub icon before realizing there was already an official one.',
        'AI helped me move faster on boilerplate/type/error scaffolding, but the site still needs more hardening in perf/security/durability.',
        'I’m lowkey hoping traffic doesn’t spike too hard right now because I might be cooked.',
        'Still, performance improved massively after optimization passes and asset compression—my 2017 MacBook can handle it now!',
      ],
    },
  },
  {
    id: 'coursehub',
    title: 'CourseHub',
    role: 'Team Lead & Full-Stack',
    award: 'Best Class Project',
    summary:
      'UGA course discovery with AI enrichment, community posts, and YouTube-backed study resources.',
    bullets: [
      'Shipped Mongo-backed forums and REST workflows while integrating Gemini + YouTube to cut manual prep ~90%.',
      'Owned product direction, Figma system, and Kanban-driven execution across the team.',
      'Delivered 15+ endpoints with indexed Mongoose models for predictable reads and writes.',
    ],
    techStack: ['Next.js 14', 'MongoDB', 'NextAuth', 'Gemini API', '✚'],
    date: 'Mar – May 2025',
    link: 'https://course-hub-uga.vercel.app/',
    github: 'https://github.com/ttn64681/Web-Dev-Group-Project',
    exploreDossier: {
      overview:
        'Full-stack educational hub where students discover courses, share resources, and lean on AI plus YouTube metadata for study plans. I led idea selection, design, and implementation across the App Router surface and data layer.',
      features: [
        'Course discovery/search with AI-generated descriptions, topics, study plans, and resources.',
        'Community posts with comments, likes/unlikes, and owner-controlled deletion.',
        'YouTube enrichment with duration, views, channel, and thumbnail metadata.',
        'Responsive surfaces for search, sidebar, resources, forum, and contribution flows.',
        'Shared visual language across route-driven UX.',
      ],
      implementation: [
        'Built Next.js route handlers and server-side workflows for course/community operations.',
        'Modeled Course/Post/User relationships using Mongoose schemas, references, and index strategy.',
        'Added model fallback and quota-aware error messaging for external API dependence.',
        'Built reusable feature components and modularized frontend behavior for maintainability.',
        'Applied consistent Tailwind token usage for cohesive typography/color/layout patterns.',
        'Coordinated team workflow with Kanban structure and regular checkpoints.',
      ],
      challenges: [
        'First major web app project, so architecture decisions were made while still learning core web patterns.',
        'API route files grew heavy and less modular over time.',
        'Security and reliability practices were immature in early implementation phases.',
        'Last-mile stabilization was stressful (including pre-presentation runtime panic moments).',
      ],
      reflection: [
        'My first serious web app project, and wow what a ride.',
        'I literally pulled an all-nighter before presentation to polish UI, overslept, then got emergency calls because teammates couldn’t run the project.',
        'I didn’t fully know what I was doing architecturally at first, but I worked hard to keep team process structured and communication clear.',
        'I got one of my favorite compliments from teammates about being their most organized leader in a class project context.',
        'Looking back, I can clearly see security/robustness gaps that showed up again in later projects too—important lesson.',
      ],
      youtube: [
        {
          title: 'CourseHub walkthrough (Loom)',
          ...watchUrlToEmbedFields(
            'https://www.loom.com/share/04e8e8049bb446f3b017975b1e82d01e?sid=6928a038-d539-422c-9f3f-5fc7bf634940',
          ),
        },
      ],
    },
  },
  {
    id: 'domain-expansion',
    title: 'Domain Expansion Exhibit',
    role: '3D Modeler, Designer, Programmer',
    summary:
      'Infinite-zoom Three.js exhibit with procedural domains, shader sky/water, and quality tiers.',
    bullets: [
      'Built queue-based domain scaling for a seamless infinite zoom loop with intro → runtime handoff.',
      'Tuned transparency with renderOrder, depthWrite, alphaTest, and `onBeforeCompile` displacement on PBR.',
      'Shipped lil-gui diagnostics and high/medium/low presets to keep weaker hardware playable.',
    ],
    techStack: ['Three.js', 'GLSL', 'JavaScript', 'lil-gui', '✚'],
    date: 'Apr – May 2026',
    link: 'https://domain-expansion-exhibit.vercel.app/',
    github: 'https://github.com/ttn64681/ThreeJS-Final-Project',
    exploreDossier: {
      overview:
        'Computer graphics capstone focused on a “domain expansion” fantasy: cyclic rooms, procedural props, and shader-driven environment art. I owned a large share of runtime orchestration, shader integration, and graphics debugging.',
      features: [
        'Infinite zoom-loop exhibition with continuous traversal.',
        'Cinematic intro transitioning into interactive zoom runtime.',
        'Additive sprite layers with thematic overlays.',
        'Procedural meshes and RNG loot pools.',
        'Animated shader sky and water.',
        'Runtime dev panel for isolation, scaling, shader tuning, and diagnostics.',
        'High/medium/low quality tiers.',
      ],
      implementation: [
        'Built runtime orchestrator in `main.js` to unify scene state, camera/control logic, mode transitions, and UI interaction.',
        'Implemented exponent-domain treadmill + queue rotation so domain traversal feels continuous.',
        'Controlled transparency/painter-order behavior via `renderOrder`, `depthWrite`, `alphaTest`, and per-material opacity mapping.',
        'Added `onBeforeCompile` shader injection for animated displacement while preserving PBR material fundamentals.',
        'Modularized project into domain factories, procedural generation units, and shader modules for better teammate parallelism.',
        'Added graphics presets and tuning hooks to reduce per-device performance instability.',
      ],
      challenges: [
        'Transparency and depth ordering were very difficult and required heavy manual intervention.',
        'Too many render/material state updates were happening per-frame, causing avoidable CPU/GPU churn.',
        'Instancing policy wasn’t enforced early, causing draw-call growth from repeated meshes/groups.',
        'Some generator paths likely introduced unnecessary per-object material allocation.',
        'Loading/error/retry handling for models/textures was weak.',
        'Performance stayed the largest bottleneck across development.',
      ],
      reflection: [
        'I’m proud of this idea and how far we pushed it creatively.',
        'I definitely brute-forced parts of render-state behavior frame-by-frame because I didn’t fully know cleaner solutions yet.',
        'Despite how much I tried, performance is still an obvious bottleneck. Some immediate ideas I can think of to help this is using InstanceMesh or BatchedMesh to reduce draw calls by GPU.',
        'Performance humbled me a lot and made me respect highly-optimized Three.js experiences way more.',
        'This was still one of my favorite projects because it let me apply game-design-level creativity to a non-game interactive piece, which is exactly why I enjoy graphics work.',
      ],
      youtube: [{ title: 'Domain Expansion Exhibit', ...watchUrlToEmbedFields('https://youtu.be/1QTsEm6-OYw') }],
    },
  },
  {
    id: 'bill-cypher',
    title: 'Bill Cipher Vaporwave',
    role: '3D Programmer / Technical Artist',
    summary:
      'Stylized Three.js world: emissive character read, fat-line outlines, and a multi-pass post stack.',
    bullets: [
      'Assembled scene/camera/renderer/lighting/fog/animation/post scaffolding in ES modules.',
      'Chained bloom, afterimage, RGB shift, and gamma passes for the vaporwave read.',
      'Used modulo floor wrapping plus custom atlas work for looping motion illusions.',
    ],
    techStack: ['Three.js', 'GLSL', 'WebGL', 'Post FX', '✚'],
    date: 'Spring 2026',
    link: 'https://bill-cypher-vaporwave.vercel.app/',
    github: 'https://github.com/ttn64681/ThreeJS-Creative',
    exploreDossier: {
      overview:
        'Browser-based graphics study translating vaporwave aesthetics into a real-time Bill Cipher scene. Focused on post-processing chains, line rendering, and motion illusions grounded in a modular import-map setup.',
      features: [
        'Stylized vaporwave environment around the Bill Cipher subject.',
        'Multi-pass post stack for the signature look.',
        'Fat outlines and emissive treatment for contrast.',
        'Dual-floor scroll illusion and glyph-ring accents.',
      ],
      implementation: [
        'Structured ES module/import-map architecture for browser runtime.',
        'Built scene hierarchy with grouped entities and reusable material/geometry patterns.',
        'Implemented modulo-based floor motion (`camera.position.z = time % 2.0`) for looping movement illusion.',
        'Added custom texture workflows for floor displacement/metalness and glyph UV slicing.',
        'Tuned animation timing and stabilized previously frame-dependent behavior in later passes.',
      ],
      challenges: [
        'Initial implementation leaned heavily on tutorial inspiration before branching into more independent work.',
        'Performance remained a challenge on weaker laptop hardware.',
        'Some geometry organization (e.g., eyelash lines as many tiny objects) was less efficient than batched alternatives.',
      ],
      reflection: [
        'Major inspiration came from Maxime Heckel’s vaporwave Three.js article, and it was super fun to build from.',
        'I do think I leaned too hard on tutorial guidance early, though I expanded heavily afterward with custom additions.',
        'This project made me appreciate how fast code-based 3D iteration can feel versus Blender for simple stylized objects.',
        'Performance still wasn’t ideal on my laptop, but it taught me a lot about practical optimization opportunities.',
      ],
      youtube: [{ title: 'Bill Cipher vaporwave scene', ...watchUrlToEmbedFields('https://youtu.be/7DVnOH0POBE') }],
    },
  },
  {
    id: 'bird-audio-classification',
    title: 'Bird Audio Classification',
    role: 'Ideator, Programmer',
    summary:
      'Dual-backbone audio classifier comparing HuBERT and AST on a 10-species BirdCLEF+ slice.',
    bullets: [
      'Trained/evaluated HuBERT vs AST with cached HF datasets, full metrics, and class reports.',
      'Measured latency plus param/FLOPs estimates for presentation-ready comparisons.',
      'Shipped playful inference demos with persona-style narration for the final review.',
    ],
    techStack: ['PyTorch', 'HuggingFace', 'HuBERT', 'AST', '✚'],
    date: 'Spring 2026',
    github: 'https://github.com/ttn64681/Bird-Audio-Classification',
    exploreDossier: {
      overview:
        'Deep learning final exploring transformer audio backbones on real field recordings. The emphasis is on reproducible training, honest evaluation, and communicating comparative behavior—not chasing leaderboard scores.',
      features: [
        'Side-by-side HuBERT vs AST benchmark pipeline.',
        '10-species classifier built from common U.S. birds.',
        'End-to-end training/evaluation with reusable caching.',
        'Comparative reporting for overall and per-class behavior.',
        'Demo inference mode with playful presentation flavor.',
      ],
      implementation: [
        'Replaced pretrained classification heads for downstream 10-class objective.',
        'Built audio preprocessing and feature preparation pipeline for trainer-ready datasets.',
        'Implemented HuggingFace Trainer loop with validation and iterative hyperparameter tuning.',
        'Added `save_to_disk/load_from_disk` caching to skip expensive dataset rebuilds.',
        'Implemented confusion matrix and class-level reporting to inspect failure patterns.',
        'Measured inference runtime and computed rough efficiency metrics (params + FLOPs/MACs).',
        'Added persona-style print output in inference demos for a more engaging presentation.',
      ],
      challenges: [
        'Bugs often surfaced late into long training runs, making debug cycles expensive.',
        'Optimization scope remained basic (mostly hyperparameter-level) due time and workload constraints.',
        'Balancing class schedule with long training iteration cycles was difficult.',
        'Not intended as publication-grade research; focused on learning and functional comparative implementation.',
      ],
      reflection: [
        'This idea came from prior BERT assignment experience (MRPC, SQuAD, SST-2), and I wanted to apply transformer-style thinking to ecological monitoring.',
        'One search showed specialized bird-audio models already exist, but I still wanted to compare base-ish approaches and learn through building.',
        'It was not smooth. We had multiple “find the bug after an hour of training” moments.',
        'Even if this is basic by advanced ML standards, it was still hard for me and I’m glad we got a complete pipeline running.',
        'I added goofy persona narration in the demo because I think technical demos are way more memorable when they have some personality.',
      ],
    },
  },
  {
    id: 'bulldog-planner',
    title: 'Bulldog Planner',
    role: 'Frontend Developer',
    summary:
      'DevDogs scheduling UI: responsive surfaces, filters, and iterative fixes on the optimal planner.',
    bullets: [
      'Implemented React/Tailwind views for schedule search, filtering, and redesign passes.',
      'Partnered with backend-driven constraints while leveling up early in the React ecosystem.',
      'Contributed bug fixes and page polish even when later refactors rerouted some work.',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'DevDogs', '✚'],
    date: 'Aug 2024 – May 2025',
    github: 'https://github.com/DevDogs-UGA/Optimal-Schedule-Builder',
    exploreDossier: {
      overview:
        'Student org product for building and refining class schedules. I focused on frontend behaviors—filters, layout, and visual updates—while the backend continued evolving underneath.',
      features: [
        'Responsive schedule-planning interfaces.',
        'Filtering UX for optimization scenarios.',
        'Visual redesign implementation on priority pages.',
      ],
      implementation: [
        'Built/updated React components with Tailwind styling.',
        'Implemented filter behavior and bug-fix patches.',
        'Coordinated changes with evolving backend expectations.',
      ],
      challenges: [
        'Early React learning stage reduced implementation velocity and confidence.',
        'Some contributions were later refactored by teammates.',
        'Designing around backend functionality while still learning architecture was difficult.',
      ],
      reflection: [
        'Ngl, I was still very early in React and didn’t contribute as much as I wanted.',
        'I did bug-fix and page design work, and some of it got reworked later.',
        'Still a valuable stage that gave me foundational reps for later full-stack work.',
      ],
    },
  },
  {
    id: 'canvas-physics',
    title: 'Canvas 2D Physics Lab',
    role: 'Programmer',
    summary:
      'HTML Canvas sandbox with AABB collisions, motion integration, color lerp feedback, and collision SFX.',
    bullets: [
      'Simulated multiple shapes/polygons with velocity, acceleration, and collision response.',
      'Visualized hits with interpolated color transitions and per-impact sounds.',
      'Iterated on stability vs snappy feedback under dense collision bursts.',
    ],
    techStack: ['JavaScript', 'Canvas 2D', 'Web Audio', '✚'],
    date: '2026',
    exploreDossier: {
      overview:
        'Low-level 2D playground for practicing simulation loops, collision detection, and juicy feedback hooks without an engine.',
      features: [
        'Real-time collisions and motion simulation.',
        'Visual collision feedback.',
        'Audio cue per collision event.',
      ],
      implementation: [
        'Implemented update loop for kinematics and collision state.',
        'Added AABB detection and collision response behavior.',
        'Added lerp-based color transitions and sound triggers.',
      ],
      challenges: [
        'Balancing simulation stability versus responsiveness.',
        'Keeping feedback readable under frequent collision bursts.',
      ],
      reflection: [
        'Fun low-level project to practice simulation fundamentals and feedback design.',
      ],
    },
  },
  {
    id: 'anime-info-translator',
    title: 'Anime Info Translator',
    role: 'Developer',
    summary: 'JavaFX desktop app combining Jikan metadata with Google Translate output.',
    bullets: [
      'Wired MVC-style JavaFX views to dual API flows with sane error handling.',
      'Parsed Jikan payloads into tables/detail panes with translation pass-through.',
      'Solid early exercise in balancing UX with network latency.',
    ],
    techStack: ['JavaFX', 'Jikan API', 'Google Translate API', '✚'],
    date: 'Apr 2024',
    github: 'https://github.com/ttn64681/cs1302-api-app',
    exploreDossier: {
      overview:
        'Desktop utility from early coursework: search anime, inspect metadata, translate text for bilingual skim-reading.',
      features: [
        'Anime lookup and metadata display.',
        'Translation workflow on fetched fields.',
      ],
      implementation: [
        'Wired JavaFX event handlers to API request pipeline.',
        'Parsed API responses and mapped data to UI.',
        'Integrated translation requests and formatted output.',
      ],
      challenges: [
        'Coordinating two external API behaviors.',
        'Handling UI flow around network operations.',
      ],
      reflection: [
        'Great early project for learning practical API integration with GUI development.',
      ],
    },
  },
  {
    id: 'diagonal-sum',
    title: 'Multithreaded Diagonal Sums',
    role: 'Systems Programmer',
    summary:
      'POSIX-threaded matrix diagonal reduction in C with a Bash harness showing ~3.2× speedup at 12.7M elems.',
    bullets: [
      'Partitioned rows across workers with synchronized reduction to avoid races.',
      'Tuned memory behavior and thread counts with repeatable benchmark scripts.',
      'Documented speedups for course-style systems performance reporting.',
    ],
    techStack: ['C', 'pthread', 'Bash', '✚'],
    date: 'Nov – Dec 2024',
    github: 'https://github.com/ttn64681/Multi-Threaded-Diagonal-Sums',
    exploreDossier: {
      overview:
        'Systems programming coursework stressing correct synchronization and measurable parallel speedup on large synthetic matrices.',
      features: [
        'Parallel diagonal aggregation.',
        'Shell-driven benchmark matrix.',
        'Comparative timing output.',
      ],
      implementation: [
        'Partitioned workloads across thread workers.',
        'Implemented synchronization and shared-state reduction.',
        'Added dynamic memory handling and scaling test script support.',
      ],
      challenges: [
        'Avoiding race conditions and synchronization bugs.',
        'Balancing thread overhead against workload sizing.',
      ],
      reflection: [
        'Strong systems exercise in practical concurrency tradeoffs and performance validation.',
      ],
    },
  },
  {
    id: 'auto-e-presser',
    title: 'AutoE-Presser',
    role: 'Script Developer',
    summary:
      'Roblox-side utility shell script: toggleable key loop with audible armed/disarmed cues.',
    bullets: [
      'Packaged a tight automation loop with explicit on/off control and feedback.',
      'First serious out-of-class scripting experiment for personal ergonomics.',
      'Focused on making state obvious so the tool never felt “mysteriously live.”',
    ],
    techStack: ['Bash', 'Automation', '✚'],
    date: '2025',
    github: 'https://github.com/ttn64681/AutoEPress',
    exploreDossier: {
      overview:
        'Tiny quality-of-life script born from repetitive input; prioritizes clear toggles and feedback over opacity.',
      features: [
        'Key-repeat loop with guard rails.',
        'Toggle control surface.',
        'Audible state feedback.',
      ],
      implementation: [
        'Implemented input loop and state toggles.',
        'Added sound cues for mode transitions.',
      ],
      challenges: [
        'Maintaining safe control over automation state.',
        'Ensuring clear feedback for active/inactive behavior.',
      ],
      reflection: [
        'Small script, but fun and practical—good personal scripting reps.',
      ],
    },
  },
];

export function getProjectConfig(slug: string): ProjectConfig | undefined {
  return projectsConfig.find((config) => config.id === slug);
}
