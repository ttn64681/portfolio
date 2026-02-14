'use client';

import SpriteTooltip from '../tools/SpriteTooltip';

type LinkProps = {
  href?: string;
  ariaLabel?: string;
};

export default function Link({ href, ariaLabel = 'Follow Link' }: LinkProps) {
  const className = 'link-btn';
  const label = <span className='sr-only'>{ariaLabel}</span>;

  return (
    <SpriteTooltip label='Follow Link'>
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
