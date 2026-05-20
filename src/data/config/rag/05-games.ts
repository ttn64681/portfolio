import { toDocument } from './to-document';

/** UGA Game Builders + jams (chronological-ish: recent club games first). */
export const gameDocuments = [
  toDocument(
    'game-spindrive',
    `Spindrive (UGA Game Builders, Spring 2026): animated menu/options/ready flows with controller support, centralized AudioManager \
    (fades, loops, queues), shader-driven UI patterns, parallax menus, ECS-style composition across four checkpoints.`,
    {
      title: 'Spindrive',
      techStack: ['Godot 4', 'GDScript', 'Photoshop'],
      category: 'game',
    },
  ),
  toDocument(
    'game-tower-ascent',
    `Tower Ascent (UGA Game Builders, Fall 2025): modular trading/post-battle inventory, SignalBus + TradeManager with ItemsTransferData DTO, \
    refactored UI into display components fed by UIConfig, keyframe-driven cutscenes, mood-aware portraits. Godot 4 + GDScript + Aseprite. \
    Play: opuhlos.itch.io/tower-ascent`,
    {
      title: 'Tower Ascent',
      techStack: ['Godot 4', 'GDScript', 'Aseprite', 'Signal Bus'],
      category: 'game',
    },
  ),
  toDocument(
    'game-your-toast',
    `Your Toast (UGA Game Builders 2-week jam, Fall 2025): rapid music + SFX delivery under tight deadline.`,
    { title: 'Your Toast (2-week jam)', techStack: ['GarageBand'], category: 'game' },
  ),
  toDocument(
    'game-tram',
    `Tram Game (UGA Game Builders 2-week jam, Fall 2025): SFX package for core interactions and game-feel feedback.`,
    { title: 'Tram Game (2-week jam)', techStack: ['GarageBand', 'SFX'], category: 'game' },
  ),
  toDocument(
    'game-bunker-jumper',
    `Bunker Jumper (Spring 2025): first Godot project — programmed UI animations/transitions and contributed Aseprite assets. \
    Play: saidan-games.itch.io/bunker-jumper`,
    {
      title: 'Bunker Jumper',
      techStack: ['Godot', 'GDScript', 'Aseprite'],
      category: 'game',
    },
  ),
  toDocument(
    'game-dragon-of-the-east',
    `Dragon of the East (Boss Rush Jam 2025): composed two GarageBand tracks for a boss-rush game. Placed 169th / 866. \
    Play: origin-nori.itch.io/dragon-of-the-east`,
    {
      title: 'Dragon of the East (Boss Rush Jam)',
      techStack: ['GarageBand'],
      category: 'game',
    },
  ),
  toDocument(
    'game-job-description',
    `Job Description (Code for a Cause charity jam, Feb–Mar 2025): modeled, UV-unwrapped, textured, and rigged a Unity character in Blender/GIMP; \
    menu and thumbnail art. Placed 41st / 278. Play: kuuoi.itch.io/jobdescription`,
    {
      title: 'Job Description (Code for a Cause Jam)',
      techStack: ['Unity', 'Blender', 'GIMP'],
      category: 'game',
    },
  ),
  toDocument(
    'game-forlorn-soul',
    `A Forlorn Soul (Feb–Mar 2025): pixel art/animation (Aseprite), chiptune/SFX (GarageBand), and level design (Unity). Placed 10th in Georgia.`,
    {
      title: 'A Forlorn Soul',
      techStack: ['Unity', 'Aseprite', 'GarageBand'],
      category: 'game',
    },
  ),
  toDocument(
    'game-laundry-day',
    `Laundry Day (UGA Game Builders, Fall 2024): composed three GarageBand tracks for a RenPy visual novel; main menu theme shipped in final build.`,
    {
      title: 'Laundry Day',
      techStack: ['GarageBand', 'RenPy'],
      category: 'game',
    },
  ),
  toDocument(
    'game-to-see',
    `To See (UGA Game Builders, Spring 2024): first GBC project — two music tracks and SFX for a 3D storytelling game. \
    Play: origin-nori.itch.io/to-see-demo`,
    {
      title: 'To See',
      techStack: ['GarageBand'],
      category: 'game',
    },
  ),
];
