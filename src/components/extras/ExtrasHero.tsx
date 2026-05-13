'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FloatingRouteNav from '@/components/nav/FloatingRouteNav';
import { getGameOrderIndex, getGameOrderTotal } from '@/data/extras-games';
import { getExtrasNavNeighbors } from '@/lib/extras-nav-ring';

/**
 * `/extras/*` hero — reuses `.explore-hero` styles with `--extras` modifiers.
 * Arrow keys call `getExtrasNavNeighbors(pathname)` so prev/next follows your dossier ring order.
 */

export type ExtrasRoom = 'games' | 'music' | 'gallery' | 'animanga';

export type ExtrasHeroProps = {
  title: string;
  deck: string;
  room: ExtrasRoom;
  detailCrumb?: string;
};

const ROOM_BADGE: Record<ExtrasRoom, string> = {
  games: 'Games',
  music: 'Music',
  gallery: 'Gallery',
  animanga: 'Animanga',
};

const ROOM_BACKDROP: Record<ExtrasRoom, string> = {
  games: '/pixel/webp/tiles.webp',
  music: '/pixel/webp/3 midland.webp',
  gallery: '/pixel/webp/portrait.webp',
  animanga: '/pixel/webp/4 buildings.webp',
};

function IconChevronLeft() {
  return (
    <svg width={18} height={18} viewBox='0 0 24 24' aria-hidden fill='none' stroke='currentColor' strokeWidth={2.25}>
      <path d='M15 6l-6 6 6 6' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg width={18} height={18} viewBox='0 0 24 24' aria-hidden fill='none' stroke='currentColor' strokeWidth={2.25}>
      <path d='M9 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

function isTypingTarget(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
}

export default function ExtrasHero({ title, deck, room, detailCrumb }: ExtrasHeroProps) {
  const backdrop = ROOM_BACKDROP[room];
  const overlayOpacity = 0.52;
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const { prev, next } = getExtrasNavNeighbors(pathname);

  const gameSlugMatch = pathname.match(/^\/extras\/games\/([^/]+)/);
  const gameSlug = gameSlugMatch?.[1];
  const gameIndex = gameSlug ? getGameOrderIndex(gameSlug) + 1 : null;
  const gameTotal = getGameOrderTotal();

  const extrasAccentClass: Record<ExtrasRoom, string> = {
    games: 'explore-hero--extras-games',
    music: 'explore-hero--extras-music',
    gallery: 'explore-hero--extras-gallery',
    animanga: 'explore-hero--extras-animanga',
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (isTypingTarget(e.target)) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        router.push(prev);
      } else {
        e.preventDefault();
        router.push(next);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router, prev, next]);

  return (
    <>
      <FloatingRouteNav mode='extras' />
      <header
        className={`explore-hero explore-hero--extras explore-hero--with-floating-nav ${extrasAccentClass[room]}`}
      >
        <div className='explore-hero__backdrop' aria-hidden>
          <Image
            src={backdrop}
            alt=''
            fill
            priority
            sizes='100vw'
            className='explore-hero__backdrop-img object-cover'
            style={{ objectPosition: 'center' }}
          />
        </div>
        <div className='explore-hero__overlay' style={{ opacity: overlayOpacity }} aria-hidden />
        <div className='explore-hero__accent-wash' aria-hidden />

        <div className='explore-hero__pager'>
          <Link href={prev} className='explore-hero__pager-link' aria-label='Previous section'>
            <IconChevronLeft />
            <span className='explore-hero__pager-txt'>Prev</span>
          </Link>
          <Link href={next} className='explore-hero__pager-link' aria-label='Next section'>
            <IconChevronRight />
            <span className='explore-hero__pager-txt'>Next</span>
          </Link>
        </div>

        <div className='explore-hero__content'>
          <div className='explore-hero__titles'>
            <p className='explore-hero__eyebrow'>Extras</p>
            <h1 className='explore-hero__title'>{title}</h1>
            <p className='explore-hero__deck'>{deck}</p>
            <div className='explore-hero__badges'>
              <span className='explore-hero__badge'>{ROOM_BADGE[room]}</span>
              {gameIndex != null && gameTotal > 0 && (
                <span className='explore-hero__index' aria-label={`Game ${gameIndex} of ${gameTotal}`}>
                  {gameIndex} / {gameTotal}
                </span>
              )}
              {detailCrumb && (
                <span className='explore-hero__index' aria-label={`Section: ${detailCrumb}`}>
                  {detailCrumb}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
