/** Extras /music — nested under VGM / Beats parents. */

export type MusicTrack = {
  name: string;
  /** Shown in the “About this track” panel when this row is selected — editable in extras-music.ts. */
  description?: string;
  /** Path under `public/` (e.g. `/audio/theme.mp3`). Preferred over embed when present. */
  src?: string;
  /** Trusted config-only HTML: single iframe embed. Optional legacy path. */
  embedHtml?: string;
};

/** Playlist row under a parent category (e.g. game jam title or beat name). */
export type MusicPlaylist = {
  id: string;
  title: string;
  subtitle?: string;
  tracks: MusicTrack[];
};

export type MusicRootKind = 'vgm' | 'beats';

export type MusicRootCategory = {
  id: MusicRootKind;
  title: string;
  playlists: MusicPlaylist[];
};
