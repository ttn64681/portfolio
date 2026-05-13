'use client';

import Image from 'next/image';
import SourceMediaLink from '@/components/media/SourceMediaLink';
import Link from '@/components/projects/Link';
import Octocat from '@/components/projects/Octocat';
import LazyYouTube from '@/components/explore/LazyYouTube';
import type { ExtraGameEntry } from '@/types/extras-games';

/** Reuses explore poster primitives (`explore-overview-block`, gallery mosaic, bullets) for one game entry. */

function GameBullets({ lines }: { lines: string[] }) {
  return (
    <ul className='explore-poster-bullets'>
      {lines.map((line, i) => (
        <li key={i} className='explore-poster-bullets__item'>
          <span className='explore-poster-bullets__box'>{line}</span>
        </li>
      ))}
    </ul>
  );
}

type ExtrasGameShowcaseProps = {
  game: ExtraGameEntry;
};

export default function ExtrasGameShowcase({ game }: ExtrasGameShowcaseProps) {
  const bannerItem = game.gallery?.[0];
  const galleryRest = game.gallery?.slice(1) ?? [];

  return (
    <article className='extras-game extras-game--unified'>
      <section className='explore-overview-block' aria-labelledby={`extras-game-overview-${game.slug}`}>
        <div className='extras-game-float explore-widget-shell'>
          <h2 id={`extras-game-overview-${game.slug}`} className='extras-game-float__h'>
            Overview
          </h2>
          <p className='extras-game-float__deck'>{game.deck}</p>
          <p className='extras-game__description'>{game.description}</p>
          {game.award && <div className='project-card__award'>{game.award}</div>}
          {game.stack && game.stack.length > 0 && (
            <div className='explore-stack explore-stack--in-overview'>
              {game.stack.map((item) => (
                <span key={item} className='explore-stack__pill'>
                  {item}
                </span>
              ))}
            </div>
          )}
          {(game.playUrl || game.repoUrl) && (
            <div className='extras-game__actions'>
              {game.playUrl && <Link href={game.playUrl} ariaLabel={`Play ${game.title}`} />}
              {game.repoUrl && <Octocat href={game.repoUrl} ariaLabel={`GitHub: ${game.title}`} />}
            </div>
          )}
        </div>
        {bannerItem?.src && (
          <SourceMediaLink href={bannerItem.src} className='explore-overview-banner'>
            <div className='explore-overview-banner__mat'>
              {bannerItem.mediaKind === 'gif' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={bannerItem.src} alt={bannerItem.alt} className='explore-overview-banner__img explore-overview-banner__img--gif' />
              ) : (
                <Image
                  src={bannerItem.src}
                  alt={bannerItem.alt}
                  fill
                  sizes='100vw'
                  className='explore-overview-banner__img object-cover'
                />
              )}
            </div>
          </SourceMediaLink>
        )}
      </section>

      {galleryRest.length > 0 && (
        <section className='extras-game-float explore-gallery-section' aria-labelledby={`extras-game-gallery-${game.slug}`}>
          <h2 id={`extras-game-gallery-${game.slug}`} className='explore-widget-title explore-widget-title--gallery'>
            Gallery
          </h2>
          <div className='explore-gallery explore-gallery--mosaic explore-gallery--uniform-rows'>
            {galleryRest.map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                className='explore-slot explore-slot--mosaic explore-print explore-print--gallery explore-print--darkmat'
              >
                <SourceMediaLink href={item.src} className='explore-gallery-slot-link'>
                  <div
                    className={
                      item.src
                        ? 'explore-print__mat explore-print__mat--slot explore-print__mat--media explore-print__mat--intrinsic'
                        : 'explore-print__mat explore-print__mat--slot explore-print__mat--empty'
                    }
                  >
                    {item.src &&
                      (item.mediaKind === 'gif' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.src} alt={item.alt} className='explore-print__img explore-print__img--contain' />
                      ) : (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={1920}
                          height={1080}
                          sizes='(max-width: 767px) 96vw, (max-width: 1023px) 45vw, 33vw'
                          className='explore-print__img-natural'
                        />
                      ))}
                  </div>
                </SourceMediaLink>
                <span className='explore-print__lip' aria-hidden />
              </div>
            ))}
          </div>
        </section>
      )}

      {game.youtube && game.youtube.length > 0 && (
        <section className='extras-game-float explore-widget-shell' aria-labelledby={`extras-game-video-${game.slug}`}>
          <h2 id={`extras-game-video-${game.slug}`} className='explore-widget-title explore-widget-title--video'>
            Video
          </h2>
          <div className='explore-video-stack explore-video-stack--items'>
            {game.youtube.map((y, i) => (
              <LazyYouTube key={`${y.videoId}-${i}`} videoId={y.videoId} title={y.title} showHeading={false} />
            ))}
          </div>
        </section>
      )}

      {game.contributions.map((block, i) => {
        const layout = block.layout ?? 'default';
        const layoutMod = layout !== 'default' ? ` extras-contrib--${layout}` : '';
        return (
          <div key={i} className={`extras-game-float extras-contrib${layoutMod}`}>
            <div className='extras-contrib__body'>
              {block.title && <h2 className='extras-contrib__h'>{block.title}</h2>}
              <p className='extras-panel__p'>{block.body}</p>
              {block.assetSrc && (
                <SourceMediaLink href={block.assetSrc} className='extras-contrib__media-link'>
                  <div className='extras-contrib__media'>
                    <div className='relative aspect-video w-full max-h-[420px]'>
                      <Image
                        src={block.assetSrc}
                        alt={block.caption || block.title || `Asset ${i + 1}`}
                        fill
                        className='bg-black object-contain'
                        sizes='(max-width: 768px) 100vw, 800px'
                      />
                    </div>
                    {block.caption && <p className='extras-contrib__caption'>{block.caption}</p>}
                  </div>
                </SourceMediaLink>
              )}
              {block.gifSrc && (
                <SourceMediaLink href={block.gifSrc} className='extras-contrib__media-link'>
                  <div className='extras-contrib__media'>
                    <div className='relative aspect-video w-full max-h-[min(70vh,520px)] overflow-hidden bg-black'>
                      {/* eslint-disable-next-line @next/next/no-img-element -- GIF animation preserved */}
                      <img
                        src={block.gifSrc}
                        alt={block.caption || block.title || `GIF ${i + 1}`}
                        className='h-full w-full object-contain'
                      />
                    </div>
                    {block.caption && <p className='extras-contrib__caption'>{block.caption}</p>}
                  </div>
                </SourceMediaLink>
              )}
            </div>
          </div>
        );
      })}

      <section className='extras-game-float explore-widget-shell'>
        <h2 className='extras-panel__h'>Challenges</h2>
        <GameBullets lines={game.challenges} />
      </section>

      <section className='extras-game-float explore-widget-shell'>
        <h2 className='extras-panel__h'>Reflection</h2>
        <GameBullets lines={game.reflection} />
      </section>
    </article>
  );
}
