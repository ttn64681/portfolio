import type { ReactNode } from 'react';

/** Wraps all `/explore/*` routes — sets full-page background/grid chrome (`explore-page`). */
export default function ExploreLayout({ children }: { children: ReactNode }) {
  return <div className='explore-page'>{children}</div>;
}
