'use client';

type SpriteTooltipProps = {
  label: string;
  children: React.ReactNode;
};

export default function SpriteTooltip({ label, children }: SpriteTooltipProps) {
  return (
    <div className='sprite-tooltip-wrap relative inline-block'>
      {children}
      <span className='sprite-tooltip' role='tooltip'>
        {label}
      </span>
    </div>
  );
}
