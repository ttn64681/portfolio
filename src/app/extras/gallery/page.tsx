import ExtrasGalleryClient from '@/components/extras/ExtrasGalleryClient';
import ExtrasHero from '@/components/extras/ExtrasHero';
import { galleryTabs } from '@/data/extras/gallery';
import { createPageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createPageMetadata({
  title: 'Gallery · Extras',
  description: 'Gallery of art and photos by Thai Nguyen.',
  path: '/extras/gallery',
});

/** Tabbed gallery grid (`ExtrasGalleryClient`); `extras-route--gallery` tunes type colors in shell.css. */
export default function ExtrasGalleryPage() {
  return (
    <>
      <ExtrasHero title='Framed gallery' deck='Some of my art and photos.' room='gallery' />
      <div className='extras-shell__inner extras-page-shell extras-route extras-route--gallery'>
        <div className='extras-page-shell__main extras-gallery-page-body'>
          <ExtrasGalleryClient tabs={galleryTabs} />
        </div>
      </div>
    </>
  );
}
