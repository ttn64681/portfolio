import { toDocument } from './to-document';

export const skillDocuments = [
  toDocument(
    'skills-technical',
    `Thai's technical stack includes: Languages: Python, JavaScript/TypeScript, Java, C/C++, SQL (PostgreSQL), Bash, GDScript. \
    Tools & Technologies: NumPy/PyTorch, HuggingFace, RAG, Vercel AI, Docker, GitHub Actions (CI/CD), Redis, MongoDB, Google Colab, \
    React/Next.js, Node.js, Spring Boot, REST, Linux/Proxmox, Jira, Scrum. Design & Art: Figma, Aseprite, Photoshop, Blender.`,
    { title: 'Technical Skills', category: 'skill' },
  ),
  toDocument(
    'skills-expanded',
    `Languages: Python, JavaScript, TypeScript, Java, C, C++, SQL (PostgreSQL), Bash, GDScript. Frameworks: Spring Boot, \
    Next.js (App Router), React, Node.js. Data and AI: PostgreSQL, MongoDB, Redis (Upstash), RAG, Gemini AI, Vercel AI SDK, \
    NumPy, PyTorch, HuggingFace. Infra & DevOps: Docker, GitHub Actions CI/CD, Linux, Proxmox hypervisors/VMs, Bash scripting. \
    Creative tools: Aseprite, Figma, GarageBand, Photoshop, Blender. Engineering practices: Agile/Scrum, Jira, REST/GraphQL.`,
    { title: 'Technical Skills Expanded', category: 'skill' },
  ),
  toDocument(
    'skills-ml-dl',
    `ML / Deep Learning: PyTorch, Hugging Face, transfer learning and fine-tuning, transformers (AST, HuBERT), CNNs, audio \
    classification pipelines, EDA, preprocessing, PCA/SVD, model evaluation (accuracy, macro-F1, confusion matrices), \
    data augmentation, L2 regularization, learning-rate scheduling, NumPy, Pandas, Matplotlib, Seaborn, Google Colab.`,
    { title: 'Machine Learning & Deep Learning', category: 'skill' },
  ),
  toDocument(
    'skills-homelab',
    `Homelab / systems skills: Proxmox hypervisor management, Ubuntu server administration, Docker multi-stage builds and Compose, \
    self-hosted GitHub Actions runners, Linux networking (DNS, vNICs, NAT), container port bindings, and CI/CD gate design \
    (lint, typecheck, RAG embedding sync before deploy).`,
    { title: 'Homelab, Linux & CI/CD Skills', category: 'skill' },
  ),
  toDocument(
    'skills-soft',
    `Thai demonstrates strong leadership (Scrum Master, ACM Exec/CSIP Chair) and bridging the gap between technical and creative teams. \
    He has a passion for meaningful design, strong client collaboration skills, a plan-based approach, and experience managing \
    iterative feedback loops to refine UI/UX and workshop content.`,
    { title: 'Soft Skills', category: 'skill' },
  ),
];
