/** Extras /animanga hero + feed. */

export type AnimangaCurrent = {
  title: string;
  subtitle?: string;
  image?: string;
  href?: string;
  /** Use on mixed columns (e.g. favorites) so Anime/Manga/Game filters apply per entry. */
  kind?: AnimangaFeedKind;
  /** 0–5 stars — optional on current / favorites / backlog rows. */
  rating?: number;
};

/** Six hero slots: in-progress row + favorites + backlog wants. */
export type AnimangaHeroSlots = {
  currentlyWatching?: AnimangaCurrent[];
  currentlyReading?: AnimangaCurrent[];
  currentlyPlaying?: AnimangaCurrent[];
  currentFavorite?: AnimangaCurrent[];
  wantingToWatch?: AnimangaCurrent[];
  wantingToRead?: AnimangaCurrent[];
  wantingToPlay?: AnimangaCurrent[];
};

export type AnimangaHero = AnimangaHeroSlots;

export type AnimangaFeedKind = 'anime' | 'manga' | 'game';

export type AnimangaFeedEntry = {
  kind: AnimangaFeedKind;
  title: string;
  note?: string;
  date?: string;
  href?: string;
  /** 0–5 stars */
  rating?: number;
};
