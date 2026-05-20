import { toDocument } from './to-document';

export const hobbiesCareerDocuments = [
  toDocument(
    'hobbies-creative',
    `Thai enjoys creative outlets like drawing and sketching. He plays drums, guitar, and violin, and loves listening to music. \
    These hobbies complement his work in game art and UI/UX design, bringing an artistic sensibility to his technical projects.`,
    { title: 'Creative Hobbies', category: 'hobbies' },
  ),
  toDocument(
    'hobbies-media',
    `Thai watches anime and reads manga/manhwa/webtoons. He grew up on One Piece and still follows it. He's also known to \
    doomscroll on YouTube, Discord, and Instagram.`,
    { title: 'Anime, Manga & Media', category: 'hobbies' },
  ),
  toDocument(
    'hobbies-outdoors',
    `Thai likes to get outside and walk trails, explore canyons, and hike mountains. It's a nice break from the screen and helps \
    clear his head between coding sessions.`,
    { title: 'Outdoors & Hiking', category: 'hobbies' },
  ),
  toDocument(
    'hobbies-sports',
    `Thai plays volleyball for PE and loves to throw some disc (ultimate frisbee). Good for staying active and blowing off steam \
    during busy semesters.`,
    { title: 'Sports & Active', category: 'hobbies' },
  ),
  toDocument(
    'hobbies-dev-play',
    `Thai loves making games and building UI outside of coursework—it's both a hobby and a way to level up his skills. He also \
    enjoys playing games and discovering new music friday in his free time.`,
    { title: 'Game Dev & Side Projects', category: 'hobbies' },
  ),
  toDocument(
    'career-goals',
    `Thai is seeking Software Engineering, Full-Stack, and App Development roles, with strong interest in Infrastructure, \
    Cloud Engineering, and AI Infrastructure. His philosophy is full-cycle engineering: reliable, high-performance backends \
    paired with intuitive, high-fidelity UI/UX. He emphasizes clean architecture, optimization, and maintainability while \
    using art/game skills (Aseprite, Blender, GarageBand, Three.js) for polished user-facing experiences.`,
    { title: 'Career Goals & Philosophy', category: 'career' },
  ),
];
