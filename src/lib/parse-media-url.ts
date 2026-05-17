/**
 * Parse YouTube / Loom URLs (or bare ids) once at the data layer.
 * Embed components still consume `videoId` / `loomId` only — avoids duplicating iframe URL rules.
 */

const YT_ID = /^[a-zA-Z0-9_-]{11}$/;
/** Loom uses 32-char hex in URLs; some tools show dashed UUID — accept both. */
const LOOM_HEX32 = /^[0-9a-f]{32}$/i;
const LOOM_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isLoomIdSegment(id: string): boolean {
  return LOOM_UUID.test(id) || LOOM_HEX32.test(id);
}

function firstSegmentId(pathname: string): string | undefined {
  const seg = pathname.split('/').filter(Boolean)[0];
  return seg && YT_ID.test(seg) ? seg : undefined;
}

/** Extract 11-char YouTube video id from watch / youtu.be / embed / shorts URLs, or pass through if already an id. */
export function parseYoutubeVideoId(raw: string | undefined | null): string | undefined {
  if (raw == null) return undefined;
  const s = String(raw).trim();
  if (!s) return undefined;
  if (!s.includes('://') && !s.includes('?') && YT_ID.test(s)) return s;

  try {
    const u = new URL(s);
    const host = u.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = firstSegmentId(u.pathname);
      if (id) return id;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      if (u.pathname === '/watch' || u.pathname.startsWith('/watch')) {
        const v = u.searchParams.get('v');
        if (v && YT_ID.test(v)) return v;
      }
      const embed = u.pathname.match(/^\/embed\/([a-zA-Z0-9_-]{11})\/?/);
      if (embed) return embed[1];
      const shorts = u.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]{11})\/?/);
      if (shorts) return shorts[1];
    }
  } catch {
    /* ignore */
  }

  return undefined;
}

/** Extract Loom embed/share UUID from full URLs or pass through a bare UUID. */
export function parseLoomId(raw: string | undefined | null): string | undefined {
  if (raw == null) return undefined;
  const s = String(raw).trim();
  if (!s) return undefined;
  if (!s.includes('://') && isLoomIdSegment(s)) return s;

  try {
    const u = new URL(s);
    const host = u.hostname.replace(/^www\./, '');
    if (host !== 'loom.com') return undefined;
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts[0] === 'share' || parts[0] === 'embed') {
      const id = parts[1];
      if (id && isLoomIdSegment(id)) return id;
    }
  } catch {
    /* ignore */
  }

  return undefined;
}

/** Same as `parseYoutubeVideoId` but throws so bad authoring strings fail at module load / build. */
export function requireYoutubeVideoId(urlOrId: string): string {
  const id = parseYoutubeVideoId(urlOrId);
  if (!id) throw new Error(`[portfolio data] Invalid YouTube URL or id: ${urlOrId}`);
  return id;
}

/** Same as `parseLoomId` but throws. */
export function requireLoomId(urlOrId: string): string {
  const id = parseLoomId(urlOrId);
  if (!id) throw new Error(`[portfolio data] Invalid Loom URL or id: ${urlOrId}`);
  return id;
}

/**
 * Map a single watch URL to `ExploreYoutubeItem` fields (`videoId` xor `loomId`).
 * Prefer pasting the exact link you copied from the browser.
 */
export function watchUrlToEmbedFields(url: string): { videoId?: string; loomId?: string } {
  const loom = parseLoomId(url);
  if (loom) return { loomId: loom };
  const yt = parseYoutubeVideoId(url);
  if (yt) return { videoId: yt };
  throw new Error(`[portfolio data] Not a supported YouTube or Loom URL: ${url}`);
}
