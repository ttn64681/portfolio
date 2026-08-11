/** Read a corpus vector from Redis (JSON string or object with an embedding array). */
export function parseStoredEmbedding(raw: unknown): number[] | null {
  if (raw == null) return null;
  let parsed: { embedding?: unknown };
  try {
    if (typeof raw === 'string') {
      parsed = JSON.parse(raw) as { embedding?: unknown };
    } else if (typeof raw === 'object') {
      parsed = raw as { embedding?: unknown };
    } else {
      return null;
    }
  } catch {
    return null;
  }
  const emb = parsed.embedding;
  if (!Array.isArray(emb)) return null;
  const nums = emb.filter((x): x is number => typeof x === 'number');
  return nums.length === emb.length && nums.length > 0 ? nums : null;
}
