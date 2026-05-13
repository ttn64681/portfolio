import ExtrasAnimangaClient from '@/components/extras/ExtrasAnimangaClient';
import ExtrasHero from '@/components/extras/ExtrasHero';
import { animangaFeed, animangaHero } from '@/data/extras/animanga';

/** Medium columns + filtered feed (`ExtrasAnimangaClient`). */
export default function ExtrasAnimangaPage() {
  return (
    <>
      <ExtrasHero
        title='Watch log'
        deck="What's in progress up top; recent picks and notes below. Tune copy in data/extras/animanga.ts."
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
