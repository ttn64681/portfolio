import type { ExtraGameEntry, GameHubCategory } from '@/types/extras/games';
import { requireYoutubeVideoId } from '@/lib/parse-media-url';

/** Category tabs on games hierarchy nav — each game sets `hubCategory`. */
export const GAME_HUB_ORDER: GameHubCategory[] = ['clubs', 'jams'];

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
  {
    slug: 'spindrive',
    title: 'Spindrive',
    deck: 'UGA Game Builders — Godot 4 multiplayer setup, menus, audio, VFX UI (Spring 2026).',
    hubCategory: 'clubs',
    stack: ['Godot 4', 'GDScript', 'Photoshop', '✚'],
    description:
      'Checkpoint-driven Godot project where I owned animated menus, options hubs, ready-flow orchestration, centralized audio, and shader-styled UI accents while the team shipped multiplayer racing fantasy.',
    playUrl: undefined,
    repoUrl: undefined,
    youtube: [{ title: 'Spindrive showcase', videoId: requireYoutubeVideoId('https://youtu.be/er1VcgwKxXw') }],
    contributions: [
      {
        title: 'Menus, options & intro flow',
        body: 'Built animated main menu, options with brightness/audio readouts, parallax/hover motion, and intro/title sequencing with controller + keyboard paths.',
        layout: 'panel',
      },
      {
        title: 'Audio + ready system',
        body: 'Central AudioManager handled fades, loops, queues, pause/resume, and SFX routing; ready menu covered character select, stat edits, per-player controller presets, and lock-in sequencing.',
        layout: 'panel',
      },
    ],
    challenges: [
      'Animated UI in Godot was much more manual/state-heavy than expected.',
      'Maintaining ECS-style decoupling while shipping quickly caused architectural uncertainty.',
      'Team conventions around event/signal patterns differed from prior projects.',
      'Needed to juggle polish goals and clean architecture under checkpoint constraints.',
    ],
    reflection: [
      'My final semester in GBC hit hard emotionally, so I wanted to go all-out.',
      'Godot animated UI was honestly one of the hardest things I’ve done there.',
      'I overthought whether my architecture was “theoretically correct” way too often, but that stress still helped me improve.',
      'Really proud of what shipped and how much I leveled up.',
    ],
  },
  {
    slug: 'tower-ascent',
    title: 'Tower Ascent',
    deck: 'UGA Game Builders — modular trading UI, signal bus, and cinematic intro (Fall 2025).',
    hubCategory: 'clubs',
    stack: ['Godot 4', 'GDScript', 'Aseprite', '✚'],
    description:
      'Roguelike-adjacent hero RPG polish: trade flows, modular UI panels, and intro/cutscene choreography built on a SignalBus + DTO backbone.',
    playUrl: 'https://opuhlos.itch.io/tower-ascent',
    repoUrl: undefined,
    youtube: [{ title: 'Tower Ascent trailer / capture', videoId: requireYoutubeVideoId('https://youtu.be/DodlQDijPa4') }],
    contributions: [
      {
        title: 'Trading & modular UI',
        body: 'SignalBus + TradeManager with ItemsTransferData payloads for drag/drop-like semantics; split monolithic UI into display components fed by shared UIConfig.',
        layout: 'panel',
      },
      {
        title: 'Cutscenes & mood',
        body: 'Keyframe/tween flows for dialogue, intro animatic beats, and portrait variants tied to party state.',
        layout: 'panel',
      },
    ],
    challenges: [
      'Signal Bus architecture had a steep learning curve.',
      '“React-style” component abstraction became constructor-heavy and hard to maintain.',
      'Over-engineering tendencies increased wiring complexity.',
      'Architectural elegance sometimes fought practical delivery speed.',
    ],
    reflection: [
      'My second real game programming experience, and a big growth jump.',
      'I like the intro animatic/cutscene a lot. Peep the impact frame 🥶',
      'I struggled with signal architecture a lot, and some abstractions got over-engineered, but those mistakes taught me a ton.',
      'Definitely one of the projects that shaped how I think about maintainability in game UI systems.',
    ],
  },
  {
    slug: 'bunker-jumper',
    title: 'Bunker Jumper',
    deck: 'Spring 2025 Godot jam — UI programmer & Aseprite support.',
    hubCategory: 'clubs',
    stack: ['Godot', 'GDScript', 'Aseprite', '✚'],
    description:
      'First Godot shipping experience focused on HUD/menu animation plus early sprite experiments in a fast collaborative room.',
    playUrl: 'https://saidan-games.itch.io/bunker-jumper',
    repoUrl: undefined,
    contributions: [
      {
        title: 'Interface animation',
        body: 'Authored UI nodes, timing scripts, and tweened transitions that sell gameplay feedback.',
        layout: 'panel',
      },
      {
        title: 'Art experiments',
        body: 'Supporting Aseprite passes including enemy animation explorations—not all landed in the final cut.',
        layout: 'panel',
      },
    ],
    challenges: [
      'First-time Godot usage plus first-time animation scripting created a steep ramp.',
      'Simultaneous growth in both coding and animation skills.',
      'Some created assets were not integrated in final release.',
    ],
    reflection: [
      'Shoutout to that cracked team.',
      'This was my first Godot run, and I was definitely still leveling up.',
      'I did some cool stuff for where I was at, but this project really motivated me to go harder in Tower Ascent and Spindrive.',
    ],
  },
  {
    slug: 'to-see',
    title: 'To See',
    deck: 'First Game Builders Club build — music & SFX for a 3D story game (Spring 2024).',
    hubCategory: 'clubs',
    stack: ['GarageBand', 'SFX', '✚'],
    description:
      'Introductory club project where I provided two tracks and environmental SFX while learning team production rhythms.',
    playUrl: 'https://origin-nori.itch.io/to-see-demo',
    contributions: [
      {
        title: 'Score + sound',
        body: 'Delivered paired music cues plus SFX beds to reinforce story pacing and spatial tone.',
        layout: 'panel',
      },
    ],
    challenges: [
      'First-time team production discipline was inconsistent.',
      'Output volume was lower than intended.',
    ],
    reflection: [
      'First ever GBC experience: very fun, but I also know I could have done more.',
      'I straight up just used a track I had made before and changed it up a bit (You may see this trend once more).',
      'Not perfect, but important starting point.',
    ],
  },
  {
    slug: 'laundry-day',
    title: 'Laundry Day',
    deck: 'RenPy visual novel — three GarageBand cues with menu theme shipping (Fall 2024).',
    hubCategory: 'clubs',
    stack: ['GarageBand', 'RenPy', '✚'],
    description:
      'Composed menu, credits, and background-adjacent ideas for a narrative collaboration; only the main menu cue stayed in the final timeline.',
    playUrl: 'https://glass-rain.itch.io/laundry-day',
    contributions: [
      {
        title: 'Music integration',
        body: 'Exported GarageBand stems and coordinated with narrative beats so diegetic tone matched writing.',
        layout: 'panel',
      },
    ],
    challenges: [
      'Did not contribute programming due to confidence level at the time.',
      'Not all completed tracks were shipped (😢).',
    ],
    reflection: [
      'Second GBC game for me.',
      'I wasn’t confident enough to program yet, so I focused on music.',
      'One track shipped, others got cut—bittersweet, but still a good learning step.',
    ],
  },
  {
    slug: 'your-toast',
    title: 'Your Toast',
    deck: 'UGA Game Builders two-week jam — music & SFX sprint (Fall 2025).',
    hubCategory: 'clubs',
    stack: ['GarageBand', 'SFX', '✚'],
    description:
      'Rapid-turn audio package mirroring jam scope locks—prioritized clarity and iteration speed over polish fantasies.',
    playUrl: undefined,
    contributions: [
      {
        title: 'Jam audio',
        body: 'Drafted and finalized music/SFX that matched the comedic toast-themed hook with tight turnaround.',
        layout: 'panel',
      },
    ],
    challenges: [
      'Very limited timeline constrained polish opportunities.',
      'Required strict prioritization of utility over perfection.',
    ],
    reflection: [
      'Pure sprint-mode contribution.',
      'Good reminder that shipping on time is a skill too.',
      "Actually now that I remembered none of my sound effects got shipped since we didn't know how to put sfx in Unity 😭",
    ],
  },
  {
    slug: 'tram-game',
    title: 'Tram Game',
    deck: 'UGA Game Builders two-week jam — SFX-only contribution (Fall 2025).',
    hubCategory: 'clubs',
    stack: ['SFX', '✚'],
    description:
      'Focused SFX pass to improve moment-to-moment feedback density while the core team raced on scope.',
    playUrl: undefined,
    contributions: [
      {
        title: 'Interaction audio',
        body: 'Authored bite-sized SFX for train movement and animal-crossing style voice dialogue for 3 characters.',
        layout: 'panel',
      },
    ],
    challenges: ['Minimal production time.', 'Limited room for deeper refinement.'],
    reflection: [
      'Smaller contribution, but still useful.',
      "Making the gibberish talking was pretty fun low-key. I used some site online but I can't remember which one.",
    ],
  },
  {
    slug: 'a-forlorn-soul',
    title: 'A Forlorn Soul',
    deck: 'Jam entry — art, audio, and level support (Feb–Mar 2025). Placed 10th in Georgia.',
    hubCategory: 'jams',
    award: '10th in Georgia (GMTK-adjacent cycle)',
    stack: ['Unity', 'Aseprite', 'GarageBand', '✚'],
    description:
      'First major jam: pixel work, hybrid chiptune/orchestral cues, SFX, and Unity level assists for a moody boss-rush-adjacent concept.',
    playUrl: 'https://danghet.github.io/AForlornSoul-V.1.0/',
    contributions: [
      {
        title: 'Art + audio + design assist',
        body: 'Sprites/animation in Aseprite, soundtrack/SFX in GarageBand, plus level flow tuning inside Unity scenes.',
        layout: 'panel',
      },
    ],
    challenges: [
      'First game jam, first pixel art, and first substantial game-audio push all at once.',
      'Beginner quality limitations were visible in some outputs.',
      'Balancing multiple disciplines under time pressure was... difficult.',
    ],
    reflection: [
      'My first ever game jam.',
      'My first pixel art too... and yeah, it definitely showed.',
      'Also my first chiptune music attempt; one of those tracks is still one of my favorites to this day.',
      'For the last 2 weeks, my life was literally wake up, work on music/pixel-art, eat, sleep, and repeat. Mind you I was still in highschool.',
      'Still it was super formative for both my creative and technical direction.',
    ],
  },
  {
    slug: 'job-description',
    title: 'Job Description',
    deck: 'Code for a Cause Charity Jam — Blender character, menus, thumbnails (Feb–Mar 2025). 41st / 278.',
    hubCategory: 'jams',
    award: '41st / 278 teams',
    stack: ['Unity', 'Blender', 'GIMP', '✚'],
    description:
      'Modeling, UVs, hand-painted textures, rigging, and promo/menu art for a charity-weekend title—most of the grind landed in the final push.',
    playUrl: 'https://kuuoi.itch.io/jobdescription',
    youtube: [{ title: 'Job Description trailer', videoId: requireYoutubeVideoId('https://youtu.be/ccdSNrpOq_0') }],
    contributions: [
      {
        title: 'Character + promo art',
        body: 'Built the hero asset pipeline in Blender, painted textures in GIMP, validated rigs in Unity, and produced thumbnail/menu frames for discoverability.',
        layout: 'panel',
      },
    ],
    challenges: [
      'First-time Blender experience was very rough.',
      'UV workflow and rigging were major bottlenecks.',
      'Most progress happened in final week, increasing schedule risk and stress.',
    ],
    reflection: [
      'Most progress happened in one brutal final-week grind at my friend Aiden’s (@kuuoi) place.',
      'Learning Blender for the first time in one week was grueling, and I was definitely inefficient in multiple steps.',
      'Still, I learned real 3D pipeline basics the hard way.',
      'Grueling but memorable; sadly I forgot everything I learned in Blender afterwards.',
      'It was worth it though, we got to see a lot of streamers and YouTubers react to the game lol.',
      'Shoutout Aiden, he did all the heavy-lifting.',
    ],
  },
  {
    slug: 'dragon-of-the-east',
    title: 'Dragon of the East',
    deck: 'Boss Rush Jam 2025 — music composer. Placed 169th / 866.',
    hubCategory: 'jams',
    award: '169th / 866 overall',
    stack: ['GarageBand', '✚'],
    description:
      'Two adaptive battle cues composed under jam tempo to help players read phase intensity.',
    playUrl: 'https://origin-nori.itch.io/dragon-of-the-east',
    contributions: [
      {
        title: 'Score',
        body: 'Two original GarageBand productions handed off for in-engine integration and mixing notes.',
        layout: 'panel',
      },
    ],
    challenges: [
      'Limited timeline constrained refinement depth.',
      'Music production speed was a bottleneck.',
    ],
    reflection: [
      'Two tracks for a cool game. We placed 169th out of 866 teams which aint too shabby.',
      'I’m slow at music production and this wasn’t my best work, but also not my worst.',
      "I reused an old track I made and just changed it up a bit (sound familiar? (nah but fr this only happens once more and that's it)).",
      'Shoutout my boy @nori-nori.',
    ],
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
