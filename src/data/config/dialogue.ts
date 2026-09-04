/**
 * Dialogue copy for the about-me panel. Types: `src/types/dialogue.ts`.
 */

import type { DialogueOption } from '@/types/dialogue';

export const DIALOGUE_OPTIONS: DialogueOption[] = [
  {
    id: 'intro',
    label: '> Who are you?',
    text: "A Woodstock, GA native and UGA alumni (graduated Aug 2026).\n \
    I'm a Software Developer who likes to pay attention to the fine details (UI/UX, clean code, performance/\
    memory optimizations).",
  },
  {
    id: 'education',
    label: '> Education?',
    text: "I recently finished my B.S. in Computer Science in Aug 2026, with a major GPA of 3.78.\n \
    I've taken data structures + algorithms, software engineering, full-stack dev, AI/ML, data science, \
    computer networks, computer architecture, computer graphics, and systems programming.",
  },
  {
    id: 'experience',
    label: '> Experience?',
    text: "I've done freelance web-dev work, led projects as Scrum Master, built 3D scenes + shaders, \
    trained models for transfer-learning, and helped run/host UGA ACM workshops and events with Google, AWS, , and built this RAG-powered AI \
    portfolio! Ask my twin below for further details...",
  },
];

export const IDLE_TEXTS: string[] = [
  'Ask me something above, or scroll down to talk to the chatbot for more details.',
  'Curious about projects, tech stack, or game jams? Pick a prompt or jump to Chat to talk to my digital twin.',
  "Want details on 'Holywatr', 'JJK Domain Expansion Exhibit', or this site? Head to the chat section below.",
];
