'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import type { ExploreDetail, ExploreFigureSection, ExploreGalleryItem, ExploreKind } from '@/types/explore';
import SourceMediaLink from '@/components/media/SourceMediaLink';
import Link from '@/components/projects/Link';
import Octocat from '@/components/projects/Octocat';
import RouteFooterPager from '@/components/nav/RouteFooterPager';
import LazyYouTube from './LazyYouTube';

/**
 * `/explore/[slug]` body below `ExploreHero`.
 *
 * Flow: overview band → floated widgets (`explore-float-grid`) → mosaic gallery → optional videos.
 * Root applies slug accent via `explore-float-root--accent-*` (see poster.css).
 */

type ExplorePosterProps = {
  detail: ExploreDetail;
  prevHref: string;
  nextHref: string;
};

/** Bullet list used in Features / Implementation / etc. — styled as boxed chips (shared with game dossier). */
function PosterBullets({ lines }: { lines: string[] }) {
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

/** Widget `<h2>` color modifiers: project vs experience tone + per-section hue in poster.css. */
function widgetTitleClass(kind: ExploreKind, section: 'features' | 'implementation' | 'challenges' | 'reflection'): string {
  const base = 'explore-widget-title';
  const tone = kind === 'experience' ? 'explore-widget-title--exp' : 'explore-widget-title--proj';
  return `${base} ${tone} ${base}--${section}`;
}

/** Single framed asset for figure grids + gallery slots; GIFs use `<img>`, stills use `next/image`. */
function FigureMat({ item }: { item: ExploreGalleryItem }) {
  const matClass = item.src
    ? 'explore-print__mat explore-print__mat--media explore-print__mat--intrinsic'
    : 'explore-print__mat explore-print__mat--empty';

  const inner = (
    <div className={matClass}>
      {item.src ? (
        item.mediaKind === 'gif' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt={item.alt} className='explore-print__img explore-print__img--contain' />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            width={1920}
            height={1080}
            sizes='(max-width: 899px) 100vw, (max-width: 1199px) 45vw, 520px'
            className='explore-print__img-natural'
          />
        )
      ) : (
        <div className='explore-print__placeholder'>
          <span className='explore-slot__label'>Asset slot</span>
        </div>
      )}
    </div>
  );

  return (
    <SourceMediaLink href={item.src} className='explore-figures__media-hit'>
      {inner}
    </SourceMediaLink>
  );
}

