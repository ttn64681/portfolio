import type { ExtraItem } from '@/types/extras';
import { getFirstGameHref } from '@/data/extras/games';

// Homepage Extras strip tiles (href targets). Games tile uses first game in extras/games.ts.

export const navStrip: ExtraItem[] = [
  { id: 'games', label: 'Games', tagline: 'Projects & jams', href: getFirstGameHref() },
  { id: 'music', label: 'Music', tagline: 'Tracks & sound', href: '/extras/music' },
  { id: 'gallery', label: 'Gallery', tagline: 'Art & photos', href: '/extras/gallery' },
  { id: 'animanga', label: 'Animanga', tagline: 'My recent watches', href: '/extras/animanga' },
];
