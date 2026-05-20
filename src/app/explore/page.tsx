import ExploreHubClient from '@/components/explore/ExploreHubClient';
import { createPageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = createPageMetadata({
  title: 'Explore',
  description:
    'Deep dives into Thai Nguyen’s projects and experience — full-stack apps, graphics, ML, leadership, and freelance work.',
  path: '/explore',
});

/** `/explore` hub — six tiles + flip lists (`ExploreHubClient`). Suspense avoids searchParams SSR mismatch flash. */
export default function ExploreHubPage() {
  return (
    <Suspense fallback={null}>
      <ExploreHubClient />
    </Suspense>
  );
}
