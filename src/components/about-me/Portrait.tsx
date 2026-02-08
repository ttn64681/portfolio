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

  // Base layer: always portrait or portrait-talking without glasses.
  const basePortraitClass = isTalking
    ? 'profile-portrait-talking-layer-noglasses'
    : 'profile-portrait-layer-noglasses';
  const glassesOverlayClass = isTalking
    ? 'profile-portrait-glasses-overlay-talking'
    : 'profile-portrait-glasses-overlay-idle';
  const portraitClassName = `profile-sprite-layer ${basePortraitClass}`;

  const borderBoxClassName = `absolute left-1/2 -translate-x-1/2 top-[95px] w-[340px] h-[260px] p-[8px] bg-[#466C8C] border-0 transition-all duration-300 ${
    hovered ? 'border-[#4dbdff]' : 'border-[#466C8C]'
  }`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (showGlasses && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onToggleGlasses();
    }
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='profile-unit border-0 relative'>
        {/* Border box */}
        <div className={borderBoxClassName}>
          <div className='w-9vh h-full bg-[#021728] border-0 transition-all duration-300' />
        </div>

        {/* Sprite stack position rules */}
        <div className='absolute inset-0 overflow-hidden z-[1]'>
          <div className='profile-sprite-layer profile-tiles-layer' />
          {/* Base portrait (no glasses); glasses overlay when showGlasses */}
          <button
            type='button'
            className={portraitClassName}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onToggleGlasses}
            style={{ cursor: 'pointer' }}
          />
          {/* Glasses overlay always in DOM so animation stays in sync. */}
          <div
            className={`profile-sprite-layer ${glassesOverlayClass}`}
            role='button'
            tabIndex={showGlasses ? 0 : -1}
            aria-label={showGlasses ? 'Remove glasses' : 'Add glasses'}
            style={{
              opacity: showGlasses ? 1 : 0,
              pointerEvents: showGlasses ? 'auto' : 'none',
              cursor: showGlasses ? 'pointer' : 'default',
            }}
            onClick={showGlasses ? onToggleGlasses : undefined}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
      </div>
    </div>
  );
}
