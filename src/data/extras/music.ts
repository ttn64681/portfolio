import type { MusicRootCategory } from '@/types/extras/music';

// /extras/music — roots --> playlists --> tracks. Local file: public/... path on track.src. Embed: track.embedHtml.

export const musicRoots: MusicRootCategory[] = [
  {
    id: 'vgm',
    title: 'VGM',
    playlists: [
      {
        id: 'tower-ascent',
        title: 'Tower Ascent',
        subtitle: 'Tension, loops, retro tone',
        tracks: [
          {
            name: 'Theme — add /audio/theme.mp3',
            description:
              'Lead motif and loop structure for exploration beats — swap copy when you ship real stems.',
            embedHtml: undefined,
          },
          {
            name: 'Combat layer — add file',
            description:
              'Percussion-forward layer meant to sit under the main theme without muddying the melody.',
            embedHtml: undefined,
          },
        ],
      },
      {
        id: 'jam-loop',
        title: 'Jam weekend sketch',
        subtitle: 'Short loop placeholders',
        tracks: [
          {
            name: 'Jam sketch 01 — add file or embed',
            description: 'Weekend loop sketch — document BPM, key, and references here.',
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
        id: 'lofi-draft',
        title: 'Lo-fi draft lane',
        subtitle: 'Draft renders',
        tracks: [
          {
            name: 'Beat sketch — add /audio/*.mp3',
            description:
              'Draft harmonic bed — describe vibe and arrangement intent for Future You.',
            embedHtml: undefined,
          },
        ],
      },
    ],
  },
];
