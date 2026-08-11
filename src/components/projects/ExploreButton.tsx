'use client';

type ExploreButtonProps = {
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
};

export default function ExploreButton({
  onClick,
  href,
  ariaLabel = 'Open project showcase',
}: ExploreButtonProps) {
  const content = (
    <>
      Explore{' '}
      <span aria-hidden className='project-card__explore-btn__arrow'>
        →
      </span>
    </>
  );

  const className = 'project-card__explore-btn';

  if (href) {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button type='button' className={className} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
