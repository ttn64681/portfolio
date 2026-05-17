'use client';

import { useEffect, useRef, useState } from 'react';

type LazyYouTubeProps = {
  videoId?: string;
  /** Loom embed id from `loom.com/embed/<id>`. */
  loomId?: string;
  title?: string;
  /** When false, renders embed only (use when an outer layout supplies the heading). */
  showHeading?: boolean;
};

/** Mounts the iframe only after the block scrolls near the viewport — saves bandwidth on long dossiers. */
export default function LazyYouTube({
  videoId,
  loomId,
  title,
  showHeading = true,
}: LazyYouTubeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mountIframe, setMountIframe] = useState(false);
  const embedKey = videoId ?? loomId;

  useEffect(() => {
    if (!embedKey) return;
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMountIframe(true);
      },
      { rootMargin: '100px', threshold: 0.01 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [embedKey]);

  if (!embedKey) {
    const body = (
      <div ref={containerRef} className='explore-youtube explore-youtube--placeholder'>
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
    : `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId!)}`;

  const defaultTitle = loomId ? 'Loom video' : 'YouTube video';

  const player = (
    <div ref={containerRef} className='explore-youtube'>
      <div className='explore-youtube__frame'>
        {mountIframe ? (
          <iframe
            src={embedSrc}
            title={title || defaultTitle}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
            loading='lazy'
            referrerPolicy='strict-origin-when-cross-origin'
          />
        ) : (
          <div className='explore-youtube__skeleton' aria-hidden />
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
