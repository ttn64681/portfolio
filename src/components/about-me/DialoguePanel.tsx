'use client';

import { useState } from 'react';
import Typewriter from 'typewriter-effect';
import { DIALOGUE_OPTIONS, IDLE_TEXTS } from '@/data/dialogue';

type DialoguePanelProps = {
  // Called when the user picks a dialogue option (used to trigger talking animation).
  onOptionSelected?: () => void;
};

export default function DialoguePanel({ onOptionSelected }: DialoguePanelProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [idleIndex, setIdleIndex] = useState(0);

  const activeOption = DIALOGUE_OPTIONS.find((opt) => opt.id === activeId) ?? null;

  // Text to show in the main dialogue area.
  const displayText = activeOption ? activeOption.text : IDLE_TEXTS[idleIndex % IDLE_TEXTS.length];

  // Force typewriter to restart when idleIndex changes.
  const typewriterKey = activeOption ? activeOption.id : `idle-${idleIndex}`;

  return (
    <div className='w-full max-w-[720px] min-w-[340px] mt-1 md:mt-8 lg:mt-0 dialogue-panel-container'>
      {/* Text + options container with fixed width and controlled height */}
      <div className='w-full h-[220px] lg:ml-2 md:h-[260px] bg-[#021728] border-[8px] border-[#466C8C]  transition-all duration-300 hover:border-[#4dbdff]'>
        <div className='h-full overflow-y-auto px-4 py-2 flex flex-col gap-0'>
          {/* Dialogue text area; fixed min-height so the box doesn't jump during typewriter */}
          <div className='font-pixelify text-white-title text-lg leading-snug min-h-[110px] flex-1'>
            <Typewriter
              key={typewriterKey}
              onInit={(typewriter) => {
                typewriter.changeDelay(10).typeString(displayText).start();
              }}
              options={{
                cursor: '',
                loop: false,
              }}
            />
          </div>

          {/* Options or back button */}
          {!activeOption ? (
            <div className='mt-0 flex flex-col gap-1'>
              {DIALOGUE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type='button'
                  className='hover:cursor-pointer text-left px-3 py-1.5 rounded-sm text-white-title text-sm md:text-base font-pixel-mono border border-[#466C8C] bg-black/40 hover:border-[#4dbdff] hover:text-[#4dbdff] hover:bg-[#032642]/50 transition-all duration-200 active:scale-[0.98]'
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
              type='button'
              className='hover:cursor-pointer mt-1 self-start px-3 py-1 text-sm md:text-base font-pixel-mono text-[#4dbdff] hover:text-white-title hover:underline transition-colors active:scale-[0.98]'
              onClick={() => {
                // Return to idle state, cycle to the next idle message, and trigger talking again.
                setActiveId(null);
                setIdleIndex((prev) => prev + 1);
                onOptionSelected?.();
              }}
            >
              {'<- Back'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
