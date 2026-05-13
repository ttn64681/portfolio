/** Extras /games showcase entries. */

export type GameContributionLayout = 'default' | 'panel' | 'float-media';

export type GameContributionBlock = {
  title?: string;
  body: string;
  /** Static art (WebP, PNG, etc.) — prefer `next/image`. */
  assetSrc?: string;
  /** Animated GIF — rendered with `<img>` to preserve animation. */
  gifSrc?: string;
  caption?: string;
  /** Optional layout modifier --> `.extras-contrib--panel` / `--float-media`. */
  layout?: GameContributionLayout;
};

export type GameHubCategory = 'clubs' | 'jams' | 'misc';

export type ExtraGameGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  mediaKind?: 'image' | 'gif';
};

export type ExtraGameYoutube = {
  videoId: string;
  title: string;
};

export type ExtraGameEntry = {
  slug: string;
  title: string;
  deck: string;
  description: string;
  /** Hub strip grouping (Clubs / Jams / Misc). */
  hubCategory?: GameHubCategory;
  stack?: string[];
  award?: string;
  /** Larger showcase overview — mirrors Explore dossiers (editable here). */
  gallery?: ExtraGameGalleryItem[];
  youtube?: ExtraGameYoutube[];
  contributions: GameContributionBlock[];
  challenges: string[];
  reflection: string[];
  playUrl?: string;
  repoUrl?: string;
};
