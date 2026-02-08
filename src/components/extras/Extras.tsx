'use client';

import { useState } from 'react';
import { extrasConfig } from '@/data/extras-config';
import type { ExtraCategory } from '@/types/extras';

type ExtrasProps = {
  /** Called when a sneak peek is clicked. */
  onSelect?: (category: ExtraCategory) => void;
};

export default function Extras({ onSelect }: ExtrasProps) {
  const [selected, setSelected] = useState<ExtraCategory | null>(null);

  const handleClick = (id: ExtraCategory) => {
    setSelected(id);
    onSelect?.(id);
  };

  return (
    <section id='extras' className='extras-section'>
      <div className='extras-section__inner'>
        <header className='extras-section__header'>
          <div className='section-badge-wrap'>
            <h2 className='section-badge section-badge--extras'>Extras</h2>
          </div>
          <p className='extras-section__subtitle'>
            A sneak peek — games, music, drawings, and photos.
          </p>
        </header>
        <div className='extras-section__grid'>
          {extrasConfig.map((item) => (
            <button
              key={item.id}
              type='button'
              className={`extras-tile extras-tile--${item.id} game-block ${selected === item.id ? 'extras-tile--active' : ''}`}
              onClick={() => handleClick(item.id)}
              aria-label={`Open ${item.label} sneak peek`}
            >
              <span className='extras-tile__label'>{item.label}</span>
              {item.tagline && (
                <span className='extras-tile__tagline'>{item.tagline}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
