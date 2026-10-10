import type { ExploreGalleryItem } from '@/types/explore/poster-media';
import type { ExploreFigureSection } from '@/types/explore/poster-media';

/**
 * Explore poster media wired from `public/images/explore/<folder>/`.
 * Folder names map roughly to project/experience slugs (see `FOLDER_TO_SLUG`).
 *
 * Naming rules (`public/images/README.txt`):
 * - `hero_*` -> hero backdrop + overview banner + gallery
 * - `.gif` -> prefer for features / implementation / challenges figure strips
 * - remaining stills -> gallery (and fill figure slots when no GIFs)
 */

function exploreSrc(folder: string, file: string): string {
  return `/images/explore/${folder}/${encodeURIComponent(file)}`;
}

function item(folder: string, file: string, alt: string, caption?: string): ExploreGalleryItem {
  const src = exploreSrc(folder, file);
  const isGif = /\.gif$/i.test(file);
  return {
    src,
    alt,
    ...(caption ? { caption } : {}),
    ...(isGif ? { mediaKind: 'gif' as const } : {}),
  };
}

export type ExploreMediaBundle = {
  hero?: string;
  gallery?: ExploreGalleryItem[];
  figures?: Partial<Record<ExploreFigureSection, ExploreGalleryItem[]>>;
};

/** `public/images/explore/<folder>` -> explore slug in projects/experience config. */
const FOLDER_TO_SLUG: Record<string, string> = {
  acm: 'acm',
  'anime-info': 'anime-info-translator',
  'bill-cypher': 'bill-cypher',
  'bird-classifier': 'bird-audio-classification',
  cinema: 'cinema',
  coursehub: 'coursehub',
  devdogs: 'bulldog-planner',
  'diagonal-sum': 'diagonal-sum',
  domain: 'domain-expansion',
  holywatr: 'holywatr',
  portfolio: 'rag-portfolio',
};

