'use client';

import Image from 'next/image';
import SourceMediaLink from '@/components/media/SourceMediaLink';
import { useEffect, useMemo, useState } from 'react';
import HierarchyNav from '@/components/nav/HierarchyNav';
import type { GalleryItem, GalleryLayoutPreset, GalleryTab } from '@/types/extras/gallery';
import { isGroupedGalleryTab } from '@/types/extras/gallery';

/** Maps data layout presets + featured flag to grid cell BEM classes (`extras-gallery-cell--*`). */
function cellClass(layout: GalleryLayoutPreset, featured?: boolean): string {
  const parts = ['extras-gallery-cell', `extras-gallery-cell--${layout}`];
  if (featured || layout === 'wide') parts.push('extras-gallery-cell--span2');
  return parts.join(' ');
}

const REGION_LABEL_ID = 'extras-gallery-region-label';

/** Tabs (flat or grouped) drive `HierarchyNav`; active items render in `extras-gallery-grid`. */

export default function ExtrasGalleryClient({ tabs }: { tabs: GalleryTab[] }) {
  const [tabId, setTabId] = useState(tabs[0]?.id ?? '');
  const [subIdByTab, setSubIdByTab] = useState<Record<string, string>>({});

  const activeTab = tabs.find((t) => t.id === tabId) ?? tabs[0];

  const currentSubId = activeTab ? subIdByTab[activeTab.id] : undefined;

  useEffect(() => {
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab || !isGroupedGalleryTab(tab)) return;
    setSubIdByTab((prev) => {
      const cur = prev[tab.id];
      if (cur && tab.subcategories.some((s) => s.id === cur)) return prev;
      const first = tab.subcategories[0]?.id;
      if (!first) return prev;
      return { ...prev, [tab.id]: first };
    });
  }, [tabId, tabs]);

  const activeItems: GalleryItem[] = useMemo(() => {
    if (!activeTab) return [];
    if (isGroupedGalleryTab(activeTab)) {
      const resolvedSub =
        currentSubId && activeTab.subcategories.some((s) => s.id === currentSubId)
          ? currentSubId
          : activeTab.subcategories[0]?.id;
      const sub = activeTab.subcategories.find((s) => s.id === resolvedSub);
      return sub?.items ?? [];
    }
    return activeTab.items ?? [];
  }, [activeTab, currentSubId]);

  if (!activeTab) {
    return <p className='extras-panel__p'>No gallery tabs configured.</p>;
  }

  const groupedTab = isGroupedGalleryTab(activeTab) ? activeTab : null;

  const resolvedSub =
    groupedTab &&
    (currentSubId && groupedTab.subcategories.some((s) => s.id === currentSubId)
      ? currentSubId
      : groupedTab.subcategories[0]?.id);

  const regionLabel =
    groupedTab && resolvedSub
      ? `${activeTab.label} · ${groupedTab.subcategories.find((s) => s.id === resolvedSub)?.label ?? ''}`
      : activeTab.label;

  const parentItems = tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    selected: tab.id === activeTab.id,
    onSelect: () => setTabId(tab.id),
  }));

  const childItems =
    groupedTab && resolvedSub
      ? groupedTab.subcategories.map((sub) => ({
          id: sub.id,
          label: sub.label,
          selected: sub.id === resolvedSub,
          onSelect: () =>
            setSubIdByTab((prev) => ({
              ...prev,
              [activeTab.id]: sub.id,
            })),
        }))
      : [];

  return (
    <>
      <div className='extras-gallery-hierarchy'>
        <HierarchyNav ariaLabel='Gallery categories' parents={parentItems} subitems={childItems} parentVariant='underline' />
      </div>

      <p id={REGION_LABEL_ID} className='sr-only'>
        {regionLabel}
      </p>
      <div className='extras-gallery-grid extras-gallery-grid--uniform-rows' role='region' aria-labelledby={REGION_LABEL_ID}>
        {activeItems.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className={`${cellClass(item.layout, item.featured)} extras-gallery-cell--retro`}
          >
            <div className='extras-gallery-print-shell'>
              <SourceMediaLink href={item.src} className='extras-gallery-frame-hit'>
                <div className='extras-gallery-frame'>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1600}
                    height={1000}
                    sizes='(max-width: 768px) 50vw, 25vw'
                    className='extras-gallery-frame__img'
                    priority={activeTab.id === tabs[0]?.id && i < 2}
                  />
                </div>
              </SourceMediaLink>
              <div className='extras-gallery-meta-sheet'>
                {item.title && <div className='extras-gallery-meta-sheet__title'>{item.title}</div>}
                {item.date && <div className='extras-gallery-meta-sheet__date'>{item.date}</div>}
                {item.caption && <p className='extras-gallery-meta-sheet__caption'>{item.caption}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
