// Gallery tiles, inline figure strips, and YouTube rows on `/explore/[slug]`.

export type ExploreFigureSection =
  | 'overview'
  | 'features'
  | 'implementation'
  | 'challenges'
  | 'reflection';

export type ExploreGalleryItem = {
  alt: string;
  caption?: string;
  /** Path under `public/`, e.g. `/pixel/webp/foo.webp` */
  src?: string;
  /** Use `"gif"` so the poster keeps animation (still images can omit this). */
  mediaKind?: 'image' | 'gif';
};

export type ExploreYoutubeItem = {
  title?: string;
  videoId?: string;
};
