import type { Document } from '@/types/chat';

/**
 * Builds one RAG document for the chat corpus.
 *
 * - `id` must stay stable: Redis stores vectors at `rag:embedding:{id}`. Renaming orphans old keys.
 * - Changing title, techStack, or content changes `documentContentHash` → that doc re-embeds on sync.
 * - Title + tech are prepended to `content` so embeddings match stack/role questions.
 */
export function toDocument(
  id: string,
  content: string,
  options?: { title?: string; techStack?: string[]; category?: string },
): Document {
  const parts = [
    options?.title,
    options?.techStack?.length ? `Tech: ${options.techStack.join(', ')}` : null,
    content,
  ].filter(Boolean) as string[];
  return {
    id,
    content: parts.join('. '),
    metadata: options?.category ? { category: options.category } : undefined,
  };
}
