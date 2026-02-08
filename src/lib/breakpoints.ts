/**
 * Layout breakpoints (px). Use for inline checks (e.g. window.innerWidth <= BREAKPOINTS.mobile)
 * or in CSS @media (max-width: 768px). Single source of truth for mobile/tablet cutoffs.
 */

export const BREAKPOINTS = {
  /** max-width for mobile (phones) */
  mobile: 768,
  /** max-width for tablet; above this = desktop */
  tablet: 1024,
} as const;

/** Media query string for “mobile or smaller” */
export const MEDIA_MOBILE = `(max-width: ${BREAKPOINTS.mobile}px)`;

/** Media query string for “tablet or smaller” */
export const MEDIA_TABLET = `(max-width: ${BREAKPOINTS.tablet}px)`;
