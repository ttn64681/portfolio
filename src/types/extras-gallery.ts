/** Extras /gallery layout presets for CSS grid cells. */

export type GalleryLayoutPreset = 'square' | 'landscape' | 'portrait' | 'wide';

export type GalleryItem = {
  src: string;
  alt: string;
  layout: GalleryLayoutPreset;
  featured?: boolean;
  title?: string;
  caption?: string;
  date?: string;
};

export type GallerySubcategory = {
  id: string;
  label: string;
  items: GalleryItem[];
};

/** Photos vs Art primary tabs — items grouped into curator buckets. */
export type GalleryTabGrouped = {
  id: string;
  label: string;
  subcategories: GallerySubcategory[];
};

/** Simple flat grid without nested buckets (optional). */
export type GalleryTabFlat = {
  id: string;
  label: string;
  items: GalleryItem[];
};

export type GalleryTab = GalleryTabGrouped | GalleryTabFlat;

export function isGroupedGalleryTab(tab: GalleryTab): tab is GalleryTabGrouped {
  return 'subcategories' in tab && Array.isArray(tab.subcategories);
}
