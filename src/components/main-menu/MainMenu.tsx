'use client';

import BGFade from './BGFade';
import Splash from './Splash';
import Menu from './Menu';

type MainMenuProps = {
  onQuit?: () => void;
};

/**
 * Combines the initial black fade, parallax splash background, and menu
 * so the menu is correctly stacked between the water layer (bg2) and black layer (bg1).
 */
export default function MainMenu({ onQuit }: MainMenuProps) {
  return (
    <>
      <BGFade />
      <Splash>
        <Menu onQuit={onQuit} />
      </Splash>
    </>
  );
}
