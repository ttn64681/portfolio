'use client';

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/ttn64681', ariaLabel: 'GitHub profile' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/thai-tam-minh-nguyen', ariaLabel: 'LinkedIn profile' },
  { label: 'Contact me', href: '#contact', ariaLabel: 'Contact' },
] as const;

export default function Footer() {
  return (
    <footer id='contact' className='site-footer'>
      <div className='site-footer__inner'>
        <nav className='site-footer__nav' aria-label='Footer links'>
          {LINKS.map(({ label, href, ariaLabel }, index) => (
            <span key={label} className='site-footer__link-wrap'>
              {index > 0 && <span className='site-footer__sep' aria-hidden />}
              <a
                href={href}
                className='site-footer__link'
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={ariaLabel}
              >
                {label}
              </a>
            </span>
          ))}
        </nav>
        <p className='site-footer__copy'>© 2026 Thai Nguyen. All rights reserved.</p>
      </div>
    </footer>
  );
}
