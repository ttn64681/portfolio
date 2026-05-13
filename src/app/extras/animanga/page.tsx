import ExtrasAnimangaClient from '@/components/extras/ExtrasAnimangaClient';
import ExtrasHero from '@/components/extras/ExtrasHero';
import { extrasAnimangaFeed, extrasAnimangaHero } from '@/data/extras-animanga';

/** Medium columns + filtered feed (`ExtrasAnimangaClient`). */
export default function ExtrasAnimangaPage() {
  return (
    <>
      <ExtrasHero
        title='Watch log'
        deck="What's in progress up top; recent picks and notes below. Tune copy in extras-animanga.ts."
        room='animanga'
      />
      <div className='extras-platform__inner extras-page-shell extras-route extras-route--animanga'>
        <div className='extras-page-shell__main'>
          <ExtrasAnimangaClient hero={extrasAnimangaHero} feed={extrasAnimangaFeed} />
        </div>
      </div>
    </>
  );
}
