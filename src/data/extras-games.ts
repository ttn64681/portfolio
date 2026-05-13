import type { ExtraGameEntry, GameHubCategory } from '@/types/extras-games';

/** Category tabs on games hierarchy nav (`clubs` | `jams` | `misc`) — each game picks `hubCategory`. */
export const GAME_HUB_ORDER: GameHubCategory[] = ['clubs', 'jams', 'misc'];

export const GAME_HUB_LABELS: Record<GameHubCategory, string> = {
  clubs: 'Clubs',
  jams: 'Jams',
  misc: 'Misc',
};

export function gamesByHubCategory(category: GameHubCategory): ExtraGameEntry[] {
  return extrasGames.filter((g) => (g.hubCategory ?? 'misc') === category);
}

export const extrasGames: ExtraGameEntry[] = [
  {
    slug: 'tower-ascent',
    title: 'Tower Ascent',
    deck: '2D roguelike RPG — inventory, trading, and pixel art.',
    hubCategory: 'clubs',
    stack: ['Unity-style UI panels', 'Placeholder pixel tile pipeline', 'Jam-ready scope cuts'],
    award: 'Club build — swap when you ship awards.',
    description:
      'A vertical slice of a larger vision: modular UI, turn-based exploration vibes, and handcrafted sprites. This page is a showcase layout — swap in GIFs, repo links, and production art when ready.',
    themeVariant: 'rogue',
    playUrl: 'https://opuhlos.itch.io/tower-ascent',
    repoUrl: undefined,
    gallery: [
      { src: '/pixel/webp/tiles.webp', alt: 'Tile sheet placeholder', caption: 'Replace with in-engine captures.' },
      { src: '/pixel/webp/link-walk.webp', alt: 'Sprite sheet', caption: 'Character / UI explorations.' },
    ],
    youtube: [
      {
        videoId: 'M7lc1UVf-VE',
        title: 'Demo placeholder — swap for gameplay capture',
      },
    ],
    contributions: [
      {
        title: 'Inventory & UI architecture',
        body: 'Component-driven panels decoupled from game state so iteration stays fast.',
        assetSrc: '/pixel/webp/tiles.webp',
        caption: 'Placeholder tile sheet — replace with in-game UI capture.',
        layout: 'panel',
      },
      {
        title: 'Animation & feel',
        body: 'Keyframe-driven UI and character motion in-engine (details go here).',
        gifSrc: undefined,
        caption: 'Drop a gameplay GIF path in data when you have one.',
        layout: 'float-media',
      },
    ],
    challenges: [
      'Balancing readability with pixel density on small viewports.',
      'Keeping UI modular as feature scope grew.',
    ],
    reflection: [
      'Would prototype controller feel earlier in the jam cycle.',
      'More automated test scenes for UI regressions.',
    ],
  },
  {
    slug: 'arcade-lab',
    title: 'Arcade Lab (placeholder)',
    deck: 'Demo slot for a second jam or experiment.',
    hubCategory: 'jams',
    stack: ['Prototype-first loops', 'Placeholder art pass'],
    description:
      'Use this entry as a template: duplicate the object in `extras-games.ts`, change `themeVariant`, and ship unique art.',
    themeVariant: 'jam',
    playUrl: undefined,
    repoUrl: 'https://github.com/ttn64681/portfolio',
    contributions: [
      {
        body: 'What you owned: code, art, sound, design — pair each with an asset.',
        assetSrc: '/pixel/webp/bubble-me.webp',
        layout: 'float-media',
      },
    ],
    challenges: ['Timeboxing scope for a weekend build.'],
    reflection: ['Ship small, polish the one interaction that matters.'],
  },
];

export function getExtraGameSlugs(): string[] {
  return extrasGames.map((g) => g.slug);
}

export function getExtraGameBySlug(slug: string): ExtraGameEntry | undefined {
  return extrasGames.find((g) => g.slug === slug);
}

export function getFirstGameHref(): string {
  const slug = extrasGames[0]?.slug;
  return slug ? `/extras/games/${slug}` : '/explore';
}

export function getGameOrderIndex(slug: string): number {
  const i = extrasGames.findIndex((g) => g.slug === slug);
  return i >= 0 ? i : 0;
}

export function getGameOrderTotal(): number {
  return extrasGames.length;
}
