/** Canonical site identity — used by metadata, sitemap, and robots. */

const DEFAULT_DESCRIPTION =
  'Portfolio of Thai Nguyen — CS student at UGA building full-stack apps, games, and creative web experiences. Explore projects, experience, and a RAG-powered chat.';

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  const vercelHost = process.env.VERCEL_URL?.trim();
  if (vercelHost) return `https://${vercelHost.replace(/\/$/, '')}`;

  const port = process.env.PORT?.trim() || '3000';
  return `http://localhost:${port}`;
}

/** True when the site should be indexed (production deploy, not localhost). */
export function isIndexableSite(): boolean {
  if (process.env.NEXT_PUBLIC_NOINDEX === 'true') return false;
  const url = getSiteUrl();
  return !url.includes('localhost') && !url.includes('127.0.0.1');
}

export const siteConfig = {
  name: 'Thai Nguyen',
  title: 'Thai Nguyen — Portfolio',
  shortTitle: 'Thai Nguyen Portfolio',
  description: DEFAULT_DESCRIPTION,
  locale: 'en_US',
  author: 'Thai Nguyen',
  keywords: [
    'Thai Nguyen',
    'portfolio',
    'software engineer',
    'full-stack developer',
    'computer science',
    'University of Georgia',
    'web developer',
    'game developer',
  ],
  links: {
    github: 'https://github.com/ttn64681',
    linkedin: 'https://linkedin.com/in/thai-tam-minh-nguyen',
  },
  ogImagePath: '/pixel/webp/pfp-me.webp',
} as const;
