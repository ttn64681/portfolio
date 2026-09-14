import { toDocument } from './to-document';

/** Professional identity + design philosophy (order: summary → philosophy → executive). */
export const bioDocuments = [
  toDocument(
    'bio-summary',
    `Thai (Tam Minh) Nguyen is a University of Georgia Computer Science alum (B.S., Aug 2026) with a unique blend of \
    backend engineering, AI/ML, and creative design. He specializes in full-stack architecture (Spring Boot, Next.js), \
    RAG systems, and deep learning, while distinguishing himself through meaningful UI/UX, pixel art (Aseprite), \
    graphics work (Three.js, GLSL), and Godot game UI. He bridges engineering and design—often owning Figma flows, \
    handcrafted assets, and polished interaction layers end to end. He also runs a Proxmox/Ubuntu homelab for Docker \
    and GitHub Actions practice.`,
    { title: 'Professional Summary', category: 'bio' },
  ),
  toDocument(
    'philosophy-design',
    `Thai holds a strong passion for good and meaningful design, believing that software functionality must be matched \
    by an intuitive and aesthetic user experience. He often bridges the gap between engineering and design teams. Tools: \
    He is proficient in Figma for high-fidelity prototyping and Aseprite for creating pixel art assets. Impact: He \
    frequently takes ownership of UI revisions and UX implementations in his projects (CourseHub, Cinema E-Booking, \
    game jam menus), ensuring accessibility, responsiveness, and visual consistency.`,
    { title: 'Design Philosophy & UI/UX Passion', category: 'philosophy' },
  ),
  toDocument(
    'bio-executive',
    `Thai Nguyen is a Woodstock, Georgia native and versatile Software Engineer balancing backend complexity with \
    creative UI/UX, digital art, game development, and homelabbing. UGA CS B.S. (Aug 2026; major GPA 3.78). Experience \
    includes freelance web development (Holywatr), UGA ACM Executive Officer & CSIP Chair, and shipped projects spanning \
    Spring Boot APIs, Next.js apps, RAG chatbots with Docker/CI/CD staging, PyTorch audio models, Three.js graphics, \
    and Godot UI.`,
    { title: 'Executive Summary', category: 'bio' },
  ),
];
