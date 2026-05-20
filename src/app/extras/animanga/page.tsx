import ExtrasAnimangaClient from '@/components/extras/ExtrasAnimangaClient';
import ExtrasHero from '@/components/extras/ExtrasHero';
import { animangaFeed, animangaHero } from '@/data/extras/animanga';
import { createPageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createPageMetadata({
  title: 'Hobbies log · Extras',
  description: "Anime, manga, games, and music Thai Nguyen is keeping up with.",
  path: '/extras/animanga',
});

/** Medium columns + filtered feed (`ExtrasAnimangaClient`). */
export default function ExtrasAnimangaPage() {
  return (
    <>
      <ExtrasHero
        title='Watch log'
        deck="Anime, manga, games, and music I'm keeping up with :O"
        room='animanga'
      />
      <div className='extras-shell__inner extras-page-shell extras-route extras-route--animanga'>
        <div className='extras-page-shell__main'>
          <ExtrasAnimangaClient hero={animangaHero} feed={animangaFeed} />
        </div>
      </div>
    </>
  );
}
