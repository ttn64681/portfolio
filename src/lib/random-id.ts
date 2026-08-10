/**
 * Unique ids for client-only UI state (chat blocks, buttons).
 * Prefer crypto.randomUUID when available; fall back on HTTP staging where the browser
 * blocks randomUUID outside a secure context (https:// or localhost).
 */
export function randomId(): string {
  // `crypto` is a built-in Web API in browsers (like `window` or `document`).
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID();
    } catch {
      // randomUUID throws on plain http:// LAN URLs (e.g. Proxmox VM IP).
    }
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
