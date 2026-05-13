'use client';

import type { ReactNode } from 'react';

/** Opens the raw asset (same tab-friendly paths like `/pixel/...`) in a new tab for full-size viewing. */
export default function SourceMediaLink({
  href,
  children,
  className,
  ariaLabel = 'Open image full size',
}: {
  href?: string | null;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const u = href?.trim();
  if (!u) return <>{children}</>;
  return (
    <a
      href={u}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
