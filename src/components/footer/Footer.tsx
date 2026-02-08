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
          {LINKS.map(({ label, href, ariaLabel }) => (
            <a
              key={label}
              href={href}
              className='site-footer__link'
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={ariaLabel}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
