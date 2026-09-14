/**
 * Dialogue copy for the about-me panel. Types: `src/types/dialogue.ts`.
 * Rendered as a 2-column option grid in `DialoguePanel` (6 prompts).
 */

import type { DialogueOption } from '@/types/dialogue';

export const DIALOGUE_OPTIONS: DialogueOption[] = [
  {
    id: 'intro',
    label: '> Who are you?',
    text: "A Woodstock, GA native and UGA alum (B.S. in Computer Science, Aug 2026).\n \
I'm a software developer who likes shipping working solutions with attention to detail — UI/UX, clean code, and performance/memory optimizations.",
  },
  {
    id: 'education',
    label: '> Education?',
    text: 'I finished my B.S. in Computer Science at UGA in Aug 2026 (major GPA 3.78).\n \
Coursework spanned DSA, software engineering, full-stack, data science/ML, deep learning, networks, graphics, architecture, and systems programming.',
  },
  {
    id: 'experience',
    label: '> Experience?',
    text: "I've done freelance web work for Holywatr (659K+ monthly listeners), led SWE projects as Scrum Master, built interactive 3D scenes + shaders, \
fine-tuned bird-audio models, shipped multiple games, run a Proxmox/Ubuntu homelab with Docker + GitHub Actions, and co-led UGA ACM workshops with partners like Google, AWS, and Toyota.",
  },
  {
    id: 'working-on',
    label: '> Working on?',
    text: "Right now I'm iterating this RAG portfolio (Dockerized staging on a Proxmox Ubuntu VM + self-hosted Actions CI/CD), continuing bird audio classification research (AST + HuBERT), \
and picking up Godot UI/animation work from recent game jams — plus homelabbing (Linux, networking, containers) !",
  },
  {
    id: 'work',
    label: '> Work?',
    text: "I'm actively looking for Software Engineering, Full-Stack, and Software Developer roles.\n \
I'm especially interested in a team environment where I can be challenged to constantly learn and grow. I'd also love to utilize my background in networking and AI to solve problems.",
  },
  {
    id: 'contact',
    label: '> Contact?',
    text: 'Phone: (404) 309-4421\nEmail: thainguy271@gmail.com\LinkedIn: linkedin.com/in/thai-tm-nguyen\nGitHub: github.com/ttn64681',
  },
];

export const IDLE_TEXTS: string[] = [
  'Ask me something below, or scroll down further to talk to my digital impostor (¬‿¬)',
  'Curious about projects, tech stack, or game jams? Pick a prompt or jump to Chat for more details!!!',
  'Greeting traveller, what brings you to my humble website?',
];
