'use client';

import { useState } from 'react';
import Typewriter from 'typewriter-effect';
import { DIALOGUE_OPTIONS, IDLE_TEXTS } from '@/data/dialogue';

type DialoguePanelProps = {
  onOptionSelected?: () => void;
  /** Called when typewriter finishes; pass runId so parent only stops talking if it's the current run. */
  onTypingComplete?: (runId: string) => void;
  /** Called when typewriter starts; pass runId for this run. */
  onTypingStart?: (runId: string) => void;
  onInterrupt?: () => void;
};

export default function DialoguePanel({
  onOptionSelected,
  onTypingComplete,
  onTypingStart,
  onInterrupt,
}: DialoguePanelProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [idleIndex, setIdleIndex] = useState(0);

  const activeOption = DIALOGUE_OPTIONS.find((opt) => opt.id === activeId) ?? null;

  // Text to show in the main dialogue area.
  const displayText = activeOption ? activeOption.text : IDLE_TEXTS[idleIndex % IDLE_TEXTS.length];

  // Force typewriter to restart when idleIndex or activeId changes.
  const typewriterKey = activeOption ? activeOption.id : `idle-${idleIndex}`;

  return (
    <div className='w-full mt-8 lg:mt-0 dialogue-panel-container'>
      {/* Text + options container with fixed width and controlled height */}
      <div className='dialogue-panel-box w-full lg:ml-2 h-[260px] bg-[#021728] border-1 p-[.25rem] md:p-[.35rem] lg:p-[.5rem] border-[#466C8C] transition-all duration-300 hover:border-[#4dbdff]'>
        <div className='h-full overflow-y-auto px-4 py-2 flex flex-col'>
          {/* Dialogue text area; fixed min-height so the box doesn't jump during typewriter */}
          <div className='font-pixelify text-white-title lg:text-lg text-md leading-snug min-h-auto pb-3 flex-1'>
            <Typewriter
              key={typewriterKey}
              onInit={(typewriter) => {
                const runId = typewriterKey;
                onTypingStart?.(runId);
                typewriter
                  .changeDelay(5)
                  .typeString(displayText)
                  .callFunction(() => onTypingComplete?.(runId))
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
            <div className='mt-0 flex flex-col gap-1.5'>
              {DIALOGUE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type='button'
                  className='dialogue-option-btn hover:cursor-pointer text-left px-3 py-1.5 text-white-title text-sm md:text-base font-pixel-mono border-1 border-[#466C8C] bg-black/40 hover:border-[#4dbdff] hover:text-[#4dbdff] hover:bg-[#032642]/50 transition-all duration-100 active:scale-[0.98]'
                  onClick={() => {
                    onInterrupt?.();
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
              className='dialogue-back-btn hover:cursor-pointer mt-1 self-start px-3 py-1 text-sm md:text-base font-pixel-mono text-[#4dbdff] hover:text-white-title hover:underline transition-all duration-100 active:scale-[0.98]'
              onClick={() => {
                onInterrupt?.();
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
