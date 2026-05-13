import type { AnimangaFeedEntry, AnimangaHero } from '@/types/extras/animanga';

// /extras/animanga — hero columns (currently watching / favorites / backlog) + feed list at bottom.
// Feed rows are animangaFeed; hero slots are animangaHero. kinds: anime | manga | game for filtering.

export const animangaHero: AnimangaHero = {
  currentlyWatching: [
    {
      title: 'One Piece',
      subtitle: 'Season 2 peak',
      image: '/pixel/webp/pfp-me.webp',
      href: undefined,
      rating: 4,
    },
  ],
  currentlyReading: [
    {
      title: 'Ember Knight',
      subtitle: 'I\'m caught up',
      image: '/pixel/webp/portrait.webp',
      href: undefined,
      rating: 4,
    },
  ],
  currentlyPlaying: [
    {
      title: 'Nothing cuz I have no time',
      subtitle: 'Instagram',
      image: '/pixel/webp/tiles.webp',
      href: undefined,
    },
  ],
  currentFavorite: [
    {
      title: 'JJK S3',
      subtitle: 'Actual Eyegasm',
      image: '/pixel/webp/portrait.webp',
      kind: 'anime',
      rating: 5,
    },
    {
      title: 'Greatest Estate Developer',
      subtitle: 'Funny',
      image: '/pixel/webp/pfp-you.webp',
      kind: 'manga',
      rating: 5,
    },
    {
      title: 'Roblox',
      subtitle: 'Versatile and Free',
      image: '/pixel/webp/tiles.webp',
      kind: 'game',
    },
  ],
  wantingToWatch: [
    {
      title: 'Daemons of the Shadow Realm',
      subtitle: 'Looks good',
      image: '/pixel/webp/octocat-float.webp',
    },
  ],
  wantingToRead: [
    {
      title: 'FOG LAND',
      subtitle: 'Webtoon I keep seeing on insta',
      image: '/pixel/webp/bubble-you.webp',
    },
  ],
  wantingToPlay: [
    {
      title: 'Deltarune',
      subtitle: 'I\'m fr just a larper',
      image: '/pixel/webp/link-walk.webp',
    },
  ],
};

export const animangaFeed: AnimangaFeedEntry[] = [
  {
    kind: 'anime',
    title: 'Re:Zero S4',
    note: 'The way he walks up the stairs is so aura-monster-coded.',
    date: '2026',
    href: undefined,
    rating: 4,
  },
  {
    kind: 'manga',
    title: 'Eternally Regressing Knight',
    note: 'pretty hype.',
    date: '2025-Present',
    rating: 5,
  },
  {
    kind: 'game',
    title: 'Stardew Valley',
    note: 'low cortisol game :-) get to touch grass but not that gross irl grass',
    date: 'May 2026',
    rating: 5,
  },
];
