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
    text: "I'm Thai Nguyen — a Woodstock, GA native and senior CS student at UGA (graduating May 2026). I'm a versatile software engineer who loves backend complexity and creative UI/UX. I also serve as CSIP Co-Chair for UGA ACM.",
  },
  {
    id: 'education',
    label: '> Education?',
    text: "I'm at the University of Georgia in Athens, finishing my Bachelor's in Computer Science in May 2026. I learn best by shipping projects and iterating fast.",
  },
  {
    id: 'experience',
    label: '> Experience?',
    text: "I've done contract web dev (e.g. Holywatr), led as Scrum Master on ACM Cinema, and was team lead on CourseHub (Best Class Project). I've also shipped game jam titles and built this RAG portfolio. Ask the chatbot below for the full rundown!",
  },
];

export const IDLE_TEXTS: string[] = [
  'Ask me something above, or scroll down to the Portfolio Chatbox for the full lore — and my contact info.',
  'Curious about projects, tech stack, or game jams? Pick a prompt or jump to Chat to ask the AI.',
  'Want details on ACM Cinema, CourseHub, or this site? Head to the chat section below.',
];
