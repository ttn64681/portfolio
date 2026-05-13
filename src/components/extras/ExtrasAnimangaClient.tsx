'use client';

import { useMemo, useState } from 'react';
import HierarchyNav from '@/components/nav/HierarchyNav';
import AnimangaMediumColumn from '@/components/extras/AnimangaMediumColumn';
import AnimangaFeedSection, {
  type AnimangaMediaFilter,
} from '@/components/extras/AnimangaFeedSection';
import type { AnimangaFeedEntry, AnimangaFeedKind, AnimangaHero } from '@/types/extras/animanga';

/** Filter chips --> stacked medium columns --> chronological feed (feed respects same filter when passed down). */

export default function ExtrasAnimangaClient({
  hero,
  feed,
}: {
  hero: AnimangaHero;
  feed: AnimangaFeedEntry[];
}) {
  const [filter, setFilter] = useState<AnimangaMediaFilter>('all');

  const parents = useMemo(
    () => [
      {
        id: 'all' as const,
        label: 'All',
        selected: filter === 'all',
        onSelect: () => setFilter('all'),
      },
      {
        id: 'anime' as const,
        label: 'Anime',
        selected: filter === 'anime',
        onSelect: () => setFilter('anime'),
      },
      {
        id: 'manga' as const,
        label: 'Manga',
        selected: filter === 'manga',
        onSelect: () => setFilter('manga'),
      },
      {
        id: 'game' as const,
        label: 'Games',
        selected: filter === 'game',
        onSelect: () => setFilter('game'),
      },
    ],
    [filter],
  );

  const mediums: AnimangaFeedKind[] = filter === 'all' ? ['anime', 'manga', 'game'] : [filter];

  return (
    <>
      <HierarchyNav ariaLabel='Animanga categories' parents={parents} parentVariant='underline' />

      <div className='extras-animanga-mediums'>
        {mediums.map((m) => (
          <AnimangaMediumColumn key={m} medium={m} hero={hero} />
        ))}
      </div>

      <AnimangaFeedSection entries={feed} mediaFilter={filter} />
    </>
  );
}
