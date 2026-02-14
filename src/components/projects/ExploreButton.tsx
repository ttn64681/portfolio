'use client';

type ExploreButtonProps = {
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
};

export default function ExploreButton({
  onClick,
  href,
  ariaLabel = 'Explore full projects page',
}: ExploreButtonProps) {
  const content = (
    <>
      Explore
      <span aria-hidden>→</span>
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
