import ExploreHero from '@/components/explore/ExploreHero';
import ExplorePoster from '@/components/explore/ExplorePoster';
import ExploreShowcaseStrip from '@/components/explore/ExploreShowcaseStrip';
import { EXPLORE_OVERVIEW_FALLBACK } from '@/data/explore/dossier-defaults';
import {
  EXPLORE_ORDER,
  buildExploreDetail,
  getAllExploreSlugs,
  getExploreOrderIndex,
  getNeighbors,
} from '@/data/explore/registry';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/** Pre-render every slug from `EXPLORE_ORDER` for static export / fast navigations. */
export function generateStaticParams() {
  return getAllExploreSlugs().map((slug) => ({ slug }));
}

/** Open-graph style fields from merged dossier copy. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = buildExploreDetail(slug);
  if (!detail) {
    return { title: 'Not found' };
  }
  const description =
    detail.summary?.trim() ||
    detail.overview?.trim() ||
    EXPLORE_OVERVIEW_FALLBACK.slice(0, 160);
  return {
    title: `${detail.title} · Explore`,
    description: description.slice(0, 160),
  };
}

/** Hero + horizontal chip navigator + long-scroll poster (`ExplorePoster`). */
export default async function ExploreSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = buildExploreDetail(slug);
  if (!detail) {
    notFound();
  }

  const neighbors = getNeighbors(slug);
  if (!neighbors) {
    notFound();
  }

  const idx = getExploreOrderIndex(slug);
  const index = idx + 1;
  const total = EXPLORE_ORDER.length;

  return (
    <>
      <ExploreHero
        title={detail.title}
        kind={detail.kind}
        prevSlug={neighbors.prev}
        nextSlug={neighbors.next}
        index={index}
        total={total}
        heroBackdrop={detail.heroBackdrop}
        heroBackdropPosition={detail.heroBackdropPosition}
        heroOverlayOpacity={detail.heroOverlayOpacity}
        accent={detail.accent}
        role={detail.role}
        date={detail.date}
      />
      <ExploreShowcaseStrip currentSlug={slug} />
      <ExplorePoster detail={detail} prevHref={`/explore/${neighbors.prev}`} nextHref={`/explore/${neighbors.next}`} />
    </>
  );
}
