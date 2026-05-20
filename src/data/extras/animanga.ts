import type { AnimangaFeedEntry, AnimangaHero } from '@/types/extras/animanga';
import { requireYoutubeVideoId } from '@/lib/parse-media-url';

// /extras/animanga — hero columns + feed. kinds: anime | manga | game | music (music uses `youtubeVideoId` in thumb slot).

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
      subtitle: "I'm caught up",
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
      rating: 0,
    },
  ],
  currentlyListening: [
    {
      title: 'Eyesight',
      subtitle: 'slayr 🍔🔥',
      youtubeVideoId: requireYoutubeVideoId('https://www.youtube.com/watch?v=xpQ2KyNiVAU'),
      rating: 4,
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
      rating: 5,
    },
    {
      title: 'Holding',
      subtitle: 'slayr 🍔🔥',
      youtubeVideoId: requireYoutubeVideoId('https://www.youtube.com/watch?v=GXq_3CULKDE'),
      kind: 'music',
      rating: 5,
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
      subtitle: "I'm fr just a larper",
      image: '/pixel/webp/link-walk.webp',
    },
  ],
  wantingToListen: [
    {
      title: 'Lowkey this is a bad category',
      subtitle: "If I wanted to listen then I'd just listen lol",
      youtubeVideoId: requireYoutubeVideoId('https://www.youtube.com/watch?v=z_P14N6pO6E'),
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
  {
    kind: 'music',
    title: 'Halfblood (Bloodluxe) - slayr',
    note: 'I got this album on repeat 🥶',
    date: '2026',
    rating: 5,
  },
  {
    kind: 'music',
    title: 'Iceman - Drake',
    note: "Iceman was a nice man now I'm hot and cold 😭💔🙏",
    date: 'May 2026',
    rating: 0,
  },
];
