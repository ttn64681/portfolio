import { motion } from 'framer-motion';
import type { MenuAction } from '@/types/menu';
import MenuButton from './MenuButton';

export type { MenuAction } from '@/types/menu';

interface MenuOptionsProps {
  startPressed: boolean;
  isExiting: boolean;
  onExitComplete?: () => void;
  onAction?: (action: MenuAction) => void;
}

const MENU_ITEMS: { action: MenuAction; label: string }[] = [
  { action: 'about-me', label: 'About Me' },
  { action: 'projects', label: 'Projects' },
  { action: 'experience', label: 'Experience' },
  { action: 'chat', label: 'Chat' },
  { action: 'quit', label: 'Quit' },
];

export default function MenuOptions({
  startPressed,
  isExiting,
  onExitComplete,
  onAction,
}: MenuOptionsProps) {
  const handleAction = (action: MenuAction) => onAction?.(action);

  if (!startPressed && !isExiting) return null;

  return (
    <>
      <motion.div
        initial={{ translateY: isExiting ? 0 : 300 }}
        animate={{ translateY: isExiting ? 300 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{ willChange: 'translate' }}
        onAnimationComplete={() => isExiting && onExitComplete?.()}
        className='lg:hidden'
      >
        <div
          id='menu-buttons'
          className='static flex flex-col items-center gap-2 md:gap-3 lg:gap-4 mt-8'
        >
          {MENU_ITEMS.map(({ action, label }) => (
            <MenuButton
              key={action}
              label={label}
              isExiting={isExiting}
              onClick={() => handleAction(action)}
              size='sm'
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className='hidden lg:flex fixed top-1/2 lg:right-3.5 xl:right-[12vw] -translate-y-1/2 flex-col items-center gap-4'
        initial={{ translateX: isExiting ? 0 : 300 }}
        animate={{ translateX: isExiting ? 300 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        onAnimationComplete={() => isExiting && onExitComplete?.()}
      >
        {MENU_ITEMS.map(({ action, label }) => (
          <MenuButton
            key={action}
            label={label}
            isExiting={isExiting}
            onClick={() => handleAction(action)}
            size='lg'
          />
        ))}
      </motion.div>
    </>
  );
}
