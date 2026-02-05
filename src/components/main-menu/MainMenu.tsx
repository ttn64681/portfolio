'use client';

import BGFade from './BGFade';
import Splash from './Splash';
import Menu from './Menu';

/**
 * Combines the initial black fade, parallax splash background, and menu
 * so the menu is correctly stacked between the water layer (bg2) and black layer (bg1).
 */
export default function MainMenu() {
  return (
    <>
      <BGFade />
      <Splash>
        <Menu />
      </Splash>
    </>
  );
}
