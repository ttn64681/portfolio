/**
 * Pre-warm Redis with portfolio embeddings (run before deploy or after corpus edits).
 *
 * Usage: `npm run rag:sync` (needs UPSTASH_*, GEMINI_API_KEY, etc. in env)
 *
 * Flow: load portfolioDocuments → syncPortfolioEmbeddings (only changed docs call Gemini).
 * Does not affect query cache keys (`rag:query:embedding:*`).
 */

import { portfolioDocuments } from '../src/data/config/portfolio';
import { syncPortfolioEmbeddings } from '../src/lib/sync-portfolio-embeddings';

async function main() {
  console.log(`Syncing ${portfolioDocuments.length} portfolio documents…`);
  const { embedded, skipped } = await syncPortfolioEmbeddings(portfolioDocuments, {
    onProgress: (done, total, docId) => {
      console.log(`  [${done}/${total}] ${docId}`);
    },
  });
  console.log(`Done. Embedded: ${embedded}, skipped (unchanged): ${skipped}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
