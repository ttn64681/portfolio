'use client';

import { useRef } from 'react';
import { useNearViewport } from '@/hooks/useNearViewport';

type LazyYouTubeProps = {
  videoId?: string;
  /** Loom embed id from `loom.com/embed/<id>`. */
  loomId?: string;
  title?: string;
  /** When false, renders embed only (outer layout supplies the heading). */
  showHeading?: boolean;
  /** Root wrapper class (e.g. explore vs animanga sizing). */
  className?: string;
  skeletonClassName?: string;
};

/** Mounts YouTube/Loom iframe only after the block scrolls near the viewport. */
export default function LazyYouTube({
  videoId,
  loomId,
  title,
  showHeading = true,
  className,
  skeletonClassName,
}: LazyYouTubeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountIframe = useNearViewport(containerRef);
  const embedKey = videoId ?? loomId;

  const rootClass = className ?? 'explore-youtube';
  const skClass = skeletonClassName ?? 'explore-youtube__skeleton';

  if (!embedKey) {
    const body = (
      <div ref={containerRef} className={`${rootClass} explore-youtube--placeholder`}>
        <div className='explore-youtube__frame'>
          <p className='explore-youtube__placeholder-text'>No video embed yet — add one in detail data.</p>
        </div>
        {title && <p className='explore-youtube__title'>{title}</p>}
      </div>
    );
    return showHeading ? (
      <section className='explore-panel' aria-labelledby='explore-video-heading'>
        <h2 id='explore-video-heading' className='explore-widget-title explore-widget-title--video'>
          Video
        </h2>
        {body}
      </section>
    ) : (
      body
    );
  }

  const embedSrc = loomId
    ? `https://www.loom.com/embed/${encodeURIComponent(loomId)}`
    : `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId!)}?rel=0`;

  const defaultTitle = loomId ? 'Loom video' : 'YouTube video';

  const player = (
    <div ref={containerRef} className={rootClass}>
      <div className='explore-youtube__frame'>
        {mountIframe ? (
          <iframe
            src={embedSrc}
            title={title || defaultTitle}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
            referrerPolicy='strict-origin-when-cross-origin'
          />
        ) : (
          <div className={skClass} aria-hidden />
        )}
      </div>
      {title && <p className='explore-youtube__title'>{title}</p>}
    </div>
  );

  return showHeading ? (
    <section className='explore-panel' aria-labelledby='explore-video-heading'>
      <h2 id='explore-video-heading' className='explore-widget-title explore-widget-title--video'>
        Video
      </h2>
      {player}
    </section>
  ) : (
    player
  );
}
