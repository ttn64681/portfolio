import type { MusicRootCategory } from '@/types/extras/music';

// /extras/music — roots --> playlists --> tracks. Local file: public/... path on track.src. Embed: track.embedHtml.

export const musicRoots: MusicRootCategory[] = [
  {
    id: 'vgm',
    title: 'VGM',
    playlists: [
      {
        id: 'sandstorm',
        title: 'Sandstorm',
        subtitle: 'Tension, retro tone, motif-based',
        tracks: [
          {
            name: 'Track 1 — add /audio/placeholder.mp3',
            description: 'Lorem ipsum or something.',
            embedHtml: undefined,
          },
          {
            name: 'Track 2 — add /audio/placeholder.mp3',
            description: 'Lorem ipsum or something.',
            embedHtml: undefined,
          },
        ],
      },
      {
        id: 'jam-loop',
        title: 'A Forlorn Soul',
        subtitle: 'First chiptune production, retro tone, boss fights',
        tracks: [
          {
            name: 'Track 1 — add /audio/placeholder.mp3',
            description: 'Lorem ipsum or something.',
            embedHtml: undefined,
          },
        ],
      },
    ],
  },
  {
    id: 'beats',
    title: 'Beats',
    playlists: [
      {
        id: 'placeholder',
        title: 'Placeholder',
        subtitle: 'Placeholder',
        tracks: [
          {
            name: 'Track 1 — add /audio/placeholder.mp3',
            description: 'Lorem ipsum or something.',
            embedHtml: undefined,
          },
        ],
      },
    ],
  },
];
