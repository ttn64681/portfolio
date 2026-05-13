'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MdCollections,
  MdGraphicEq,
  MdGroups,
  MdHome,
  MdRocketLaunch,
  MdSportsEsports,
  MdTheaters,
  MdWindow,
} from 'react-icons/md';
import { getFirstGameHref } from '@/data/extras/games';

export type FloatingRouteNavMode = 'explore' | 'extras';

const navIconProps = { className: 'floating-route-nav__icon', size: 18 } as const;

type ExtrasRoom = 'games' | 'music' | 'gallery' | 'animanga';

function extrasNavCurrent(pathname: string, room: ExtrasRoom, href: string): boolean {
  if (room === 'games') return pathname.startsWith('/extras/games');
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function FloatingRouteNav({ mode }: { mode: FloatingRouteNavMode }) {
  const pathname = usePathname() ?? '';

  const extrasLinks: { room: ExtrasRoom; href: string; label: string; icon: ReactNode }[] = [
    { room: 'games', href: getFirstGameHref(), label: 'Games', icon: <MdSportsEsports {...navIconProps} /> },
    { room: 'music', href: '/extras/music', label: 'Music', icon: <MdGraphicEq {...navIconProps} /> },
    { room: 'gallery', href: '/extras/gallery', label: 'Gallery', icon: <MdCollections {...navIconProps} /> },
    { room: 'animanga', href: '/extras/animanga', label: 'Animanga', icon: <MdTheaters {...navIconProps} /> },
  ];

  return (
    <nav className='floating-route-nav' aria-label={mode === 'explore' ? 'Explore navigation' : 'Extras navigation'}>
      <div className='floating-route-nav__inner'>
        <div className='floating-route-nav__slot floating-route-nav__slot--left'>
          <Link href='/explore' className='floating-route-nav__pill floating-route-nav__pill--ghost' aria-label='Unified hub'>
            <MdWindow {...navIconProps} />
            <span className='floating-route-nav__txt'>Hub</span>
          </Link>
          <Link href='/' className='floating-route-nav__pill floating-route-nav__pill--ghost' aria-label='Site home'>
            <MdHome {...navIconProps} />
            <span className='floating-route-nav__txt'>Home</span>
          </Link>
        </div>
        <div className='floating-route-nav__slot floating-route-nav__slot--right'>
          {mode === 'explore' ? (
            <>
              <Link href='/explore?focus=projects' className='floating-route-nav__pill floating-route-nav__pill--ghost' aria-label='Projects'>
                <MdRocketLaunch {...navIconProps} />
                <span className='floating-route-nav__txt'>Projects</span>
              </Link>
              <Link href='/explore?focus=experiences' className='floating-route-nav__pill floating-route-nav__pill--ghost' aria-label='Experiences'>
                <MdGroups {...navIconProps} />
                <span className='floating-route-nav__txt'>Experiences</span>
              </Link>
              <Link href='/explore?focus=games' className='floating-route-nav__pill floating-route-nav__pill--ghost' aria-label='Games'>
                <MdSportsEsports {...navIconProps} />
                <span className='floating-route-nav__txt'>Games</span>
              </Link>
            </>
          ) : (
            extrasLinks.map(({ room, href, label, icon }) => {
              const cur = extrasNavCurrent(pathname, room, href);
              return (
                <Link
                  key={room}
                  href={href}
                  className={`floating-route-nav__pill floating-route-nav__pill--ghost ${cur ? 'floating-route-nav__pill--current' : ''}`}
                  aria-current={cur ? 'page' : undefined}
                  aria-label={label}
                >
                  {icon}
                  <span className='floating-route-nav__txt'>{label}</span>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </nav>
  );
}
