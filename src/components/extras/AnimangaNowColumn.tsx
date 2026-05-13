'use client';

import Image from 'next/image';
import SourceMediaLink from '@/components/media/SourceMediaLink';
import OutboundSpriteLink from '@/components/projects/OutboundSpriteLink';
import { AnimangaStars } from '@/components/extras/AnimangaFeedSection';
import type { AnimangaCurrent } from '@/types/extras/animanga';

/** Single labeled stack inside a medium column (“Currently watching”, “Want to play”, …). */

export default function AnimangaNowColumn({
  label,
  items = [],
  showRating = true,
}: {
  label: string;
  items?: AnimangaCurrent[];
  /** Games column hides stars even if `rating` exists in data. */
  showRating?: boolean;
}) {
  const hasItems = items.length > 0;
  return (
    <div className={`extras-animanga-now ${hasItems ? '' : 'extras-animanga-now--dim'}`}>
      <div className='extras-animanga-now__label'>{label}</div>
      {hasItems ? (
        <div className='extras-animanga-now__entries'>
          {items.map((item, i) => (
            <div key={`${item.title}-${i}`} className='extras-animanga-now__entry'>
              {item.image && (
                <SourceMediaLink href={item.image} className='extras-animanga-thumb-hit'>
                  <div className='extras-animanga-now__thumb'>
                    <Image src={item.image} alt={item.title} fill className='object-contain' sizes='(max-width: 768px) 100vw, 200px' />
                  </div>
                </SourceMediaLink>
              )}
              <h3 className='extras-animanga-now__title'>{item.title}</h3>
              {showRating && item.rating != null && <AnimangaStars value={item.rating} />}
              {item.subtitle && <p className='extras-animanga-now__sub'>{item.subtitle}</p>}
              {item.href && (
                <div className='extras-animanga-now__outbound'>
                  <OutboundSpriteLink href={item.href} ariaLabel={`Open link: ${item.title}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className='extras-animanga-now__empty'>Nothing listed yet — add picks in data/extras/animanga.ts.</p>
      )}
    </div>
  );
}
