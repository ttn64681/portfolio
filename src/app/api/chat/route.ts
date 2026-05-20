import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { getAllowedChatDomains, isAllowedChatRequest } from '@/lib/chat-auth';
import { getConfig } from '@/lib/config';
import { buildSystemPrompt } from '@/lib/chat-prompts';
import { MAX_BODY_BYTES, MAX_MESSAGE_LENGTH, MAX_MESSAGES_FOR_LLM } from '@/lib/constants';
import { checkRateLimit } from '@/lib/rate-limit';
import { searchSimilarDocuments } from '@/lib/vector-store';
import { portfolioDocuments } from '@/data/config/portfolio';
import type { ChatErrorCode } from '@/lib/chat-error';

/** Structured error body */
function errorResponse(message: string, status: number, code?: ChatErrorCode, retryAfter?: number) {
  const body: { error: string; code?: string; retryAfter?: number } = { error: message };
  if (code) body.code = code;
  if (retryAfter !== undefined) body.retryAfter = retryAfter;
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (retryAfter !== undefined && status === 429) {
    headers['Retry-After'] = String(retryAfter);
  }
  return new Response(JSON.stringify(body), { status, headers });
}

export const runtime = 'edge';

// Get IP from request headers for rate limiting
function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** Text from UI message `parts`, or string `content` if present. */
function getMessageText(msg: { parts?: unknown[]; content?: unknown } | undefined): string {
  if (!msg) return '';
  const parts = msg.parts;
  if (Array.isArray(parts)) {
    const text = parts
      .filter(
        (p): p is { type: string; text?: string } =>
          p != null && typeof p === 'object' && 'type' in p,
      )
      .filter((p) => p.type === 'text' && typeof p.text === 'string')
      .map((p) => p.text!)
      .join('');
    if (text) return text;
  }
  const c = msg.content;
  return typeof c === 'string' ? c : '';
}

/**
 * On chat message request:
 * - Check payload size (too large?)
 * - Get config (env vars)
 * - Check allowed domain ('production' if set)
 * - Get client IP
 * - Check rate limit
 * - Get body
 * - Validate messages
 * - Extract last user message
 * - Search similar documents
 * - Build system prompt
 * - Build model messages
 * - Create Google Generative AI client
 * - Stream text
 */
export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  // console.log('request', request);

  const contentLength = request.headers.get('content-length');
  // console.log('contentLength', contentLength);
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return errorResponse('Payload too large', 413, 'payload_too_large');
  }

  let config: ReturnType<typeof getConfig>;
  try {
    config = getConfig();
  } catch {
    return errorResponse(
      'Chat is not configured (missing env). Use the contact link.',
      503,
      'config_error',
    );
  }

  // Leave ALLOWED_DOMAIN empty in env to disable this check.
  if (process.env.NODE_ENV === 'production') {
    const allowedDomains = getAllowedChatDomains(config.allowedDomain);
    if (allowedDomains.length > 0 && !isAllowedChatRequest(request, allowedDomains)) {
      return errorResponse('Unauthorized', 401, 'unauthorized');
    }
  }

  // Check rate limit
  const ip = getClientIp(request);
  const limitResult = await checkRateLimit(ip);
  if (!limitResult.success) {
    return errorResponse('Too many requests', 429, 'rate_limit', limitResult.retryAfter);
  }

  // Get message body (messages in SDK format)
  let body: { messages?: Array<{ role: string; parts?: unknown[]; content?: unknown }> };
  try {
    body = await request.json();
  } catch {
    return new Response('Bad Request', { status: 400 });
  }

  const messages = body?.messages;
  // Validate messages (too many?)
  if (!Array.isArray(messages) || messages.length > MAX_MESSAGES_FOR_LLM * 2 + 4) {
    return errorResponse('Bad request', 400, 'bad_request');
  }

  // Validate message content (too long?)
  for (const msg of messages) {
    if (getMessageText(msg).length > MAX_MESSAGE_LENGTH) {
      return errorResponse('Message too long', 400, 'bad_request');
    }
  }

  // Extract last user message
  const lastUser = [...messages].reverse().find((m) => m?.role === 'user');
  const queryText = getMessageText(lastUser);
  if (!queryText.trim()) {
    return errorResponse('Bad request', 400, 'bad_request');
  }

  // Get recent messages
  const recentMessages = messages.slice(-MAX_MESSAGES_FOR_LLM);

  let contextBlock: string;
  try {
    // Search for top similar documents
    // RAG: embed query → cosine search in Redis → top doc texts for system prompt.
    // Corpus: portfolioDocuments (src/data/config/rag/). Vectors: Upstash via vector-store.ts.
    // Run `npm run rag:sync` after editing corpus so production skips runtime embed.
    const similar = await searchSimilarDocuments(
      queryText.trim(),
      config.maxRagDocs,
      portfolioDocuments,
    );
    const contentById = new Map(portfolioDocuments.map((d) => [d.id, d.content]));
    // Build context block (similar documents + their content)
    contextBlock = similar
      .map((r) => contentById.get(r.id))
      .filter(Boolean)
      .join('\n\n---\n\n');
    if (contextBlock.length > config.maxContextChars) {
      contextBlock = contextBlock.slice(0, config.maxContextChars) + '…';
    }
  } catch {
    return errorResponse(
      "Search isn't available right now. Please try again in a moment, or use the contact link to reach out directly.",
      503,
      'unavailable',
    );
  }

  // Build system prompt
  const systemMessage = buildSystemPrompt(contextBlock);

  // Build model messages
  const modelMessages = recentMessages.map((msg) => ({
    role: msg.role as 'user' | 'assistant' | 'system',
    content: getMessageText(msg),
  }));

  // Create Google Generative AI client
  let google;
  try {
    google = createGoogleGenerativeAI({ apiKey: config.geminiApiKey });
  } catch {
    return errorResponse(
      "Chat isn't configured right now. Please use the contact link to get in touch.",
      503,
      'unavailable',
    );
  }

  // Create model
  const model = google(config.geminiModel);

  try {
    // Stream text
    const result = streamText({
      model,
      system: systemMessage,
      messages: modelMessages,
    });
    return result.toUIMessageStreamResponse();
  } catch {
    return errorResponse(
      'Something went wrong while answering. Try rephrasing your question or use the contact link if it keeps happening.',
      502,
      'server_error',
    );
  }
}
