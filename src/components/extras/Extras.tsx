import Link from 'next/link';
import { extrasConfig } from '@/data/extras-config';

/** Homepage section linking into `/extras/*` rooms — tiles pick `extras-tile--${id}` styles from extras.css. */

export default function Extras() {
  return (
    <section id='extras' className='extras-section'>
      <div className='extras-section__inner'>
        <header className='extras-section__header'>
          <div className='section-badge-wrap'>
            <h2 className='section-badge section-badge--extras'>Extras</h2>
          </div>
          <p className='extras-section__subtitle'>
            Side quests — games, music, gallery, and animanga. Each opens its own themed room on the extras
            platform.
          </p>
        </header>
        <div className='extras-section__grid'>
          {extrasConfig.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`extras-tile extras-tile--${item.id} game-block`}
            >
              <span className='extras-tile__label'>{item.label}</span>
              {item.tagline && <span className='extras-tile__tagline'>{item.tagline}</span>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
