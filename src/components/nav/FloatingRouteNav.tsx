'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getFirstGameHref } from '@/data/extras-games';

export type FloatingRouteNavMode = 'explore' | 'extras';

function IconHubGrid() {
  return (
    <svg className='floating-route-nav__icon' width={18} height={18} viewBox='0 0 24 24' aria-hidden fill='currentColor'>
      <path d='M4 4h7v7H4V4zm13 0h7v7h-7V4zM4 15h7v7H4v-7zm13 0h7v7h-7v-7z' opacity={0.92} />
    </svg>
  );
}

function IconHome() {
  return (
    <svg
      className='floating-route-nav__icon'
      width={18}
      height={18}
      viewBox='0 0 24 24'
      aria-hidden
      fill='none'
      stroke='currentColor'
      strokeWidth={2.1}
    >
      <path d='M4 10.5 12 4l8 6.5M6 10v9.5h12V10' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

function IconProjects() {
  return (
    <svg className='floating-route-nav__icon' width={18} height={18} viewBox='0 0 24 24' aria-hidden fill='currentColor'>
      <path d='M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2.5L17.5 9H13V4.5zM8 12h8v2H8v-2zm0 4h8v2H8v-2z' opacity={0.92} />
    </svg>
  );
}

function IconExperience() {
  return (
    <svg className='floating-route-nav__icon' width={18} height={18} viewBox='0 0 24 24' aria-hidden fill='currentColor'>
      <path d='M12 3l2.39 7.42h7.74l-6.26 4.55 2.39 7.48L12 17.77 6.74 22.45l2.39-7.48L2.87 10.42h7.74L12 3z' opacity={0.9} />
    </svg>
  );
}

function IconJoystick() {
  return (
    <svg className='floating-route-nav__icon' width={18} height={18} viewBox='0 0 24 24' aria-hidden fill='currentColor'>
      <path d='M8 14a2 2 0 110-4 2 2 0 010 4zm8 2h2v-2h2v-2h-2V10h-2v2h-2v2h2v2zm-10 4h10a4 4 0 004-4v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2a4 4 0 004 4z' />
    </svg>
  );
}

function IconNote() {
  return (
    <svg className='floating-route-nav__icon' width={18} height={18} viewBox='0 0 24 24' aria-hidden fill='currentColor'>
      <path d='M12 4h4v10a3 3 0 11-2 2.82V8h-2V4zm-8 8a2 2 0 114 0 2 2 0 01-4 0z' />
    </svg>
  );
}

function IconFrame() {
  return (
    <svg className='floating-route-nav__icon' width={18} height={18} viewBox='0 0 24 24' aria-hidden fill='currentColor'>
      <path d='M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm2 0v12h12V6H6zm2 2h8v8H8V8z' />
    </svg>
  );
}

function IconClapper() {
  return (
    <svg className='floating-route-nav__icon' width={18} height={18} viewBox='0 0 24 24' aria-hidden fill='currentColor'>
      <path d='M4 10h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10zm2-2l2-2 2 2 4-4 2 2 4-4 2 2v2H6V8z' />
    </svg>
  );
}

type ExtrasRoom = 'games' | 'music' | 'gallery' | 'animanga';

function extrasNavCurrent(pathname: string, room: ExtrasRoom, href: string): boolean {
  if (room === 'games') return pathname.startsWith('/extras/games');
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function FloatingRouteNav({ mode }: { mode: FloatingRouteNavMode }) {
  const pathname = usePathname() ?? '';

  const extrasLinks: { room: ExtrasRoom; href: string; label: string; icon: ReactNode }[] = [
    { room: 'games', href: getFirstGameHref(), label: 'Games', icon: <IconJoystick /> },
    { room: 'music', href: '/extras/music', label: 'Music', icon: <IconNote /> },
    { room: 'gallery', href: '/extras/gallery', label: 'Gallery', icon: <IconFrame /> },
    { room: 'animanga', href: '/extras/animanga', label: 'Animanga', icon: <IconClapper /> },
  ];

  return (
    <nav className='floating-route-nav' aria-label={mode === 'explore' ? 'Explore navigation' : 'Extras navigation'}>
      <div className='floating-route-nav__inner'>
        <div className='floating-route-nav__slot floating-route-nav__slot--left'>
          <Link href='/explore' className='floating-route-nav__pill floating-route-nav__pill--ghost' aria-label='Unified hub'>
            <IconHubGrid />
            <span className='floating-route-nav__txt'>Hub</span>
          </Link>
          <Link href='/' className='floating-route-nav__pill floating-route-nav__pill--ghost' aria-label='Site home'>
            <IconHome />
            <span className='floating-route-nav__txt'>Home</span>
          </Link>
        </div>
        <div className='floating-route-nav__slot floating-route-nav__slot--right'>
          {mode === 'explore' ? (
            <>
              <Link href='/explore?focus=projects' className='floating-route-nav__pill floating-route-nav__pill--ghost' aria-label='Projects'>
                <IconProjects />
                <span className='floating-route-nav__txt'>Projects</span>
              </Link>
              <Link href='/explore?focus=experiences' className='floating-route-nav__pill floating-route-nav__pill--ghost' aria-label='Experiences'>
                <IconExperience />
                <span className='floating-route-nav__txt'>Experiences</span>
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
