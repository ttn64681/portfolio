'use client';

import { useState } from 'react';
import Typewriter from 'typewriter-effect';

// A single selectable dialogue option.
type DialogueOption = {
  id: string;
  label: string;
  text: string;
};

// Pre-written responses for each dialogue option.
const DIALOGUE_OPTIONS: DialogueOption[] = [
  {
    id: 'intro',
    label: '> Who are you?',
    text: "I'm Thai Nguyen, a developer who loves building playful, pixel-perfect web experiences.",
  },
  {
    id: 'education',
    label: '> Education?',
    text: "I studied computer science and have a passion for learning by doing — shipping projects, breaking things, and iterating fast.",
  },
  {
    id: 'experience',
    label: '> Experience?',
    text: 'I’ve worked across the stack: from React frontends to Node/Next.js backends, UI/UX design, and a lot of creative coding experiments.',
  },
];

type DialoguePanelProps = {
  // Called when the user picks a dialogue option (used to trigger talking animation).
  onOptionSelected?: () => void;
};

export default function DialoguePanel({ onOptionSelected }: DialoguePanelProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeOption =
    DIALOGUE_OPTIONS.find((opt) => opt.id === activeId) ?? null;

  // Text to show in the main dialogue area.
  const displayText = activeOption
    ? activeOption.text
    : "Ask me something to learn more — or message me directly thru my Portfolio Chatbot!";

  const typewriterKey = activeOption ? activeOption.id : 'none';

  return (
    <div className="w-[90%] max-w-[720px] min-w-[340px] lg:w-full mt-2 lg:mt-0">
      {/* Text + options container with fixed/controlled height and scroll */}
      <div className="w-full h-auto min-h-[274px] md:min-h-auto sm:h-auto lg:h-[260px] bg-[#021728] border-[8px] border-[#466C8C] overflow-hidden">
        <div className="h-full overflow-y-auto p-4 flex flex-col gap-1">
          {/* Dialogue text area */}
          <div className="font-pixelify text-white-title text-lg leading-snug">
            <Typewriter
              key={typewriterKey}
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(10)
                  .typeString(displayText)
                  .start();
              }}
              options={{
                cursor: '',
                loop: false,
              }}
            />
          </div>

          {/* Options or back button */}
          {!activeOption ? (
            <div className="mt-4 flex flex-col gap-2">
              {DIALOGUE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="hover:cursor-pointer text-left px-3 py-2 rounded-sm text-white-title text-sm md:text-base font-pixel-mono border border-[#466C8C] bg-black/40 hover:border-[#4dbdff] hover:text-[#4dbdff] transition-colors"
                  onClick={() => {
                    setActiveId(option.id);
                    onOptionSelected?.();
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : (
            <button
              type="button"
              className="hover:cursor-pointer mt-4 self-start px-3 py-1 text-sm md:text-base font-pixel-mono text-[#4dbdff] hover:text-white-title hover:underline transition-colors"
              onClick={() => setActiveId(null)}
            >
              {'<- Back'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

