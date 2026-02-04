'use client';

import { useState } from 'react';

// Renders the portrait sprite + border box.
// - Chooses the correct sprite sheet based on talking state + glasses.
// - Only handles visual concerns; state is owned by Profile.
type PortraitProps = {
  isTalking: boolean;
  showGlasses: boolean;
  onToggleGlasses: () => void;
};

export default function Portrait({ isTalking, showGlasses, onToggleGlasses }: PortraitProps) {
  const [hovered, setHovered] = useState(false);

  // Decide which sprite class to use:
  // - idle with/without glasses
  // - talking with/without glasses
  const portraitSpriteClass =
    isTalking && showGlasses
      ? 'profile-portrait-talking-layer-glasses'
      : isTalking && !showGlasses
        ? 'profile-portrait-talking-layer-noglasses'
        : showGlasses
          ? 'profile-portrait-layer-glasses'
          : 'profile-portrait-layer-noglasses';

  const portraitClassName = `profile-sprite-layer ${portraitSpriteClass}`;

  const borderBoxClassName = `absolute left-1/2 -translate-x-1/2 top-[95px] w-[340px] h-[260px] p-[8px] group-hover:rounded-[1.5rem] transition-colors duration-300 ${
    hovered ? 'bg-gradient-to-b from-[#4dbdff] to-[#466C8C]' : 'bg-[#466C8C]'
  }`;

  return (
    <div className='w-full flex justify-center'>
      <div className='profile-unit relative'>
        {/* Border box*/}
        <div className={borderBoxClassName}>
          <div className='w-9vh h-full bg-[#021728] group-hover:rounded-[1.5rem] transition-all duration-300' />
        </div>

        {/* Sprite stack position rules */}
        <div className='absolute inset-0 overflow-hidden z-[1]'>
          <div className='profile-sprite-layer profile-tiles-layer' />
          {/* Portrait sprite */}
          <button
            type='button'
            className={portraitClassName}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onToggleGlasses}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}