const MEDIA_BY_FOLDER: Record<string, ExploreMediaBundle> = {
  cinema: {
    hero: exploreSrc('cinema', 'hero_splash.webp'),
    figures: {
      overview: [item('cinema', 'hero_splash.webp', 'ACM Cinema splash')],
      features: [
        item('cinema', 'seats.webp', 'Seat selection UI'),
        item('cinema', 'search.webp', 'Movie search'),
        item('cinema', 'movie-details.webp', 'Movie details'),
      ],
      implementation: [
        item('cinema', 'facade-meme.webp', 'Facade / payload humor'),
        item('cinema', 'account.webp', 'Account surface'),
        item('cinema', 'login.webp', 'Login flow'),
      ],
      challenges: [
        item('cinema', 'discord-allnighters.webp', 'All-nighter Discord energy'),
        item('cinema', 'secrets-leak.webp', 'Security lesson learned'),
      ],
    },
    gallery: [
      item('cinema', 'hero_splash.webp', 'Splash'),
      item('cinema', 'homepage-sections.webp', 'Homepage sections'),
      item('cinema', 'carousel.webp', 'Promo carousel'),
      item('cinema', 'promos.webp', 'Promotions'),
      item('cinema', 'search.webp', 'Search'),
      item('cinema', 'movie-details.webp', 'Details'),
      item('cinema', 'seats.webp', 'Seats'),
      item('cinema', 'account.webp', 'Account'),
      item('cinema', 'login.webp', 'Login'),
    ],
  },

  portfolio: {
    hero: exploreSrc('portfolio', 'splash.webp'),
    figures: {
      overview: [item('portfolio', 'splash.webp', 'Portfolio splash')],
      features: [item('portfolio', 'portrait.GIF', 'Portrait idle animation')],
      implementation: [item('portfolio', 'truth-nuke.png', 'Truth nuke meme')],
      challenges: [item('portfolio', 'discord-compliment.webp', 'Discord compliment')],
    },
    gallery: [
      item('portfolio', 'splash.webp', 'Splash'),
      item('portfolio', 'portrait.GIF', 'Portrait GIF'),
      item('portfolio', 'discord-compliment.webp', 'Discord compliment'),
      item('portfolio', 'truth-nuke.png', 'Truth nuke'),
    ],
  },

  coursehub: {
    hero: exploreSrc('coursehub', 'hero_home.webp'),
    figures: {
      overview: [item('coursehub', 'hero_home.webp', 'CourseHub home')],
      features: [
        item('coursehub', 'resources.webp', 'Resources view'),
        item('coursehub', 'resources-posts.webp', 'Community posts'),
        item('coursehub', 'youtube.webp', 'YouTube enrichment'),
      ],
      implementation: [
        item('coursehub', 'figma.webp', 'Figma design system'),
        item('coursehub', 'search-example.webp', 'Search example'),
        item('coursehub', 'contribute.webp', 'Contribute flow'),
      ],
      challenges: [
        item('coursehub', 'discord-funny.webp', 'Pre-demo Discord chaos'),
        item('coursehub', 'discord-compliment.webp', 'Team compliment'),
      ],
    },
    gallery: [
      item('coursehub', 'hero_home.webp', 'Home'),
      item('coursehub', 'login.webp', 'Login'),
      item('coursehub', 'register.webp', 'Register'),
      item('coursehub', 'post.webp', 'Post detail'),
      item('coursehub', 'resources.webp', 'Resources'),
      item('coursehub', 'resources-posts.webp', 'Posts'),
      item('coursehub', 'youtube.webp', 'YouTube'),
      item('coursehub', 'figma.webp', 'Figma'),
      item('coursehub', 'search-example.webp', 'Search'),
      item('coursehub', 'contribute.webp', 'Contribute'),
    ],
  },

  domain: {
    hero: exploreSrc('domain', 'malevolent-shrine.webp'),
    figures: {
      overview: [item('domain', 'malevolent-shrine.webp', 'Malevolent Shrine domain')],
      features: [item('domain', 'gojo.gif', 'Gojo domain expansion')],
      implementation: [item('domain', 'sukuna.gif', 'Sukuna domain loop')],
      challenges: [
        item('domain', 'yuta.gif', 'Yuta domain capture'),
        item('domain', 'trust-me-bro.webp', 'Performance trust-me-bro'),
      ],
      reflection: [item('domain', 'wtf.webp', 'Graphics debugging reaction')],
    },
    gallery: [
      item('domain', 'malevolent-shrine.webp', 'Malevolent Shrine'),
      item('domain', 'mutual-authentic-love.webp', 'Mutual authentic love domain'),
      item('domain', 'gojo.gif', 'Gojo GIF'),
      item('domain', 'sukuna.gif', 'Sukuna GIF'),
      item('domain', 'yuta.gif', 'Yuta GIF'),
      item('domain', 'wtf.webp', 'WTF moment'),
      item('domain', 'trust-me-bro.webp', 'Trust me bro'),
    ],
  },

  'bill-cypher': {
    hero: exploreSrc('bill-cypher', 'effects.webp'),
    figures: {
      overview: [item('bill-cypher', 'effects.webp', 'Vaporwave effects on')],
      features: [item('bill-cypher', 'demo.gif', 'Bill Cipher demo loop')],
      implementation: [
        item('bill-cypher', 'icons.webp', 'Icon / glyph accents'),
        item('bill-cypher', 'no-effects.webp', 'Scene without post stack'),
      ],
    },
    gallery: [
      item('bill-cypher', 'effects.webp', 'With effects'),
      item('bill-cypher', 'no-effects.webp', 'Without effects'),
      item('bill-cypher', 'icons.webp', 'Icons'),
      item('bill-cypher', 'demo.gif', 'Demo GIF'),
    ],
  },

  'bird-classifier': {
    hero: exploreSrc('bird-classifier', 'hero_cardinals.webp'),
    figures: {
      overview: [item('bird-classifier', 'hero_cardinals.webp', 'Cardinal species art')],
      features: [
        item('bird-classifier', 'ast-p1.webp', 'AST metrics pass 1'),
        item('bird-classifier', 'ast-p2.webp', 'AST metrics pass 2'),
      ],
      implementation: [
        item('bird-classifier', 'hubert-p1.webp', 'HuBERT metrics'),
        item('bird-classifier', 'labels.webp', 'Class labels'),
      ],
    },
    gallery: [
      item('bird-classifier', 'hero_cardinals.webp', 'Cardinals'),
      item('bird-classifier', 'ast-p1.webp', 'AST p1'),
      item('bird-classifier', 'ast-p2.webp', 'AST p2'),
      item('bird-classifier', 'hubert-p1.webp', 'HuBERT'),
      item('bird-classifier', 'labels.webp', 'Labels'),
    ],
  },

  holywatr: {
    hero: exploreSrc('holywatr', 'hero_youtube-slider.webp'),
    figures: {
      overview: [item('holywatr', 'hero_youtube-slider.webp', 'YouTube mini-player slider')],
      features: [
        item('holywatr', 'music.webp', 'Music / brand page'),
        item('holywatr', 'services.webp', 'Services / merch surface'),
      ],
      implementation: [item('holywatr', 'metadata-google.webp', 'SEO / Open Graph metadata')],
    },
    gallery: [
      item('holywatr', 'hero_youtube-slider.webp', 'YouTube slider'),
      item('holywatr', 'music.webp', 'Music'),
      item('holywatr', 'services.webp', 'Services'),
      item('holywatr', 'metadata-google.webp', 'Metadata'),
    ],
  },

  acm: {
    hero: exploreSrc('acm', 'hero_figma-idea.webp'),
    figures: {
      overview: [item('acm', 'hero_figma-idea.webp', 'Figma branding ideation')],
      features: [
        item('acm', 'workshop.webp', 'Workshop night'),
        item('acm', 'jeopardy.webp', 'Technical Jeopardy'),
        item('acm', 'merch.webp', 'Merch concepts'),
      ],
      implementation: [
        item('acm', 'stickers.webp', 'Sticker sheet'),
        item('acm', 'shokitini.webp', 'Shokitini mascot'),
        item('acm', 'meeting-responses.webp', 'Meeting responses'),
      ],
      challenges: [
        item('acm', 'attendee-critique.webp', 'Attendee critique'),
        item('acm', 'attendee-jeopardy.webp', 'Jeopardy feedback'),
      ],
      reflection: [item('acm', 'attendee-reflection.webp', 'Attendee reflection')],
    },
    gallery: [
      item('acm', 'hero_figma-idea.webp', 'Figma idea'),
      item('acm', 'workshop.webp', 'Workshop'),
      item('acm', 'jeopardy.webp', 'Jeopardy'),
      item('acm', 'merch.webp', 'Merch'),
      item('acm', 'stickers.webp', 'Stickers'),
      item('acm', 'shokitini.webp', 'Shokitini'),
      item('acm', 'meeting-responses.webp', 'Responses'),
      item('acm', 'attendee-critique.webp', 'Critique'),
      item('acm', 'attendee-jeopardy.webp', 'Jeopardy feedback'),
      item('acm', 'attendee-reflection.webp', 'Reflection'),
    ],
  },

  devdogs: {
    hero: exploreSrc('devdogs', 'hero_home.webp'),
    figures: {
      overview: [item('devdogs', 'hero_home.webp', 'Bulldog Planner home')],
      features: [item('devdogs', 'filters.webp', 'Schedule filters')],
      challenges: [item('devdogs', 'issue.webp', 'Tracked issue')],
    },
    gallery: [
      item('devdogs', 'hero_home.webp', 'Home'),
      item('devdogs', 'filters.webp', 'Filters'),
      item('devdogs', 'issue.webp', 'Issue'),
    ],
  },

  'diagonal-sum': {
    hero: exploreSrc('diagonal-sum', 'hero_speedup-result.webp'),
    figures: {
      overview: [item('diagonal-sum', 'hero_speedup-result.webp', 'Multithread speedup result')],
    },
    gallery: [item('diagonal-sum', 'hero_speedup-result.webp', 'Speedup result')],
  },

  'anime-info': {
    hero: exploreSrc('anime-info', 'hero_jikan.webp'),
    figures: {
      overview: [item('anime-info', 'hero_jikan.webp', 'Jikan / translator UI')],
    },
    gallery: [item('anime-info', 'hero_jikan.webp', 'Jikan UI')],
  },
};

function slugMediaMap(): Record<string, ExploreMediaBundle> {
  const out: Record<string, ExploreMediaBundle> = {};
  for (const [folder, bundle] of Object.entries(MEDIA_BY_FOLDER)) {
    const slug = FOLDER_TO_SLUG[folder] ?? folder;
    out[slug] = bundle;
  }
  return out;
}

export const EXPLORE_MEDIA_BY_SLUG: Record<string, ExploreMediaBundle> = slugMediaMap();

export function getExploreMedia(slug: string): ExploreMediaBundle | undefined {
  return EXPLORE_MEDIA_BY_SLUG[slug];
}

export function getExploreHeroBackdrop(slug: string): string | undefined {
  return EXPLORE_MEDIA_BY_SLUG[slug]?.hero;
}
