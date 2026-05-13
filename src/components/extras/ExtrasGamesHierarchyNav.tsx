'use client';

import { useEffect, useMemo, useState } from 'react';
import HierarchyNav from '@/components/nav/HierarchyNav';
import {
  GAME_HUB_LABELS,
  GAME_HUB_ORDER,
  gameEntries,
  gamesByHubCategory,
} from '@/data/extras/games';
import type { GameHubCategory } from '@/types/extras/games';

/** Parent rows = hub buckets (`clubs`/`jams`/`misc`); child chips link to `/extras/games/[slug]`. */

export default function ExtrasGamesHierarchyNav({ currentSlug }: { currentSlug: string }) {
  const derivedCat = useMemo(() => {
    const g = gameEntries.find((x) => x.slug === currentSlug);
    return (g?.hubCategory ?? 'misc') as GameHubCategory;
  }, [currentSlug]);

  const [cat, setCat] = useState<GameHubCategory>(derivedCat);

  useEffect(() => {
    setCat(derivedCat);
  }, [derivedCat]);

  const dossiers = gamesByHubCategory(cat);

  const parents = GAME_HUB_ORDER.map((id) => ({
    id,
    label: GAME_HUB_LABELS[id],
    selected: cat === id,
    onSelect: () => setCat(id),
  }));

  const children = dossiers.map((g) => ({
    id: g.slug,
    label: g.title,
    href: `/extras/games/${g.slug}`,
    selected: g.slug === currentSlug,
  }));

  return <HierarchyNav ariaLabel='Games categories' parents={parents} subitems={children} parentVariant='underline' />;
}
