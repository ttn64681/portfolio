'use client';

import HierarchyChipRow from '@/components/nav/HierarchyChipRow';
import { getExploreStripItems } from '@/data/explore/registry';

/** Horizontal chip nav under the hero — items follow `EXPLORE_ORDER`. */

export default function ExploreShowcaseStrip({ currentSlug }: { currentSlug: string }) {
  const items = getExploreStripItems();
  const chips = items.map((item) => ({
    id: item.slug,
    label: item.title,
    href: `/explore/${item.slug}`,
    selected: item.slug === currentSlug,
  }));

  return (
    <nav className='hierarchy-nav hierarchy-nav--below-hero explore-showcase-strip' aria-label='All showcases'>
      <HierarchyChipRow items={chips} />
    </nav>
  );
}
