import Link from 'next/link';

type RouteFooterPagerProps = {
  prevHref: string;
  nextHref: string;
  prevLabel?: string;
  nextLabel?: string;
};

export default function RouteFooterPager({
  prevHref,
  nextHref,
  prevLabel = 'Previous',
  nextLabel = 'Next',
}: RouteFooterPagerProps) {
  return (
    <nav className='route-footer-pager' aria-label='Section pager'>
      <Link href={prevHref} className='route-footer-pager__btn route-footer-pager__btn--prev'>
        <svg
          width={20}
          height={20}
          viewBox='0 0 24 24'
          aria-hidden
          fill='none'
          stroke='currentColor'
          strokeWidth={2.25}
        >
          <path d='M15 6l-6 6 6 6' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
        <span className='route-footer-pager__txt'>{prevLabel}</span>
      </Link>
      <Link href={nextHref} className='route-footer-pager__btn route-footer-pager__btn--next'>
        <span className='route-footer-pager__txt'>{nextLabel}</span>
        <svg
          width={20}
          height={20}
          viewBox='0 0 24 24'
          aria-hidden
          fill='none'
          stroke='currentColor'
          strokeWidth={2.25}
        >
          <path d='M9 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </Link>
    </nav>
  );
}
