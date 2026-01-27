'use client';

import { useState, useEffect } from 'react';
import Portrait from './Portrait';
import DialoguePanel from './DialoguePanel';

// Top-level About Me profile section.
// - Owns "glasses on/off" and "talking" state.
// - Coordinates Portrait (left) and DialoguePanel (right / stacked on small screens).
export default function Profile() {
  const [showGlasses, setShowGlasses] = useState(true);
  const [isTalking, setIsTalking] = useState(false);

  //
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTalking(true);
    }, 1);

    return () => clearTimeout(timeout);
  }, []); // Run once on mount

  // When talking starts, keep the talking sprite active for one full cycle,
  // then flip back to the idle sprite automatically.
  useEffect(() => {
    if (!isTalking) return;

    const timeout = setTimeout(() => {
      setIsTalking(false);
    }, 4800); // 48 frames at ~10fps

    return () => clearTimeout(timeout);
  }, [isTalking]);

  return (
    <section className="w-[80%] mx-auto min-h-screen flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-center gap-8 md:gap-10 lg:gap-7 xl:gap-10 2xl:gap-12">
      {/* Portrait: fixed sprite size, centered, with clickable glasses toggle */}
      <div className="flex justify-center w-full lg:w-auto z-[1]">
        <Portrait
          isTalking={isTalking}
          showGlasses={showGlasses}
          onToggleGlasses={() => setShowGlasses((prev) => !prev)}
        />
      </div>

      {/* Dialogue panel: typewriter text + options, triggers talking on selection */}
      <div className="flex justify-center lg:w-auto lg:translate-y-[95px] z-[0]">
        <DialoguePanel
          onOptionSelected={() => {
            setIsTalking(true);
          }}
        />
      </div>
    </section>
  );
}