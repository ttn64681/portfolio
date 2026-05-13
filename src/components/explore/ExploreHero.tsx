'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FloatingRouteNav from '@/components/nav/FloatingRouteNav';
import type { ExploreAccent, ExploreKind } from '@/types/explore';

/**
 * `/explore/[slug]` hero: backdrop + overlay + accent wash, pager, floating nav.
 * Keyboard ←/--> jump to prev/next slug unless focus is in a text field.
 */

export type ExploreHeroProps = {
  title: string;
  kind: ExploreKind;
  prevSlug: string;
  nextSlug: string;
  index: number;
  total: number;
  heroBackdrop?: string;
  heroBackdropPosition?: string;
  heroOverlayOpacity?: number;
  accent?: ExploreAccent;
  role?: string;
  date?: string;
};

function IconChevronLeft() {
  return (
    <svg
      width={18}
      height={18}
      viewBox='0 0 24 24'
      aria-hidden
      fill='none'
      stroke='currentColor'
      strokeWidth={2.25}
    >
      <path d='M15 6l-6 6 6 6' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg
      width={18}
      height={18}
      viewBox='0 0 24 24'
      aria-hidden
      fill='none'
      stroke='currentColor'
      strokeWidth={2.25}
    >
      <path d='M9 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

function isTypingTarget(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
}

export default function ExploreHero({
  title,
  kind,
  prevSlug,
  nextSlug,
  index,
  total,
  heroBackdrop,
  heroBackdropPosition = 'center',
  heroOverlayOpacity = 0.55,
  accent = 'aurora',
  role,
  date,
}: ExploreHeroProps) {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (isTypingTarget(e.target)) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        router.push(`/explore/${prevSlug}`);
      } else {
        e.preventDefault();
        router.push(`/explore/${nextSlug}`);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router, prevSlug, nextSlug]);

  const accentClass = `explore-hero--accent-${accent}`;
  const overlayStyle = {
    opacity: heroOverlayOpacity,
  } as const;

  return (
    <>
      <FloatingRouteNav mode='explore' />
      <header className={`explore-hero explore-hero--with-floating-nav ${accentClass}`}>
        {heroBackdrop && (
          <div className='explore-hero__backdrop' aria-hidden>
            <Image
              src={heroBackdrop}
              alt=''
              fill
              priority
              sizes='100vw'
              className='explore-hero__backdrop-img object-cover'
              style={{ objectPosition: heroBackdropPosition }}
            />
          </div>
        )}
        <div className='explore-hero__overlay' style={overlayStyle} aria-hidden />
        <div className='explore-hero__accent-wash' aria-hidden />

        <div className='explore-hero__pager'>
          <Link
            href={`/explore/${prevSlug}`}
            className='explore-hero__pager-link'
            aria-label='Previous showcase'
          >
            <IconChevronLeft />
            <span className='explore-hero__pager-txt'>Prev</span>
          </Link>
          <Link
            href={`/explore/${nextSlug}`}
            className='explore-hero__pager-link'
            aria-label='Next showcase'
          >
            <IconChevronRight />
            <span className='explore-hero__pager-txt'>Next</span>
          </Link>
        </div>

        <div className='explore-hero__content'>
          <div className='explore-hero__titles'>
            <p className='explore-hero__eyebrow'>Explore showcase</p>
            <h1 className='explore-hero__title'>{title}</h1>
            {(role || date) && (
              <p className='explore-hero__meta'>{[role, date].filter(Boolean).join(' · ')}</p>
            )}
            <div className='explore-hero__badges'>
              <span className='explore-hero__badge'>
                {kind === 'project' ? 'Project' : 'Experience'}
              </span>
              <span className='explore-hero__index' aria-label={`Entry ${index} of ${total}`}>
                {index} / {total}
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
