'use client';

import { usePathname } from 'next/navigation';
import { getExtrasNavNeighbors } from '@/lib/extras-nav-ring';
import RouteFooterPager from '@/components/nav/RouteFooterPager';

export default function ExtrasFooterPagerClient() {
  const pathname = usePathname() ?? '/';
  const { prev, next } = getExtrasNavNeighbors(pathname);
  return <RouteFooterPager prevHref={prev} nextHref={next} />;
}
