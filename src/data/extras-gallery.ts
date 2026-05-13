import type { GalleryTab } from '@/types/extras-gallery';

/**
 * Tabs for `/extras/gallery`: flat `items` or grouped `subcategories`. Each item picks a `layout` preset for grid span.
 */
export const extrasGalleryTabs: GalleryTab[] = [
  {
    id: 'drawings',
    label: 'Art',
    subcategories: [
      {
        id: 'sketches',
        label: 'Sketches',
        items: [
          {
            src: '/pixel/webp/pfp-me.webp',
            alt: 'Avatar pixel portrait',
            layout: 'portrait',
            title: 'Portrait sketch',
            date: '2025',
            caption: 'Pixel avatar explorations.',
          },
          {
            src: '/pixel/webp/link-walk.webp',
            alt: 'Link-style walk cycle',
            layout: 'wide',
            featured: true,
            title: 'Walk cycle',
            caption: 'Side-scroll locomotion study.',
          },
        ],
      },
      {
        id: 'digital',
        label: 'Digital',
        items: [
          {
            src: '/pixel/webp/bubble-me.webp',
            alt: 'Pixel bubble character',
            layout: 'square',
            title: 'Bubble buddy',
            date: '2025',
          },
          {
            src: '/pixel/webp/tiles.webp',
            alt: 'Environment tiles',
            layout: 'landscape',
            caption: 'Tile strip for parallax layers.',
          },
        ],
      },
      {
        id: 'env',
        label: 'Tilework',
        items: [
          {
            src: '/pixel/webp/octocat-float.webp',
            alt: 'Floating octocat sprite',
            layout: 'square',
            title: 'Octocat float',
          },
        ],
      },
    ],
  },
  {
    id: 'photography',
    label: 'Photos',
    subcategories: [
      {
        id: 'school',
        label: 'School / campus',
        items: [
          {
            src: '/pixel/webp/3 midland.webp',
            alt: 'Mid parallax layer',
            layout: 'landscape',
            featured: true,
            title: 'Mid layer plates',
            date: '2025',
            caption: 'Parallax strata captured flat.',
          },
        ],
      },
      {
        id: 'christmas',
        label: 'Holiday',
        items: [
          {
            src: '/pixel/webp/5 sky.webp',
            alt: 'Sky layer from parallax',
            layout: 'landscape',
            title: 'Winter wash sky',
            date: 'Dec',
          },
        ],
      },
      {
        id: 'misc',
        label: 'Misc',
        items: [
          {
            src: '/pixel/webp/portrait.webp',
            alt: 'Portrait study',
            layout: 'portrait',
            caption: 'Lighting experiment.',
          },
        ],
      },
    ],
  },
];
