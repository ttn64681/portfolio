/**
 * Chat UI copy and constants: intro, errors, fun facts.
 * Persona-themed error messages for common cases (env, rate limit, etc.).
 */

export const INTRO_TEXT =
  "Hey, I'm definitely the real Thai Nguyen. Let me prove it- Ask me about my portfolio, apps, tech\
  stacks, game jams, 3D designs, or what I do for fun :P";

export const DEFAULT_ERROR_MESSAGE =
  "Hmm, something on my server side glitched out (could be an unauthorized domain or a temporary hiccup).\
  I can't answer this one, but you can try again in a bit or use the contact links (which I haven't\
  implemented yet) above to reach me directly.";

/** Persona-themed messages keyed by API error code. */
export const ERROR_MESSAGE_BY_CODE: Record<string, string> = {
  rate_limit:
    'Please wait a bit - these free API limits are no joke... Try again in a minute or so.',
  server_error:
    "I woke up from a revelatory dream where a mysterious voice whispered to me, \
  '404: SERVER ERROR'. Try rephrasing or hit me up via my contacts.",
  unavailable: "Sorry, I'm not available right now. Try again in a moment or use my contacts.",
  config_error:
    "I woke up from a revelatory dream where a mysterious voice whispered to me, 'CONFIGURATION ERROR'. \
    So unfortunately, I cannot answer you right now. Try again in a bit or use my contacts.",
  unauthorized:
    "Looks like you're calling from an unauthorized domain. Try opening this site from the right URL, \
    or reach me via my contacts.",
  payload_too_large:
    'That message was a bit too long for my brain to keep track of. Shorten it and try again!',
  bad_request: "I didn't quite get that - maybe a typo or empty message? Try again or rephrase.",
};

export const FUN_FACTS = [
  'All the pixel art on this site was hand-drawn in Aseprite by me.',
  "This portfolio runs on a 'zero-dollar' stack: Gemini free tier, Upstash Redis, and Vercel.",
  'My final project in Computer Graphics was based on Jujutsu Kaisen Domains. You should check it out\
  (beware performance issues).',
  'Besides code I do pixel art, drums, and game jams.',
  'It took me a whole week+ just to compile all my portfolio materials for the explore/extras pages.',
  "If you're reading this, I currently have one more class to take (Networks) over the Summer :O",
  'I was originally an Intended Electrical Engineer my freshman year. I only switched to CS the following Summer (2023)',
  'I designed a new mascot + merch stickers for ACM at my University!',
  'I worked on a website for Holywatr, one of my favorite new bands to come out of Atlanta. Pretty crazy, I know.',
] as const;

export function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getFriendlyErrorMessage(errorCode: string | null): string {
  if (errorCode && ERROR_MESSAGE_BY_CODE[errorCode]) return ERROR_MESSAGE_BY_CODE[errorCode];
  return DEFAULT_ERROR_MESSAGE;
}
