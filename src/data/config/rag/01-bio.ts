import { toDocument } from './to-document';

/** Professional identity + design philosophy (order: summary → philosophy → executive). */
export const bioDocuments = [
  toDocument(
    'bio-summary',
    `Thai Nguyen is a senior Computer Science student at the University of Georgia (UGA), graduating May 2026, with a \
    unique blend of backend engineering, AI/ML, and creative design. He specializes in full-stack architecture (Spring Boot, \
    Next.js), RAG systems, and deep learning, while distinguishing himself through meaningful UI/UX, pixel art (Aseprite), \
    and graphics work (Three.js, GLSL). He bridges engineering and design—often owning Figma flows, handcrafted assets, \
    and polished interaction layers end to end.`,
    { title: 'Professional Summary', category: 'bio' },
  ),
  toDocument(
    'philosophy-design',
    `Thai holds a strong passion for good and meaningful design, believing that software functionality must be matched \
    by an intuitive and aesthetic user experience. He often bridges the gap between engineering and design teams. Tools: \
    He is proficient in Figma for high-fidelity prototyping and Aseprite for creating pixel art assets. Impact: He \
    frequently takes ownership of UI revisions and UX implementations in his projects (CourseHub, Cinema E-Booking), \
    ensuring accessibility, responsiveness, and visual consistency.`,
    { title: 'Design Philosophy & UI/UX Passion', category: 'philosophy' },
  ),
  toDocument(
    'bio-executive',
    `Thai Nguyen is a Woodstock, Georgia native and versatile Software Engineer balancing backend complexity with \
    creative UI/UX, digital art, and game development. Senior CS at UGA (May 2026). Experience includes freelance web \
    development (Holywatr), UGA ACM Executive Officer & CSIP Co-Chair, and shipped projects spanning Spring Boot APIs, \
    Next.js apps, RAG chatbots, PyTorch audio models, and Three.js graphics exhibits.`,
    { title: 'Executive Summary', category: 'bio' },
  ),
];
