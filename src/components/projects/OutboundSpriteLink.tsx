'use client';

import Link from './Link';
import Octocat from './Octocat';

function isGitHubUrl(href: string) {
  try {
    const u = new URL(href);
    return u.hostname === 'github.com' || u.hostname.endsWith('.github.com');
  } catch {
    return href.includes('github.com');
  }
}

type OutboundSpriteLinkProps = {
  href: string;
  ariaLabel?: string;
};

/** External URL as pixel sprite: Octocat for GitHub hosts, link sprite otherwise. */
export default function OutboundSpriteLink({ href, ariaLabel }: OutboundSpriteLinkProps) {
  if (isGitHubUrl(href)) {
    return <Octocat href={href} ariaLabel={ariaLabel} />;
  }
  return <Link href={href} ariaLabel={ariaLabel} />;
}
