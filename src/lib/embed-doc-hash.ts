import type { Document } from '@/types/chat';
import { sha256 } from './embeddings';

/**
 * Fingerprint of the exact string sent to Gemini for one portfolio document.
 * Must match what `toDocument()` produces (title + tech + body).
 * Used to skip re-embedding when only unrelated docs changed.
 */
export async function documentContentHash(doc: Document): Promise<string> {
  return sha256(`${doc.id}\n${doc.content}`);
}
