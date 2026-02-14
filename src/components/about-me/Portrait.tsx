'use client';

// Renders the portrait sprite + border box.
// - Chooses the correct sprite sheet based on talking state + glasses.
// - Only handles visual concerns; state is owned by Profile.
type PortraitProps = {
  isTalking: boolean;
  showGlasses: boolean;
  onToggleGlasses: () => void;
};

export default function Portrait({ isTalking, showGlasses, onToggleGlasses }: PortraitProps) {
  // Base layer: always portrait or portrait-talking without glasses.
  const basePortraitClass = isTalking
    ? 'profile-portrait-talking-layer-noglasses'
    : 'profile-portrait-layer-noglasses';
  const glassesOverlayClass = isTalking
    ? 'profile-portrait-glasses-overlay-talking'
    : 'profile-portrait-glasses-overlay-idle';

  const borderBoxClassName =
    'profile-container-btn absolute left-1/2 -translate-x-1/2 top-[95px] w-[340px] h-[260px] p-[8px] cursor-pointer active:scale-[0.97]';

  return (
    <div className='flex justify-center'>
      <div className='profile-unit relative'>
        {/* Profile container button */}
        <button
          type='button'
          className={borderBoxClassName}
          onClick={onToggleGlasses}
          aria-label={showGlasses ? 'Remove glasses' : 'Add glasses'}
        >
          <span className='sr-only'>{showGlasses ? 'Remove glasses' : 'Add glasses'}</span>
          <div className='w-full h-full bg-[#021728]' />
        </button>

        {/* Portrait + Conditional Glasses Overlay */}
        <div className='absolute inset-0 overflow-hidden z-[1] pointer-events-none'>
          <div className='profile-sprite-layer profile-tiles-layer' />
          <div className={`profile-sprite-layer ${basePortraitClass}`} aria-hidden />
          <div
            className={`profile-sprite-layer ${glassesOverlayClass} ${showGlasses ? 'opacity-100' : 'opacity-0'} transition-none`}
          />
        </div>
      </div>
    </div>
  );
}
