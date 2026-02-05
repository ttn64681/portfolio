import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { getConfig } from '@/lib/config';
import { buildSystemPrompt } from '@/lib/chat-prompts';
import {
  MAX_BODY_BYTES,
  MAX_MESSAGE_LENGTH,
  MAX_MESSAGES_FOR_LLM,
} from '@/lib/constants';
import { checkRateLimit } from '@/lib/rate-limit';
import { searchSimilarDocuments } from '@/lib/vector-store';
import { portfolioDocuments } from '@/data/portfolio';

/** User-facing error message and HTTP status for known failure modes. */
function errorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
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
    return new Response('Payload Too Large', { status: 413 });
  }

  if (process.env.NODE_ENV === 'production') {
    const allowedDomain = getConfig().allowedDomain;
    if (allowedDomain) {
      const referer = request.headers.get('referer');
      if (!referer || !referer.includes(allowedDomain)) {
        return new Response('Unauthorized', { status: 401 });
      }
    }
  }

  const ip = getClientIp(request);
  const limitResult = await checkRateLimit(ip);
  if (!limitResult.success) {
    return new Response(
      JSON.stringify({ error: 'Too many requests', retryAfter: limitResult.retryAfter }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(limitResult.retryAfter),
        },
      },
    );
  }

  let body: { messages?: Array<{ role: string; parts?: unknown[] }> };
  try {
    body = await request.json();
  } catch {
    return new Response('Bad Request', { status: 400 });
  }

  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length > MAX_MESSAGES_FOR_LLM * 2 + 4) {
    return new Response('Bad Request', { status: 400 });
  }

  for (const msg of messages) {
    const content = extractContentFromParts(msg?.parts);
    if (content.length > MAX_MESSAGE_LENGTH) {
      return new Response('Bad Request', { status: 400 });
    }
  }

  const lastUser = [...messages].reverse().find((m) => m?.role === 'user');
  const queryText = lastUser ? extractContentFromParts(lastUser.parts) : '';
  if (!queryText.trim()) {
    return new Response('Bad Request', { status: 400 });
  }

  const config = getConfig();
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
      "Something went wrong while answering. Try rephrasing your question or use the contact link if it keeps happening.",
      502,
    );
  }
}
