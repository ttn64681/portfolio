'use client';

import { useEffect, useRef, useState } from 'react';

type AnimangaYoutubeEmbedProps = {
  videoId: string;
  title?: string;
  /** e.g. `extras-animanga-yt-embed--inline` for feed rows */
  className?: string;
};

/** Lazy YouTube iframe sized by parent (use same aspect-ratio wrapper as image thumbs). */
export default function AnimangaYoutubeEmbed({
  videoId,
  title = 'YouTube',
  className,
}: AnimangaYoutubeEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mountIframe, setMountIframe] = useState(false);

  useEffect(() => {
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
  }, []);

  const embedSrc = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0`;

  return (
    <div ref={containerRef} className={className ?? 'extras-animanga-yt-embed'}>
      {mountIframe ? (
        <iframe
          src={embedSrc}
          title={title}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          loading='lazy'
          referrerPolicy='strict-origin-when-cross-origin'
        />
      ) : (
        <div className='extras-animanga-yt-embed__skeleton' aria-hidden />
      )}
    </div>
  );
}
