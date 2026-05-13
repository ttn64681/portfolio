/**
 * Dialogue copy for the about-me panel. Types: `src/types/dialogue.ts`.
 */

import type { DialogueOption } from '@/types/dialogue';

export const DIALOGUE_OPTIONS: DialogueOption[] = [
  {
    id: 'intro',
    label: '> Who are you?',
    text: "A Woodstock, GA native and senior CS student at UGA (graduating Aug 2026). \
    I'm a Software Developer who likes to pay attention to the fine details (UI/UX, clean code, performance/\
    memory optimizations).\
    I've held meetings for UGA's Association of Computing Machinery Club on System Design, Leetcode, and more!",
  },
  {
    id: 'education',
    label: '> Education?',
    text: "I'm at the University of Georgia in Athens, finishing my B.S. in Computer Science in Aug 2026. \
    My cumulative GPA is 3.34, and my major GPA is 3.76. I've taken data structures + algorithms, software \
    engineering, full-stack dev, AI/ML, data science, computer graphics, and systems programming.",
  },
  {
    id: 'experience',
    label: '> Experience?',
    text: "I've done freelance web-dev work (for the band 'Holywatr'), led 'Absolute Cinema Movies' as Scrum Master,\
    and built CourseHub via Agile development, which won Best Class Project. I've also made 3D scenes + shaders for \
    Computer Graphics and trained a Transformer for transfer-learning on Bird Audio Classification for Deep Learning.\
    Not to mention I build games w/ teams every semester, help run UGA ACM workshops, and built this RAG-powered AI \
    portfolio! Ask my twin below for further details...",
  },
];

export const IDLE_TEXTS: string[] = [
  'Ask me something above, or scroll down to talk to my twin for the full lore - and my contact info.',
  'Curious about projects, tech stack, or game jams? Pick a prompt or jump to Chat to ask my AI.',
  "Want details on 'Holywatr', 'JJK Domain Expansion Exhibit', or this site? Head to the chat section below.",
];
