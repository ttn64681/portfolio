import type { MetadataRoute } from 'next';
import { getAllExploreSlugs } from '@/data/explore/registry';
import { getExtraGameSlugs } from '@/data/extras/games';
import { getSiteUrl, isIndexableSite } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableSite()) return [];

  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/explore`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    {
      url: `${siteUrl}/extras/gallery`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/extras/animanga`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/extras/music`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const exploreRoutes: MetadataRoute.Sitemap = getAllExploreSlugs().map((slug) => ({
    url: `${siteUrl}/explore/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const gameRoutes: MetadataRoute.Sitemap = getExtraGameSlugs().map((slug) => ({
    url: `${siteUrl}/extras/games/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...exploreRoutes, ...gameRoutes];
}
