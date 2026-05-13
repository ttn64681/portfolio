/** Extras section: sneak peek categories. */

export type ExtraCategory = 'games' | 'music' | 'gallery' | 'animanga';

export type ExtraItem = {
  id: ExtraCategory;
  label: string;
  /** Optional short description or tagline */
  tagline?: string;
  href: string;
};
