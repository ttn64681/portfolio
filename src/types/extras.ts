/** Extras section: sneak peek categories. */

export type ExtraCategory = 'games' | 'music' | 'drawings' | 'photos';

export type ExtraItem = {
  id: ExtraCategory;
  label: string;
  /** Optional short description or tagline */
  tagline?: string;
};
