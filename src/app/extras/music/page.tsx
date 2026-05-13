import ExtrasHero from '@/components/extras/ExtrasHero';
import ExtrasMusicClient from '@/components/extras/ExtrasMusicClient';
import { musicRoots } from '@/data/extras/music';

/** Hierarchy navigation + stacked player (`ExtrasMusicClient`). Data: `data/extras/music.ts`. */
export default function ExtrasMusicPage() {
  return (
    <>
      <ExtrasHero
        title='Sound test'
        deck='Choose a playlist, then a track. Add files under public/audio and reference them in data/extras/music.ts, or use embedHtml for streaming embeds.'
        room='music'
      />
      <div className='extras-shell__inner extras-page-shell extras-route extras-route--music'>
        <div className='extras-page-shell__main'>
          <ExtrasMusicClient roots={musicRoots} />
        </div>
      </div>
    </>
  );
}
