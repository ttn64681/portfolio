/**
 * Parse API error payload from chat (code, retryAfter).
 * Used by usePortfolioChat so hook stays focused on state.
 */

const VALID_CODES = [
  'rate_limit',
  'server_error',
  'unavailable',
  'config_error',
  'unauthorized',
  'payload_too_large',
  'bad_request',
] as const;

export type ChatErrorCode = (typeof VALID_CODES)[number];

export type ParsedChatError = {
  errorCode: ChatErrorCode | null;
  retryAfter: number | undefined;
};

export function parseChatError(message: string | undefined): ParsedChatError {
  if (!message) return { errorCode: null, retryAfter: undefined };
  try {
    const parsed = JSON.parse(message) as { code?: string; retryAfter?: number };
    const code = parsed?.code;
    const valid =
      typeof code === 'string' && (VALID_CODES as readonly string[]).includes(code);
    return {
      errorCode: valid ? (code as ChatErrorCode) : null,
      retryAfter: typeof parsed?.retryAfter === 'number' ? parsed.retryAfter : undefined,
    };
  } catch {
    return { errorCode: null, retryAfter: undefined };
  }
}
