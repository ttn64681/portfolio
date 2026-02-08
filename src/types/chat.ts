/**
 * Shared types for RAG chat: documents, search results, and UI message shape.
 * Keeps API, lib, and components type-safe without depending on SDK internals.
 */

/** Portfolio document shape (data/portfolio.ts and vector-store). */
export type Document = {
  id: string;
  content: string;
  metadata?: Record<string, unknown>;
};

/** Result from vector similarity search (vector-store → route). */
export type SearchResult = {
  id: string;
  score: number;
};

/** Message role for UI (Message component). */
export type ChatRole = 'user' | 'assistant' | 'system';

/** Normalized message for display (role + content; loading state from hook). */
export type ChatMessageDisplay = {
  id: string;
  role: ChatRole;
  content: string;
};

/** Request body for POST /api/chat (messages in SDK format). */
export type ChatRequestBody = {
  messages?: Array<{
    role: string;
    parts?: Array<{ type: string; text?: string }>;
  }>;
};

/** Client-only block inserted after a message (or intro). */
export type ClientBlock =
  | { id: string; type: 'resume_button'; afterMessageId: string }
  | { id: string; type: 'fun_fact'; afterMessageId: string; text: string };

/**
 * Single row in the chat timeline (deterministic order).
 * - Order is fixed: intro → blocks (resume, fun_fact, error) per anchor → messages → loading → typing.
 * - new row types: add a new union variant with a `type` discriminant and handle it in
 *   buildChatTimeline + ChatTimeline so the timeline stays deterministic.
 */
export type ChatTimelineRow =
  | { type: 'intro' }
  | { type: 'message'; id: string; role: ChatRole; content: string; isLoading?: boolean }
  | { type: 'error'; errorCode: string | null; message: string }
  | { type: 'resume_button'; id: string }
  | { type: 'fun_fact'; id: string; text: string }
  | { type: 'loading' }
  | { type: 'typing' };
