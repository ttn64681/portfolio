import ExtrasHero from '@/components/extras/ExtrasHero';
import ExtrasMusicClient from '@/components/extras/ExtrasMusicClient';
import { extrasMusicRoots } from '@/data/extras-music';

/** Hierarchy navigation + stacked player (`ExtrasMusicClient`). Data: `extras-music.ts`. */
export default function ExtrasMusicPage() {
  return (
    <>
      <ExtrasHero
        title='Sound test'
        deck='Choose a playlist, then a track. Add files under public/audio and reference them in extras-music.ts, or use embedHtml for streaming embeds.'
        room='music'
      />
      <div className='extras-platform__inner extras-page-shell extras-route extras-route--music'>
        <div className='extras-page-shell__main'>
          <ExtrasMusicClient roots={extrasMusicRoots} />
        </div>
      </div>
    </>
  );
}
