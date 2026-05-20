import { toDocument } from './to-document';

export const skillDocuments = [
  toDocument(
    'skills-technical',
    `Thai's technical stack includes: Core: Java, JavaScript, TypeScript, Python, GDScript. Full-Stack: Spring Boot 3.5, \
    Next.js, React, Node.js. Data: PostgreSQL, MongoDB, Redis (Upstash), Vector Search. AI: RAG, Gemini API, Vercel AI SDK, \
    Embeddings. Design & Art Tools: Figma (UI/UX), Aseprite (Pixel Art/Animation), VFX.js.`,
    { title: 'Technical Skills', category: 'skill' },
  ),
  toDocument(
    'skills-expanded',
    `Languages: Java, JavaScript, TypeScript, C, C++, Python, GDScript, SQL, Bash. Frameworks: Spring Boot 3.5, Next.js \
    (App Router), React 19, Node.js. Data and AI: PostgreSQL, MongoDB, Redis (Upstash), RAG, Gemini AI, Vercel AI SDK. \
    Creative tools: Aseprite (pixel art and animation), Figma (prototyping), Garageband (music), Photoshop, Blender. \
    Engineering practices: Agile/Scrum, Jira, Docker, REST/GraphQL, Dependency Injection.`,
    { title: 'Technical Skills Expanded', category: 'skill' },
  ),
  toDocument(
    'skills-ml-dl',
    `ML / Deep Learning: PyTorch, Hugging Face, transfer learning and fine-tuning, transformers, CNNs, audio \
    classification pipelines, EDA, preprocessing, PCA/SVD, model evaluation (accuracy, macro-F1, confusion matrices), \
    NumPy, Pandas, Matplotlib, Seaborn.`,
    { title: 'Machine Learning & Deep Learning', category: 'skill' },
  ),
  toDocument(
    'skills-soft',
    `Thai demonstrates strong leadership (Scrum Master, ACM Exec) and bridging the gap between technical and creative teams. \
    He has a passion for meaningful design, strong client collaboration skills, a plan-based approach, and experience managing \
    iterative feedback loops to refine UI/UX.`,
    { title: 'Soft Skills', category: 'skill' },
  ),
];
