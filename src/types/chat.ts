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
