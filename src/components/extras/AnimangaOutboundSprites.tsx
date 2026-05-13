'use client';

import Link from '@/components/projects/Link';
import Octocat from '@/components/projects/Octocat';

function isGitHubUrl(href: string) {
  try {
    const u = new URL(href);
    return u.hostname === 'github.com' || u.hostname.endsWith('.github.com');
  } catch {
    return href.includes('github.com');
  }
}

type AnimangaOutboundSpritesProps = {
  href: string;
  ariaLabel: string;
};

/** External URL rendered as homepage-style sprite controls (no glyph chrome). */
export default function AnimangaOutboundSprites({ href, ariaLabel }: AnimangaOutboundSpritesProps) {
  if (isGitHubUrl(href)) {
    return <Octocat href={href} ariaLabel={ariaLabel} />;
  }
  return <Link href={href} ariaLabel={ariaLabel} />;
}
