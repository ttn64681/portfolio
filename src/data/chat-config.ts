/**
 * Chat UI copy and constants: intro, errors, fun facts.
 * Persona-themed error messages for common cases (env, rate limit, etc.).
 */

export const INTRO_TEXT =
  "Hey, I'm definitely the real Thai Nguyen. Let me prove it- Ask me about my portfolio, tech stack, or what I do for fun!";

export const DEFAULT_ERROR_MESSAGE =
  "Hmm, something on my server side glitched out (could be an unauthorized domain or a temporary hiccup). I can't answer this one, but you can try again in a bit or use the contact links above to reach me directly.";

/** Persona-themed messages keyed by API error code. */
export const ERROR_MESSAGE_BY_CODE: Record<string, string> = {
  rate_limit:
    "Please wait a bit — these free API limits are no joke! Try again in a minute or so.",
  server_error:
    "Something went wrong on my end. Try rephrasing or hit me up via the contact link!",
  unavailable:
    "Search isn't available right now. Try again in a moment or use the contact link.",
  config_error:
    "My brain (read: env vars) isn't wired up on this server yet — so I'm running in demo mode. Hit the contact link and I'll get back to you for real!",
  unauthorized:
    "Looks like you're calling from somewhere my portfolio isn't allowed to chat with. Try opening this site from the right URL, or reach me via the contact link!",
  payload_too_large:
    "That message was a bit too long for my tiny buffer. Shorten it and try again!",
  bad_request:
    "I didn't quite get that — maybe a typo or empty message? Try again or rephrase!",
};

export const FUN_FACTS = [
  "I hand-drew all the pixel art on this site in Aseprite — no asset packs!",
  "This portfolio runs on a 'zero-dollar' stack: Gemini free tier, Upstash Redis, and Vercel.",
  "I once reduced manual study plan creation time by ~90% by wiring up Gemini + YouTube APIs.",
  "Besides code I do pixel art, drums, and game jams. Boss Rush Jam 2025 — we shipped in a weekend.",
] as const;

export function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getFriendlyErrorMessage(errorCode: string | null): string {
  if (errorCode && ERROR_MESSAGE_BY_CODE[errorCode]) return ERROR_MESSAGE_BY_CODE[errorCode];
  return DEFAULT_ERROR_MESSAGE;
}
