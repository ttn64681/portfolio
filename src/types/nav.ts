/** Parent row or chip row entry for `HierarchyNav` / `HierarchyChipRow`. */

export type NavChip = {
  id: string;
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  href?: string;
};
