'use client';

import SpriteTooltip from '../tools/SpriteTooltip';

type OctocatProps = {
  href?: string;
  ariaLabel?: string;
};

export default function Octocat({ href, ariaLabel = 'View GitHub' }: OctocatProps) {
  const className = 'octocat-btn';
  const label = <span className='sr-only'>{ariaLabel}</span>;

  return (
    <SpriteTooltip label='View GitHub'>
      {href ? (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className={className}
          aria-label={ariaLabel}
        >
          {label}
        </a>
      ) : (
        <button type='button' className={className} aria-label={ariaLabel}>
          {label}
        </button>
      )}
    </SpriteTooltip>
  );
}
