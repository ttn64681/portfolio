/** Homepage extras strip + hub tiles (`extras-config.ts`). */

export type ExtraCategory = 'games' | 'music' | 'gallery' | 'animanga';

export type ExtraItem = {
  id: ExtraCategory;
  label: string;
  /** Optional short description or tagline */
  tagline?: string;
  href: string;
};
