'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getHubExperienceLinks,
  getHubGameLinks,
  getHubProjectLinks,
  isHubFocus,
} from '@/data/explore/hub';
import type { HubFocusParam } from '@/types/explore/hub';
import {
  MdClose,
  MdCollections,
  MdGraphicEq,
  MdGroups,
  MdHome,
  MdRocketLaunch,
  MdSportsEsports,
  MdTheaters,
} from 'react-icons/md';

/**
 * `/explore` landing grid: flip tiles open lists for projects / experiences / games; music/gallery/animanga link straight out.
 * `?focus=` syncs open flip state for shareable URLs.
 */

type FlipId = HubFocusParam;

/** One hub tile: front face toggles open state; back face lists links (`explore-hub-flip*` in hub.css). */
function HubFlipTile({
  flipId,
  open,
  onOpen,
  onClose,
  frontIcon,
  label,
  tagline,
  gradientClass,
  children,
}: {
  flipId: FlipId;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  frontIcon: React.ReactNode;
  label: string;
  tagline: string;
  gradientClass: string;
  children: React.ReactNode;
}) {
  const backRef = useRef<HTMLDivElement | null>(null);
  const listScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const back = backRef.current;
    const scroller = listScrollRef.current;
    if (!back || !scroller) return;

    const onWheelCapture = (e: WheelEvent) => {
      if (scroller.scrollHeight <= scroller.clientHeight + 1) return;

      const { deltaY } = e;
      const top = scroller.scrollTop;
      const maxTop = scroller.scrollHeight - scroller.clientHeight;

      if (deltaY < 0 && top <= 0) return;
      if (deltaY > 0 && top >= maxTop) return;

      scroller.scrollTop = Math.min(maxTop, Math.max(0, top + deltaY));
      e.preventDefault();
    };

    back.addEventListener('wheel', onWheelCapture, { passive: false, capture: true });
    return () => back.removeEventListener('wheel', onWheelCapture, { capture: true });
  }, [open]);

  return (
    <div className={`explore-hub-flip-tile explore-hub-flip-tile--flip ${open ? 'explore-hub-flip-tile--open' : ''} ${gradientClass}`}>
      <div className={`explore-hub-flip ${open ? 'explore-hub-flip--open' : ''}`}>
        <div className='explore-hub-flip__inner'>
          <button
            type='button'
            className='explore-hub-flip__face explore-hub-flip__face--front'
            onClick={onOpen}
            aria-expanded={open}
            aria-controls={`hub-flip-panel-${flipId}`}
            id={`hub-flip-trigger-${flipId}`}
          >
            <span className='explore-hub-flip__icon-wrap' aria-hidden>
              {frontIcon}
            </span>
            <span className='explore-hub__label'>{label}</span>
            <span className='explore-hub__tagline'>{tagline}</span>
            <span className='explore-hub-flip__hint'>Tap to open list</span>
          </button>
          <div
            ref={backRef}
            className='explore-hub-flip__face explore-hub-flip__face--back'
            id={`hub-flip-panel-${flipId}`}
            role='region'
            aria-labelledby={`hub-flip-trigger-${flipId}`}
            hidden={!open}
          >
            <div className='explore-hub-flip__back-head'>
              <span className='explore-hub-flip__back-title'>{label}</span>
              <button type='button' className='explore-hub-flip__close' onClick={onClose} aria-label='Close list'>
                <MdClose size={20} aria-hidden />
              </button>
            </div>
            <div ref={listScrollRef} className='explore-hub-flip__list-scroll'>
              <ul className='explore-hub-flip__list'>{children}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Simple portal tile — no flip animation, navigates directly (`explore-hub-flip-tile--direct`). */
function DirectPortal({
  href,
  icon,
  label,
  tagline,
  gradientClass,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  tagline: string;
  gradientClass: string;
}) {
  return (
    <Link href={href} className={`explore-hub__portal explore-hub-flip-tile--direct ${gradientClass}`}>
      <span className='explore-hub-flip__icon-wrap' aria-hidden>
        {icon}
      </span>
      <span className='explore-hub__label'>{label}</span>
      <span className='explore-hub__tagline'>{tagline}</span>
    </Link>
  );
}

/** Orchestrates flip tiles + portals + query sync (`?focus=`). */
export default function ExploreHubClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openFlip, setOpenFlip] = useState<FlipId | null>(null);

  const projects = getHubProjectLinks();
  const experiences = getHubExperienceLinks();
  const games = getHubGameLinks();

  const clearFocusQuery = useCallback(() => {
    router.replace('/explore', { scroll: false });
  }, [router]);

  useEffect(() => {
    const raw = searchParams.get('focus');
    if (raw && isHubFocus(raw)) {
      setOpenFlip(raw);
    }
  }, [searchParams]);

  const handleOpen = (id: FlipId) => {
    setOpenFlip(id);
    router.replace(`/explore?focus=${id}`, { scroll: false });
  };

  const handleClose = () => {
    setOpenFlip(null);
    clearFocusQuery();
  };

  return (
    <div className='explore-hub explore-hub--unified'>
      <HubFlipTile
        flipId='projects'
        open={openFlip === 'projects'}
        onOpen={() => handleOpen('projects')}
        onClose={handleClose}
        gradientClass='explore-hub__portal--projects'
        label='Projects'
        tagline='Shipped builds, tools, and class monsters'
        frontIcon={<MdRocketLaunch className='explore-hub-flip__glyph' />}
      >
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/explore/${p.slug}`} className='explore-hub-flip__link'>
              {p.label}
            </Link>
          </li>
        ))}
      </HubFlipTile>

      <HubFlipTile
        flipId='experiences'
        open={openFlip === 'experiences'}
        onOpen={() => handleOpen('experiences')}
        onClose={handleClose}
        gradientClass='explore-hub__portal--experiences'
        label='Experiences'
        tagline='Roles, leadership, and client work'
        frontIcon={<MdGroups className='explore-hub-flip__glyph' />}
      >
        {experiences.map((e) => (
          <li key={e.slug}>
            <Link href={`/explore/${e.slug}`} className='explore-hub-flip__link'>
              {e.label}
            </Link>
          </li>
        ))}
      </HubFlipTile>

      <HubFlipTile
        flipId='games'
        open={openFlip === 'games'}
        onOpen={() => handleOpen('games')}
        onClose={handleClose}
        gradientClass='explore-hub__portal--games'
        label='Games'
        tagline='Demos & jams — dossiers'
        frontIcon={<MdSportsEsports className='explore-hub-flip__glyph' />}
      >
        {games.map((g) => (
          <li key={g.slug}>
            <Link href={`/extras/games/${g.slug}`} className='explore-hub-flip__link'>
              {g.label}
            </Link>
          </li>
        ))}
      </HubFlipTile>

      <DirectPortal
        href='/extras/music'
        gradientClass='explore-hub__portal--music'
        label='Music'
        tagline='Tracks & sound test'
        icon={<MdGraphicEq className='explore-hub-flip__glyph' />}
      />
      <DirectPortal
        href='/extras/gallery'
        gradientClass='explore-hub__portal--gallery'
        label='Gallery'
        tagline='Art & photos'
        icon={<MdCollections className='explore-hub-flip__glyph' />}
      />
      <DirectPortal
        href='/extras/animanga'
        gradientClass='explore-hub__portal--animanga'
        label='Animanga'
        tagline='Watch log & picks'
        icon={<MdTheaters className='explore-hub-flip__glyph' />}
      />

      <Link href='/' className='explore-hub__home'>
        <MdHome className='explore-hub__home-icon' size={18} aria-hidden />
        Home
      </Link>
    </div>
  );
}
