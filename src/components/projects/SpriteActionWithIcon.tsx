'use client';

import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

/**
 * Visible icon beside the sprite Link/Octocat controls (swap icons later without editing sprites).
 */
type SpriteActionWithIconProps = {
  icon: IconType;
  children: ReactNode;
};

export default function SpriteActionWithIcon({ icon: Icon, children }: SpriteActionWithIconProps) {
  return (
    <span className='sprite-action-with-icon'>
      <span className='sprite-action-with-icon__glyph' aria-hidden>
        <Icon />
      </span>
      <span className='sprite-action-with-icon__sprite'>{children}</span>
    </span>
  );
}
