export type HierarchyNavItem = {
  id: string;
  label: string;
  selected?: boolean;
  onSelect?: () => void;
  href?: string;
};
