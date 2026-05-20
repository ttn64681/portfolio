/** Hostname-only check for /api/chat (production w/ ALLOWED_DOMAIN set). */

function normalizeHost(value: string | undefined): string | null {
  const trimmed = value?.trim().toLowerCase();
  if (!trimmed) return null;

  try {
    const withProtocol = trimmed.includes('://') ? trimmed : `https://${trimmed.split('/')[0]}`;
    return new URL(withProtocol).hostname;
  } catch {
    return trimmed.split('/')[0]?.replace(/^https?:\/\//, '') || null;
  }
}

function hostMatchesAllowed(host: string, allowed: string): boolean {
  return host === allowed || host.endsWith(`.${allowed}`);
}

function hostFromHeader(value: string | null): string | null {
  if (!value || value === 'null') return null;
  return normalizeHost(value);
}

/**
 * Domains allowed to call /api/chat in production.
 * Returns [] when ALLOWED_DOMAIN is unset — check is off. When set, also merges
 * NEXT_PUBLIC_SITE_URL and VERCEL_URL so custom domains and deploy URLs work.
 */
export function getAllowedChatDomains(configuredDomain: string): string[] {
  const trimmed = configuredDomain.trim();
  if (!trimmed) return [];

  const domains = new Set<string>();

  for (const part of trimmed.split(',')) {
    const host = normalizeHost(part);
    if (host) domains.add(host);
  }

  for (const envValue of [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_URL]) {
    const host = normalizeHost(envValue);
    if (host) domains.add(host);
  }

  return [...domains];
}

function isAllowedHost(host: string | null, allowedDomains: string[]): boolean {
  if (!host) return false;
  return allowedDomains.some((allowed) => hostMatchesAllowed(host, allowed));
}

/**
 * True when the request appears to originate from an allowed site.
 * Uses Origin/Referer first; falls back to Fetch Metadata for privacy browsers
 * that strip referrer headers on same-origin requests.
 */
export function isAllowedChatRequest(request: Request, allowedDomains: string[]): boolean {
  if (allowedDomains.length === 0) return true;

  if (isAllowedHost(hostFromHeader(request.headers.get('origin')), allowedDomains)) {
    return true;
  }

  if (isAllowedHost(hostFromHeader(request.headers.get('referer')), allowedDomains)) {
    return true;
  }

  if (request.headers.get('sec-fetch-site') === 'same-origin') {
    try {
      const requestHost = new URL(request.url).hostname.toLowerCase();
      if (isAllowedHost(requestHost, allowedDomains)) return true;
    } catch {
      // ignore malformed request URL
    }
  }

  return false;
}
