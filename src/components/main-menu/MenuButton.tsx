type MenuButtonProps = {
  label: string;
  isExiting: boolean;
  onClick: () => void;
  /** Small/medium: text-xl sm:text-2xl md:text-3xl. Large: text-3xl xl:text-4xl */
  size?: 'sm' | 'lg';
};

const BASE_CLASS =
  'text-white-title font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105 active:scale-95 active:text-blackground active:bg-white-title bg-transparent hover:bg-[rgba(45,84,140,1)] transition-all duration-200 active:transition-none cursor-pointer';

const SIZE_CLASS = {
  sm: 'text-xl sm:text-2xl px-2 md:text-3xl hover:scale-105',
  lg: 'px-2 text-3xl xl:text-4xl hover:scale-106',
};

export default function MenuButton({ label, isExiting, onClick, size = 'sm' }: MenuButtonProps) {
  return (
    <button
      type='button'
      className={`relative ${BASE_CLASS} ${SIZE_CLASS[size]}`}
      onClick={onClick}
    >
      <span
        className={`menu-button-white-bg bg-white-title px-2 ${isExiting ? 'menu-button-white-bg-reverse' : ''}`}
      >
        {label}
      </span>
      <span className={`absolute inset-0 menu-button ${isExiting ? 'menu-button-reverse' : ''}`}>
        {label}
      </span>
    </button>
  );
}
