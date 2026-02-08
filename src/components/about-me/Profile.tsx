'use client';

import { useState, useRef } from 'react';
import { useVisibilityRepaint } from '@/hooks/useVisibilityRepaint';
import Portrait from './Portrait';
import DialoguePanel from './DialoguePanel';

export default function Profile() {
  const [showGlasses, setShowGlasses] = useState(true);
  const [isTalking, setIsTalking] = useState(false);
  const [phraseId, setPhraseId] = useState(0);
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  /** So we only set isTalking false when the typewriter that finished is the current one (avoids Back → quick option cutting animation). */
  const currentRunIdRef = useRef<string | null>(null);

  useVisibilityRepaint(portraitContainerRef);

  const handleInterrupt = () => {
    setPhraseId((p) => p + 1);
    setIsTalking(false);
  };

  const handleTypingStart = (runId: string) => {
    currentRunIdRef.current = runId;
    setIsTalking(true);
  };

  const handleTypingComplete = (completedRunId: string) => {
    if (currentRunIdRef.current === completedRunId) {
      setIsTalking(false);
    }
  };

  return (
    <section
      id='about-me'
      className='profile-section w-full mx-auto min-h-[85vh] flex flex-col items-center justify-center pt-6 pb-10'
    >
      <header className='profile-section__header text-center w-full max-w-[1200px] mb-6'>
        <div className='section-badge-wrap'>
          <h2 className='section-badge section-badge--profile'>YO.</h2>
        </div>
        <p className='profile-section__subtitle font-pixel-mono text-sm text-white-title/80 max-w-xl mt-1'></p>
      </header>
      {/* Portrait and Dialogue Panel */}
      <div className='w-full flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-center gap-4 md:gap-5 xl:gap-4 2xl:gap-5'>
        <div
          ref={portraitContainerRef}
          className='flex justify-center w-full lg:w-auto z-[1] lg:mr-4'
        >
          <Portrait
            key={isTalking ? `talking-${phraseId}` : 'idle'}
            isTalking={isTalking}
            showGlasses={showGlasses}
            onToggleGlasses={() => setShowGlasses((prev) => !prev)}
          />
        </div>
        <div className='flex justify-center lg:w-auto lg:translate-y-[95px]'>
          <DialoguePanel
            onTypingStart={handleTypingStart}
            onTypingComplete={handleTypingComplete}
            onInterrupt={handleInterrupt}
            onOptionSelected={() => {}}
          />
        </div>
      </div>
    </section>
  );
}
