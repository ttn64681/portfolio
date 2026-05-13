import type { AnimangaFeedEntry, AnimangaHero } from '@/types/extras-animanga';

/** Hero strip cards + chronological feed — consumed by `ExtrasAnimangaClient`; edit structure in types/extras-animanga. */
export const extrasAnimangaHero: AnimangaHero = {
  currentlyWatching: [
    {
      title: 'Current anime — replace',
      subtitle: 'Season / cour',
      image: '/pixel/webp/pfp-me.webp',
      href: undefined,
      rating: 4,
    },
  ],
  currentlyReading: [
    {
      title: 'Current manga — replace',
      subtitle: 'Volume progress',
      image: '/pixel/webp/portrait.webp',
      href: undefined,
      rating: 4,
    },
  ],
  currentlyPlaying: [
    {
      title: 'Tower Ascent',
      subtitle: 'Roguelike WIP',
      image: '/pixel/webp/tiles.webp',
      href: 'https://opuhlos.itch.io/tower-ascent',
    },
  ],
  currentFavorite: [
    {
      title: 'Favorite pick — swap title',
      subtitle: 'Why it hits',
      image: '/pixel/webp/portrait.webp',
      kind: 'anime',
      rating: 5,
    },
    {
      title: 'Favorite manga — swap title',
      subtitle: 'Why it stuck',
      image: '/pixel/webp/pfp-you.webp',
      kind: 'manga',
      rating: 5,
    },
    {
      title: 'Favorite game — swap title',
      subtitle: 'Mechanics / vibe',
      image: '/pixel/webp/tiles.webp',
      kind: 'game',
    },
  ],
  wantingToWatch: [
    {
      title: 'Backlog anime',
      subtitle: 'Queued next season',
      image: '/pixel/webp/octocat-float.webp',
      rating: 3,
    },
  ],
  wantingToRead: [
    {
      title: 'Backlog manga',
      subtitle: 'Volumes stacked',
      image: '/pixel/webp/bubble-you.webp',
      rating: 4,
    },
  ],
  wantingToPlay: [
    {
      title: 'Wishlist game',
      subtitle: 'Platforms / storefront',
      image: '/pixel/webp/link-walk.webp',
    },
  ],
};

export const extrasAnimangaFeed: AnimangaFeedEntry[] = [
  {
    kind: 'anime',
    title: 'Sample watched title',
    note: 'One line reaction or recommendation.',
    date: '2025',
    href: undefined,
    rating: 4,
  },
  {
    kind: 'manga',
    title: 'Sample manga',
    note: 'Why it stuck with you — optional.',
    date: '2025',
    rating: 5,
  },
  {
    kind: 'game',
    title: 'Sample game pick',
    note: 'Short note on what you liked.',
    date: '2025',
    rating: 3,
  },
];
