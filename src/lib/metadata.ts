import type { Metadata } from 'next';
import { isIndexableSite, siteConfig, getSiteUrl } from './site';

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

/** Shared Open Graph / Twitter / robots fields for app routes. */
export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = '',
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  const url = `${siteUrl}${canonicalPath}`;
  const indexable = isIndexableSite() && !noIndex;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: siteConfig.ogImagePath, alt: `${siteConfig.name} profile` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImagePath],
    },
    robots: indexable
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}
