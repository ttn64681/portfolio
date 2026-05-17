/** Extras /animanga hero + feed. */

export type AnimangaCurrent = {
  title: string;
  subtitle?: string;
  image?: string;
  /** YouTube watch ID — shown in the thumb box instead of `image` when set. */
  youtubeVideoId?: string;
  href?: string;
  /** Use on mixed columns (e.g. favorites) so Anime/Manga/Game/Music filters apply per entry. */
  kind?: AnimangaFeedKind;
  /** 0–5 stars — optional on current / favorites / backlog rows. */
  rating?: number;
};

/** Hero slots: in-progress + favorites + backlog wants per medium. */
export type AnimangaHeroSlots = {
  currentlyWatching?: AnimangaCurrent[];
  currentlyReading?: AnimangaCurrent[];
  currentlyPlaying?: AnimangaCurrent[];
  currentlyListening?: AnimangaCurrent[];
  currentFavorite?: AnimangaCurrent[];
  wantingToWatch?: AnimangaCurrent[];
  wantingToRead?: AnimangaCurrent[];
  wantingToPlay?: AnimangaCurrent[];
  wantingToListen?: AnimangaCurrent[];
};

export type AnimangaHero = AnimangaHeroSlots;

export type AnimangaFeedKind = 'anime' | 'manga' | 'game' | 'music';

export type AnimangaFeedEntry = {
  kind: AnimangaFeedKind;
  title: string;
  note?: string;
  date?: string;
  href?: string;
  youtubeVideoId?: string;
  /** 0–5 stars */
  rating?: number;
};