/** Uniform grid of `FigureMat` cells (`detail.figures.*` entries). */
function ExploreFigures({ items, omitCaptions }: { items: ExploreGalleryItem[] | undefined; omitCaptions?: boolean }) {
  if (!items?.length) return null;
  const gridClass = 'explore-figures explore-figures--uniform';
  return (
    <div className={gridClass}>
      {items.map((item, i) => (
        <figure key={`${item.alt}-${i}`} className='explore-figures__cell'>
          <div className='explore-figures__frame explore-print explore-print--figure explore-print--darkmat'>
            <FigureMat item={item} />
            <span className='explore-print__lip' aria-hidden />
          </div>
          {!omitCaptions && item.caption && <figcaption className='explore-figures__caption'>{item.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function OverviewBanner({ item }: { item: ExploreGalleryItem }) {
  if (!item.src) return null;
  return (
    <SourceMediaLink href={item.src} className='explore-overview-banner'>
      <div className='explore-overview-banner__mat'>
        {item.mediaKind === 'gif' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt={item.alt} className='explore-overview-banner__img explore-overview-banner__img--gif' />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes='100vw'
            className='explore-overview-banner__img object-cover'
            priority={false}
          />
        )}
      </div>
    </SourceMediaLink>
  );
}

/**
 * Pair of columns on desktop: widget shell (heading + bullet children) + optional figure strip.
 * Adds `--figures-rich` when ≥2 images so poster.css can widen the art column evenly.
 */
function SectionWithFigures({
  sectionId,
  sectionKey,
  heading,
  headingClass,
  children,
  figures,
}: {
  sectionId: string;
  sectionKey: ExploreFigureSection;
  heading: string;
  headingClass: string;
  children: ReactNode;
  figures?: ExploreDetail['figures'];
}) {
  const figureItems = figures?.[sectionKey];
  const figureCount = figureItems?.length ?? 0;
  const richFigures = figureCount >= 2;
  const mod = [`explore-section-widget`];
  if (figureCount > 0) mod.push('explore-section-widget--has-figures');
  if (richFigures) mod.push('explore-section-widget--figures-rich');

  return (
    <div className={mod.join(' ')}>
      <div className='explore-widget-shell'>
        <h2 id={sectionId} className={headingClass}>
          {heading}
        </h2>
        {children}
      </div>
      <ExploreFigures items={figureItems} />
    </div>
  );
}

export default function ExplorePoster({ detail, prevHref, nextHref }: ExplorePosterProps) {
  // `accent` picks CSS variables on `.explore-float-root--accent-${acc}`
  const acc = detail.accent ?? 'aurora';
  const k = detail.kind;
  const bannerItem = detail.figures?.overview?.[0];

  return (
    <div className={`explore-float-root explore-float-root--accent-${acc}`}>
      <div className='explore-page__inner explore-float-root__inner'>
        <section className='explore-overview-block' aria-labelledby='explore-overview-heading'>
          <div className='explore-overview-panel explore-widget-shell'>
            <h2 id='explore-overview-heading' className='explore-overview-panel__title'>
              Overview
            </h2>
            <p className='explore-poster__label explore-poster__label--muted'>At a glance</p>
            <p className='explore-poster__overview'>{detail.overview}</p>
            {detail.award && <div className='project-card__award'>{detail.award}</div>}
            <div className='explore-stack explore-stack--in-overview'>
              {detail.stack.map((item) => (
                <span key={item} className='explore-stack__pill'>
                  {item}
                </span>
              ))}
            </div>
            {!detail.demoLink && !detail.repoLink && detail.kind === 'project' && (
              <p className='explore-poster__links-hint'>
                Add demo or repo URLs in projects-config to show link buttons.
              </p>
            )}
            {(detail.demoLink || detail.repoLink) && (
              <div className='explore-poster__actions' onClick={(e) => e.stopPropagation()}>
                {detail.demoLink && <Link href={detail.demoLink} ariaLabel='Open live demo' />}
                {detail.repoLink && <Octocat href={detail.repoLink} />}
              </div>
            )}
          </div>
          {bannerItem && <OverviewBanner item={bannerItem} />}
        </section>

        <div className='explore-float-grid'>
          <SectionWithFigures
            sectionId='explore-features-heading'
            sectionKey='features'
            heading='Features'
            headingClass={widgetTitleClass(k, 'features')}
            figures={detail.figures}
          >
            <PosterBullets lines={detail.features} />
          </SectionWithFigures>

          <SectionWithFigures
            sectionId='explore-impl-heading'
            sectionKey='implementation'
            heading='Implementation'
            headingClass={widgetTitleClass(k, 'implementation')}
            figures={detail.figures}
          >
            <PosterBullets lines={detail.implementation} />
          </SectionWithFigures>

          <SectionWithFigures
            sectionId='explore-challenges-heading'
            sectionKey='challenges'
            heading='Challenges'
            headingClass={widgetTitleClass(k, 'challenges')}
            figures={detail.figures}
          >
            <PosterBullets lines={detail.challenges} />
          </SectionWithFigures>

          <SectionWithFigures
            sectionId='explore-reflect-heading'
            sectionKey='reflection'
            heading='Reflection'
            headingClass={widgetTitleClass(k, 'reflection')}
            figures={detail.figures}
          >
            <PosterBullets lines={detail.reflection} />
          </SectionWithFigures>
        </div>

        <section className='explore-gallery-section' aria-labelledby='explore-gallery-heading'>
          <h2 id='explore-gallery-heading' className='explore-widget-title explore-widget-title--gallery'>
            Gallery
          </h2>
          <div className='explore-gallery explore-gallery--mosaic explore-gallery--uniform-rows'>
            {detail.gallery.map((item, i) => (
              <div
                key={`${item.alt}-${i}`}
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
                    {item.src ? (
                      item.mediaKind === 'gif' ? (
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
                      )
                    ) : (
                      <>
                        <div className='explore-print__placeholder'>
                          <span className='explore-slot__label'>Screenshot placeholder</span>
                        </div>
                        {item.caption && <p className='explore-slot__caption'>{item.caption}</p>}
                      </>
                    )}
                  </div>
                </SourceMediaLink>
                <span className='explore-print__lip' aria-hidden />
              </div>
            ))}
          </div>
        </section>

        {detail.youtube.length > 0 && (
          <section className='explore-panel explore-video-section' aria-labelledby='explore-video-stack-heading'>
            <h2 id='explore-video-stack-heading' className='explore-widget-title explore-widget-title--video'>
              Video
            </h2>
            <div className='explore-video-stack explore-video-stack--items'>
              {detail.youtube.map((y, i) => (
                <LazyYouTube key={i} videoId={y.videoId} title={y.title} showHeading={false} />
              ))}
            </div>
          </section>
        )}

        <RouteFooterPager prevHref={prevHref} nextHref={nextHref} />
      </div>
    </div>
  );
}
