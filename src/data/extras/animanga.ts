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
    },
  ],
  currentlyListening: [
    {
      title: 'Placeholder — swap track title',
      subtitle: 'YouTube Music embed slot (dummy)',
      youtubeVideoId: requireYoutubeVideoId('https://www.youtube.com/watch?v=M7lc1UVf-VE'),
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
    },
    {
      title: 'Placeholder favorite mix',
      subtitle: 'Dummy rating + embed — replace me',
      youtubeVideoId: requireYoutubeVideoId('https://www.youtube.com/watch?v=M7lc1UVf-VE'),
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
      title: 'Placeholder — on repeat someday',
      subtitle: 'TODO: real picks',
      youtubeVideoId: requireYoutubeVideoId('https://youtu.be/jNQXAC9IVRw'),
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
    title: 'Placeholder log — album / mix (dummy)',
    note: 'Swap title, note, stars, and `youtubeVideoId` when you curate this list.',
    date: '2026',
    rating: 3,
    youtubeVideoId: requireYoutubeVideoId('https://www.youtube.com/watch?v=M7lc1UVf-VE'),
  },
  {
    kind: 'music',
    title: 'Another dummy listen',
    note: 'Second template row — same container as anime/manga/game feed items.',
    date: 'Jan 2026',
    rating: 4,
    youtubeVideoId: requireYoutubeVideoId('https://youtu.be/jNQXAC9IVRw'),
  },
];
