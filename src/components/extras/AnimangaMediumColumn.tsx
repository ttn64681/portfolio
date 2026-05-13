'use client';

import AnimangaNowColumn from '@/components/extras/AnimangaNowColumn';
import type { AnimangaFeedKind, AnimangaHero } from '@/types/extras/animanga';

/** Favorite picks filtered to the active medium (`kind` on each card). */
function favorites(kind: AnimangaFeedKind, hero: AnimangaHero) {
  return hero.currentFavorite?.filter((x) => x.kind === kind);
}

/** Anime / manga / games column: chooses hero slices + renders three `AnimangaNowColumn` stacks. */
export default function AnimangaMediumColumn({ medium, hero }: { medium: AnimangaFeedKind; hero: AnimangaHero }) {
  const showRating = medium !== 'game';

  const heading =
    medium === 'anime' ? 'Anime' : medium === 'manga' ? 'Manga' : 'Games';

  const currentLabel =
    medium === 'anime' ? 'Currently watching' : medium === 'manga' ? 'Currently reading' : 'Currently playing';
  const currentItems =
    medium === 'anime'
      ? hero.currentlyWatching
      : medium === 'manga'
        ? hero.currentlyReading
        : hero.currentlyPlaying;

  const wantLabel =
    medium === 'anime' ? 'Want to watch' : medium === 'manga' ? 'Want to read' : 'Want to play';
  const wantItems =
    medium === 'anime' ? hero.wantingToWatch : medium === 'manga' ? hero.wantingToRead : hero.wantingToPlay;

  return (
    <section className='extras-animanga-medium' aria-label={heading}>
      <h3 className='extras-animanga-medium__title'>{heading}</h3>
      <div className='extras-animanga-medium__sections'>
        <AnimangaNowColumn label={currentLabel} items={currentItems} showRating={showRating} />
        <AnimangaNowColumn label='Favorite' items={favorites(medium, hero)} showRating={showRating} />
        <AnimangaNowColumn label={wantLabel} items={wantItems} showRating={showRating} />
      </div>
    </section>
  );
}
