'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import HierarchyChipRow from '@/components/nav/HierarchyChipRow';
import type { HierarchyNavItem } from '@/components/nav/hierarchy-nav-types';

export type { HierarchyNavItem };

function isInternalHref(href: string) {
  return href.startsWith('/');
}

type HierarchyNavProps = {
  parents: (HierarchyNavItem & { hint?: string })[];
  /** Secondary row chips (optional). */
  subitems?: HierarchyNavItem[];
  ariaLabel?: string;
  /** Optional slot after rows */
  footer?: ReactNode;
  /** `underline`: subtle tabs; `segmented`: pill tray (default). */
  parentVariant?: 'segmented' | 'underline';
};

function ParentFace({ label, hint }: { label: string; hint?: string }) {
  return (
    <span className='hierarchy-nav__parent-face'>
      <span className='hierarchy-nav__parent-label'>{label}</span>
      {hint ? <span className='hierarchy-nav__parent-hint'>{hint}</span> : null}
    </span>
  );
}

/** Parent row: segmented control or subtle underline tabs; child row: muted chips. */
export default function HierarchyNav({
  parents,
  subitems,
  ariaLabel,
  footer,
  parentVariant = 'segmented',
}: HierarchyNavProps) {
  const rootClass =
    parentVariant === 'underline'
      ? 'hierarchy-nav hierarchy-nav--underline-parents'
      : 'hierarchy-nav';

  return (
    <div className={rootClass} aria-label={ariaLabel}>
      <div className='hierarchy-nav__parents' role='tablist'>
        {parents.map((p) =>
          p.href ? (
            isInternalHref(p.href) ? (
              <Link
                key={p.id}
                href={p.href}
                role='tab'
                aria-selected={p.selected}
                className={`hierarchy-nav__parent ${p.selected ? 'hierarchy-nav__parent--selected' : ''}`}
              >
                <ParentFace label={p.label} hint={p.hint} />
              </Link>
            ) : (
              <a
                key={p.id}
                href={p.href}
                role='tab'
                aria-selected={p.selected}
                className={`hierarchy-nav__parent ${p.selected ? 'hierarchy-nav__parent--selected' : ''}`}
              >
                <ParentFace label={p.label} hint={p.hint} />
              </a>
            )
          ) : (
            <button
              key={p.id}
              type='button'
              role='tab'
              aria-selected={p.selected}
              className={`hierarchy-nav__parent ${p.selected ? 'hierarchy-nav__parent--selected' : ''}`}
              onClick={p.onSelect}
            >
              <ParentFace label={p.label} hint={p.hint} />
            </button>
          ),
        )}
      </div>
      {subitems && subitems.length > 0 && <HierarchyChipRow items={subitems} />}
      {footer}
    </div>
  );
}
