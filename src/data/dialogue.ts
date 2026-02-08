/**
 * Dialogue panel content: options and idle texts.
 * Aligned with thai.txt and portfolio context.
 */

export type DialogueOption = {
  id: string;
  label: string;
  text: string;
};

export const DIALOGUE_OPTIONS: DialogueOption[] = [
  {
    id: 'intro',
    label: '> Who are you?',
    text: "I'm Thai Nguyen — a Woodstock, GA native and senior CS student at UGA (graduating May 2026). I'm a Software Developer who bridges complex backend systems with intentional UI/UX and digital art. I also serve as an Executive Officer and CSIP Co-Chair for UGA ACM.",
  },
  {
    id: 'education',
    label: '> Education?',
    text: "I'm at the University of Georgia in Athens, finishing my B.S. in Computer Science in May 2026. My major GPA is 3.70 (3.27 cumulative), and I've taken courses in data structures, algorithms, software engineering, full-stack dev, AI/ML, graphics, and systems programming.",
  },
  {
    id: 'experience',
    label: '> Experience?',
    text: "I've done freelance full-stack work (for Holywatr), led ACM Cinema as Scrum Master, and built CourseHub, which won Best Class Project. I also build games, help run UGA ACM workshops, and built this RAG-powered AI portfolio. Ask my twin below for the full rundown!",
  },
];

export const IDLE_TEXTS: string[] = [
  'Ask me something above, or scroll down to talk to my twin for the full lore — and my contact info.',
  'Curious about projects, tech stack, or game jams? Pick a prompt or jump to Chat to ask my AI.',
  'Want details on ACM Cinema, CourseHub, or this site? Head to the chat section below.',
];
