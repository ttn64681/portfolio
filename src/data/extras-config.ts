import type { ExtraItem } from '@/types/extras';
import { getFirstGameHref } from '@/data/extras-games';

/** Homepage + hub tiles: id maps to `extras-tile--${id}` CSS and room routes under `/extras/*`. */
export const extrasConfig: ExtraItem[] = [
  { id: 'games', label: 'Games', tagline: 'Projects & jams', href: getFirstGameHref() },
  { id: 'music', label: 'Music', tagline: 'Tracks & sound', href: '/extras/music' },
  { id: 'gallery', label: 'Gallery', tagline: 'Art & photos', href: '/extras/gallery' },
  { id: 'animanga', label: 'Animanga', tagline: 'Watch log', href: '/extras/animanga' },
];
