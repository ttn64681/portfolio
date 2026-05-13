'use client';

import Link from 'next/link';
import type { NavChip } from '@/types/nav';

function isInternalHref(href: string) {
  return href.startsWith('/');
}

/** Same markup/classes as `HierarchyNav` child row — use for Explore showcase strip & anywhere pills must match Extras. */
export default function HierarchyChipRow({
  items,
  ariaLabel,
  className,
}: {
  items: NavChip[];
  ariaLabel?: string;
  className?: string;
}) {
  const rowClass = ['hierarchy-nav__children', 'hierarchy-nav__children--chip-toolbar', className].filter(Boolean).join(' ');
  return (
    <div className={rowClass} role='tablist' aria-label={ariaLabel}>
      {items.map((c) =>
        c.href ? (
          isInternalHref(c.href) ? (
            <Link
              key={c.id}
              href={c.href}
              role='tab'
              aria-selected={c.selected}
              className={`hierarchy-nav__child ${c.selected ? 'hierarchy-nav__child--selected' : ''}`}
              aria-current={c.selected ? 'page' : undefined}
            >
              {c.label}
            </Link>
          ) : (
            <a
              key={c.id}
              href={c.href}
              role='tab'
              aria-selected={c.selected}
              className={`hierarchy-nav__child ${c.selected ? 'hierarchy-nav__child--selected' : ''}`}
              aria-current={c.selected ? 'page' : undefined}
            >
              {c.label}
            </a>
          )
        ) : (
          <button
            key={c.id}
            type='button'
            role='tab'
            aria-selected={c.selected}
            className={`hierarchy-nav__child ${c.selected ? 'hierarchy-nav__child--selected' : ''}`}
            onClick={c.onSelect}
          >
            {c.label}
          </button>
        ),
      )}
    </div>
  );
}
