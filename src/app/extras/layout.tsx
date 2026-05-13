import ExtrasFooterPagerClient from '@/components/nav/ExtrasFooterPagerClient';
import type { ReactNode } from 'react';

/** Wraps `/extras/*`: footer pager + `extras-shell` backdrop (see styles/extras/shell.css). */
export default function ExtrasLayout({ children }: { children: ReactNode }) {
  return (
    <div className='extras-shell'>
      {children}
      <ExtrasFooterPagerClient />
    </div>
  );
}
