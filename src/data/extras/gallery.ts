import type { GalleryTab } from '@/types/extras/gallery';

// /extras/gallery — tabs mirror `public/images/extras/{art|photos}/<subcategory>/`.
// Art subcategories = folders under art/ (digital, traditional, …).
// Photos tab reserved until `public/images/extras/photos/` is populated.

function artSrc(sub: string, file: string): string {
  return `/images/extras/art/${sub}/${encodeURIComponent(file)}`;
}

export const galleryTabs: GalleryTab[] = [
  {
    id: 'art',
    label: 'Art',
    subcategories: [
      {
        id: 'digital',
        label: 'Digital',
        items: [
          {
            src: artSrc('digital', 'mogi-christmas.png'),
            alt: 'Mogi Christmas illustration',
            layout: 'portrait',
            featured: true,
            title: 'Mogi Christmas',
            caption: 'Digital holiday illustration.',
          },
          {
            src: artSrc('digital', 'kagura.png'),
            alt: 'Kagura illustration',
            layout: 'portrait',
            title: 'Kagura',
          },
          {
            src: artSrc('digital', 'boruto.jpeg'),
            alt: 'Boruto study',
            layout: 'portrait',
            title: 'Boruto',
          },
          {
            src: artSrc('digital', 'chop-pfp.png'),
            alt: 'Chopper profile picture',
            layout: 'square',
            title: 'Chopper PFP',
          },
          {
            src: artSrc('digital', 'first-rendering.webp'),
            alt: 'First rendering study',
            layout: 'landscape',
            title: 'First rendering',
          },
          {
            src: artSrc('digital', 'frame-sheet.png'),
            alt: 'Animation frame sheet',
            layout: 'wide',
            featured: true,
            title: 'Frame sheet',
            caption: 'Animation timing / frame layout.',
          },
          {
            src: artSrc('digital', 'choppa.gif'),
            alt: 'Chopper gif',
            layout: 'square',
            title: 'Choppa loop',
          },
          {
            src: artSrc('digital', 'luffy-zest.gif'),
            alt: 'Luffy zest gif',
            layout: 'square',
            title: 'Luffy zest',
          },
          {
            src: artSrc('digital', 'mogi-bop.gif'),
            alt: 'Mogi bop gif',
            layout: 'square',
            title: 'Mogi bop',
          },
        ],
      },
      // traditional/
    ],
  },
];
