/**
 * Inspect Upstash RAG state for the env vars in the current shell.
 *
 * Usage: `. .\env.ps1` then `npm run rag:diagnose`
 */

import { portfolioDocuments } from '../src/data/config/portfolio';
import { RAG_KEYS } from '../src/lib/constants';
import { parseStoredEmbedding } from '../src/lib/embedding-parse';
import { generatePortfolioHash } from '../src/lib/embeddings';
import { getConfig } from '../src/lib/config';
import { getRedis } from '../src/lib/redis';
import { searchSimilarDocuments } from '../src/lib/vector-store';

function maskUrl(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '(invalid url)';
  }
}

async function main() {
  const config = getConfig();
  console.log('Redis host:', maskUrl(config.redisUrl));
  console.log('Embedding model:', config.embeddingModel);
  console.log('Corpus documents:', portfolioDocuments.length);

  const redis = getRedis();
  const docIds = await redis.smembers(RAG_KEYS.DOCUMENT_IDS);
  console.log('Redis document ids:', docIds.length);

  if (docIds.length === 0) {
    console.log('\nNo rag:documents:ids — run `npm run rag:sync` against this Redis DB.');
    process.exit(1);
  }

  const pipeline = redis.pipeline();
  for (const id of docIds) {
    pipeline.get(RAG_KEYS.EMBEDDING(id));
  }
  const rawList = (await pipeline.exec()) as unknown[];

  let loadable = 0;
  for (let i = 0; i < docIds.length; i++) {
    if (parseStoredEmbedding(rawList[i])) loadable++;
  }
  console.log('Loadable embeddings:', loadable, '/', docIds.length);

  const currentHash = await generatePortfolioHash(portfolioDocuments);
  const storedHash = await redis.get(RAG_KEYS.PORTFOLIO_HASH);
  const storedStr =
    typeof storedHash === 'string' ? storedHash : storedHash != null ? String(storedHash) : null;
  console.log('Portfolio hash match:', storedStr === currentHash);

  const unknownIds = docIds.filter((id) => !portfolioDocuments.some((d) => d.id === id));
  if (unknownIds.length > 0) {
    console.log('Orphan Redis ids (not in corpus):', unknownIds.slice(0, 5).join(', '));
  }

  if (loadable === 0) {
    console.log('\nVectors missing but hashes may exist — run `npm run rag:sync -- --force`');
    process.exit(1);
  }

  const query = 'Tell me about the cinema booking project';
  const similar = await searchSimilarDocuments(query, 3, portfolioDocuments);
  console.log('\nTest query:', query);
  console.log(
    'Top matches:',
    similar.map((r) => `${r.id} (${r.score.toFixed(3)})`).join(', ') || '(none)',
  );

  if (similar.length === 0) {
    console.log('\nSearch returned no documents — check Gemini API key and embedding model.');
    process.exit(1);
  }

  console.log('\nRAG looks healthy for this Redis database.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
