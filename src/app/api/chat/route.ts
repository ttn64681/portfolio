import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { getConfig } from '@/lib/config';
import { buildSystemPrompt } from '@/lib/chat-prompts';
import { MAX_BODY_BYTES, MAX_MESSAGE_LENGTH, MAX_MESSAGES_FOR_LLM } from '@/lib/constants';
import { checkRateLimit } from '@/lib/rate-limit';
import { searchSimilarDocuments } from '@/lib/vector-store';
import { portfolioDocuments } from '@/data/portfolio';
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

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function extractContentFromParts(parts: unknown): string {
  if (!Array.isArray(parts)) return '';
  return parts
    .filter(
      (p): p is { type: string; text?: string } =>
        p != null && typeof p === 'object' && 'type' in p,
    )
    .filter((p) => p.type === 'text' && typeof p.text === 'string')
    .map((p) => p.text!)
    .join('');
}

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const contentLength = request.headers.get('content-length');
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

  if (process.env.NODE_ENV === 'production') {
    if (config.allowedDomain) {
      const referer = request.headers.get('referer');
      if (!referer || !referer.includes(config.allowedDomain)) {
        return errorResponse('Unauthorized', 401, 'unauthorized');
      }
    }
  }

  const ip = getClientIp(request);
  const limitResult = await checkRateLimit(ip);
  if (!limitResult.success) {
    return errorResponse('Too many requests', 429, 'rate_limit', limitResult.retryAfter);
  }

  let body: { messages?: Array<{ role: string; parts?: unknown[] }> };
  try {
    body = await request.json();
  } catch {
    return new Response('Bad Request', { status: 400 });
  }

  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length > MAX_MESSAGES_FOR_LLM * 2 + 4) {
    return errorResponse('Bad request', 400, 'bad_request');
  }

  for (const msg of messages) {
    const content = extractContentFromParts(msg?.parts);
    if (content.length > MAX_MESSAGE_LENGTH) {
      return errorResponse('Message too long', 400, 'bad_request');
    }
  }

  const lastUser = [...messages].reverse().find((m) => m?.role === 'user');
  const queryText = lastUser ? extractContentFromParts(lastUser.parts) : '';
  if (!queryText.trim()) {
    return errorResponse('Bad request', 400, 'bad_request');
  }

  const recentMessages = messages.slice(-MAX_MESSAGES_FOR_LLM);

  let contextBlock: string;
  try {
    const similar = await searchSimilarDocuments(
      queryText.trim(),
      config.maxRagDocs,
      portfolioDocuments,
    );
    const contentById = new Map(portfolioDocuments.map((d) => [d.id, d.content]));
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

  const systemMessage = buildSystemPrompt(contextBlock);

  const modelMessages = recentMessages.map((msg) => ({
    role: msg.role as 'user' | 'assistant' | 'system',
    content: extractContentFromParts(msg.parts),
  }));

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

  const model = google(config.geminiModel);

  try {
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
