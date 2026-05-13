import ExtrasFooterPagerClient from '@/components/nav/ExtrasFooterPagerClient';
import type { ReactNode } from 'react';

/** Shared extras shell: footer pager + `extras-platform` backdrop from CSS import in layout tree. */
export default function ExtrasLayout({ children }: { children: ReactNode }) {
  return (
    <div className='extras-platform'>
      {children}
      <ExtrasFooterPagerClient />
    </div>
  );
}
