'use client';

import Image from 'next/image';
import LazyGif from '@/components/media/LazyGif';

export type ExploreGalleryAssetLayout = 'figure' | 'gallery' | 'banner';

type ExploreGalleryAssetProps = {
  src: string;
  alt: string;
  mediaKind?: 'image' | 'gif';
  layout: ExploreGalleryAssetLayout;
};

/** Shared still/GIF renderer for explore posters and game dossiers. */
export default function ExploreGalleryAsset({
  src,
  alt,
  mediaKind,
  layout,
}: ExploreGalleryAssetProps) {
  if (mediaKind === 'gif') {
    const gifClass =
      layout === 'banner'
        ? 'explore-overview-banner__img explore-overview-banner__img--gif'
        : 'explore-print__img explore-print__img--contain';
    return <LazyGif src={src} alt={alt} className={gifClass} />;
  }

  if (layout === 'banner') {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes='100vw'
        className='explore-overview-banner__img object-cover'
        loading='lazy'
      />
    );
  }

  const sizes =
    layout === 'figure'
      ? '(max-width: 899px) 100vw, (max-width: 1199px) 45vw, 520px'
      : '(max-width: 767px) 96vw, (max-width: 1023px) 45vw, 33vw';

  return (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      sizes={sizes}
      className='explore-print__img-natural'
      loading='lazy'
    />
  );
}
