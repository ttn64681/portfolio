'use client';

import { useMemo, useState } from 'react';
import HierarchyNav from '@/components/nav/HierarchyNav';
import OutboundSpriteLink from '@/components/projects/OutboundSpriteLink';
import LazyYouTube from '@/components/media/LazyYouTube';
import type { AnimangaFeedEntry, AnimangaFeedKind } from '@/types/extras/animanga';

/** Recent activity list + category chips. Music logs are text-only; embeds live in hero “now” columns. */

type FilterId = 'all' | AnimangaFeedKind;

export type AnimangaMediaFilter = FilterId;

/** Simple five-star row for hero cards + feed entries. */
export function AnimangaStars({ value }: { value: number }) {
  const n = Math.min(5, Math.max(0, Math.round(value)));
  const filled = '★'.repeat(n);
  const empty = '☆'.repeat(5 - n);
  return (
    <span className='extras-animanga-feed__stars' aria-label={`${n} out of 5 stars`}>
      <span className='extras-animanga-feed__stars-filled'>{filled}</span>
      <span className='extras-animanga-feed__stars-empty'>{empty}</span>
    </span>
  );
}

export default function AnimangaFeedSection({
  entries,
  mediaFilter,
}: {
  entries: AnimangaFeedEntry[];
  /** When set, hides this section's category strip (parent renders one filter for the whole page). */
  mediaFilter?: FilterId;
}) {
  const [internalFilter, setInternalFilter] = useState<FilterId>('all');
  const filter = mediaFilter ?? internalFilter;

  const filtered = useMemo(() => {
    if (filter === 'all') return entries;
    return entries.filter((e) => e.kind === filter);
  }, [entries, filter]);

  const parents: { id: FilterId; label: string; selected: boolean; onSelect: () => void }[] = [
    { id: 'all', label: 'All', selected: filter === 'all', onSelect: () => setInternalFilter('all') },
    { id: 'anime', label: 'Anime', selected: filter === 'anime', onSelect: () => setInternalFilter('anime') },
    { id: 'manga', label: 'Manga', selected: filter === 'manga', onSelect: () => setInternalFilter('manga') },
    { id: 'game', label: 'Game', selected: filter === 'game', onSelect: () => setInternalFilter('game') },
    { id: 'music', label: 'Music', selected: filter === 'music', onSelect: () => setInternalFilter('music') },
  ];

  return (
    <section className='extras-animanga-feed' aria-labelledby='animanga-feed-heading'>
      <h2 id='animanga-feed-heading' className='extras-animanga-feed__h'>
        Recent log
      </h2>

      {mediaFilter === undefined && <HierarchyNav ariaLabel='Feed category' parents={parents} />}

      {filtered.map((entry, i) => (
        <article key={`${entry.title}-${i}`} className='extras-animanga-feed__item'>
          <div className='extras-animanga-feed__kind'>{entry.kind}</div>
          <h3 className='extras-animanga-feed__title'>{entry.title}</h3>
          {entry.rating != null && <AnimangaStars value={entry.rating} />}
          {entry.note && <p className='extras-animanga-feed__note'>{entry.note}</p>}
          {entry.youtubeVideoId && entry.kind !== 'music' && (
            <div className='extras-animanga-feed__embed-wrap'>
              <LazyYouTube
                videoId={entry.youtubeVideoId}
                title={entry.title}
                showHeading={false}
                className='extras-animanga-yt-embed extras-animanga-yt-embed--fill'
                skeletonClassName='extras-animanga-yt-embed__skeleton'
              />
            </div>
          )}
          <div className='extras-animanga-feed__meta'>
            {entry.date}
            {entry.href && (
              <span className='extras-animanga-feed__sprite-wrap'>
                {' '}
                ·{' '}
                <OutboundSpriteLink href={entry.href} ariaLabel={`External link: ${entry.title}`} />
              </span>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
