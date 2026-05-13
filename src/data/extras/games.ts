import type { ExtraGameEntry, GameHubCategory } from '@/types/extras/games';

// /extras/games/<slug>. hubCategory = Clubs | Jams | Misc tab. Array order = that tab's list + extras prev/next ring.
// playUrl / repoUrl optional. gallery[] and youtube[] for media. gifSrc on a contribution uses plain <img> (animated GIF).

/** Category tabs on games hierarchy nav (`clubs` | `jams` | `misc`) — each game picks `hubCategory`. */
export const GAME_HUB_ORDER: GameHubCategory[] = ['clubs', 'jams', 'misc'];

export const GAME_HUB_LABELS: Record<GameHubCategory, string> = {
  clubs: 'Clubs',
  jams: 'Jams',
  misc: 'Misc',
};

export function gamesByHubCategory(category: GameHubCategory): ExtraGameEntry[] {
  return gameEntries.filter((g) => (g.hubCategory ?? 'misc') === category);
}

/** All game dossiers under `/extras/games/[slug]` — order defines hub lists + prev/next ring. */
export const gameEntries: ExtraGameEntry[] = [
  // =============== TOWER ASCENT ===============
  {
    slug: 'tower-ascent',
    title: 'Tower Ascent',
    deck: '2D roguelike RPG — inventory, trading, and pixel art.',
    hubCategory: 'clubs',
    stack: ['Unity-style UI panels', 'Placeholder pixel tile pipeline', 'Jam-ready scope cuts'],
    award: 'Club build — swap when you ship awards.',
    description:
      'A vertical slice of a larger vision: modular UI, turn-based exploration vibes, and handcrafted sprites. This page is a showcase layout — swap in GIFs, repo links, and production art when ready.',
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
  // =============== BUNKER JUMPER ===============
  {
    slug: 'bunker-jumper',
    title: 'Bunker Jumper',
    deck: 'Godot — UI programming scenes only (Jan–May 2025).',
    hubCategory: 'clubs',
    stack: ['Godot', 'UI scenes', 'GDScript'],
    description:
      'Club build focused on UI-driven scenes in Godot. Add itch/build link, GIF captures, and stills when you ship assets.',
    playUrl: undefined,
    repoUrl: undefined,
    gallery: [
      { src: '/pixel/webp/tiles.webp', alt: 'Placeholder still', caption: 'Swap for gameplay still.' },
    ],
    youtube: [],
    contributions: [
      {
        title: 'What you shipped',
        body: 'Describe UI scene architecture and what you owned — replace this block.',
        assetSrc: '/pixel/webp/tiles.webp',
        layout: 'panel',
      },
    ],
    challenges: ['Scope UI-only gameplay vs full physics.'],
    reflection: ['Document scene tree early for handoff.'],
  },
  // =============== SPINDRIVE ===============
  {
    slug: 'spindrive',
    title: 'Spindrive',
    deck: 'Godot ECS game (Jan 2026 – present).',
    hubCategory: 'clubs',
    stack: ['Godot', 'ECS', 'GDScript'],
    description:
      'ECS-driven Godot project — add storefront / demo link, repo, GIFs, and trailer when ready.',
    playUrl: undefined,
    repoUrl: undefined,
    gallery: [
      { src: '/pixel/webp/link-walk.webp', alt: 'Placeholder', caption: 'Replace with in-engine shots.' },
    ],
    youtube: [
      {
        videoId: 'M7lc1UVf-VE',
        title: 'Video demo placeholder — swap YouTube ID',
      },
    ],
    contributions: [
      {
        title: 'ECS + gameplay',
        body: 'Note systems you built (movement, combat, meta) — edit this.',
        layout: 'float-media',
      },
    ],
    challenges: ['ECS iteration speed vs jam deadlines.'],
    reflection: ['Prototype one vertical slice before wide systems.'],
  },
  {
    slug: 'arcade-lab',
    title: 'Arcade Lab (placeholder)',
    deck: 'Demo slot for a second jam or experiment.',
    hubCategory: 'jams',
    stack: ['Prototype-first loops', 'Placeholder art pass'],
    description:
      'Use this entry as a template: duplicate an object in this file, set hubCategory, and fill gallery/youtube.',
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
  return gameEntries.map((g) => g.slug);
}

export function getExtraGameBySlug(slug: string): ExtraGameEntry | undefined {
  return gameEntries.find((g) => g.slug === slug);
}

export function getFirstGameHref(): string {
  const slug = gameEntries[0]?.slug;
  return slug ? `/extras/games/${slug}` : '/explore';
}

export function getGameOrderIndex(slug: string): number {
  const i = gameEntries.findIndex((g) => g.slug === slug);
  return i >= 0 ? i : 0;
}

export function getGameOrderTotal(): number {
  return gameEntries.length;
}
