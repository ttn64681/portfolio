import ExploreHubClient from '@/components/explore/ExploreHubClient';
import { Suspense } from 'react';

/** `/explore` hub — six tiles + flip lists (`ExploreHubClient`). Suspense avoids searchParams SSR mismatch flash. */
export default function ExploreHubPage() {
  return (
    <Suspense fallback={null}>
      <ExploreHubClient />
    </Suspense>
  );
}
