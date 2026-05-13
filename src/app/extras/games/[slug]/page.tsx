import ExtrasGameShowcase from '@/components/extras/ExtrasGameShowcase';
import ExtrasGamesHierarchyNav from '@/components/extras/ExtrasGamesHierarchyNav';
import ExtrasHero from '@/components/extras/ExtrasHero';
import { getExtraGameBySlug, getExtraGameSlugs } from '@/data/extras/games';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/** One static page per `gameEntries` entry — hero + hierarchy nav + `ExtrasGameShowcase`. */
export function generateStaticParams() {
  return getExtraGameSlugs().map((slug) => ({ slug }));
}

/** Metadata for search / share previews from `gameEntries` entry. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getExtraGameBySlug(slug);
  if (!game) return { title: 'Not found' };
  return {
    title: `${game.title} · Games · Extras`,
    description: game.deck,
  };
}

/** SSR loads game config once and mounts dossier layout components. */
export default async function ExtrasGameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getExtraGameBySlug(slug);
  if (!game) {
    notFound();
  }

  return (
    <>
      <ExtrasHero title={game.title} deck={game.deck} room='games' />
      <div className='extras-shell__inner extras-page-shell extras-route extras-route--games'>
        <div className='extras-page-shell__main'>
          <ExtrasGamesHierarchyNav currentSlug={slug} />
          <ExtrasGameShowcase game={game} />
        </div>
      </div>
    </>
  );
}
