// Re-exports for `@/types/extras` — entry shapes for games, gallery, music, animanga. Data arrays live under `src/data/extras/`.

export type { ExtraCategory, ExtraItem } from './config';
export type {
  AnimangaCurrent,
  AnimangaFeedEntry,
  AnimangaFeedKind,
  AnimangaHero,
  AnimangaHeroSlots,
} from './animanga';
export type {
  ExtraGameEntry,
  ExtraGameGalleryItem,
  ExtraGameYoutube,
  GameContributionBlock,
  GameContributionLayout,
  GameHubCategory,
} from './games';
export type {
  GalleryItem,
  GalleryLayoutPreset,
  GallerySubcategory,
  GalleryTab,
  GalleryTabFlat,
  GalleryTabGrouped,
} from './gallery';
export { isGroupedGalleryTab } from './gallery';
export type { MusicPlaylist, MusicRootCategory, MusicRootKind, MusicTrack } from './music';
