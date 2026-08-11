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
  const force = process.argv.includes('--force');
  if (force) {
    console.log('Force mode: re-embedding all documents…');
  }
  console.log(`Syncing ${portfolioDocuments.length} portfolio documents…`);
  const { embedded, skipped } = await syncPortfolioEmbeddings(portfolioDocuments, {
    force,
    onProgress: (done, total, docId) => {
      console.log(`  [${done}/${total}] ${docId}`);
    },
  });
  console.log(`Done. Embedded: ${embedded}, skipped (unchanged): ${skipped}.`);
  if (embedded === 0 && skipped > 0) {
    console.log(
      'Tip: if chat still fails, run `npm run rag:diagnose` — vectors may be missing while hashes match.',
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
