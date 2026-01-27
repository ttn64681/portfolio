import { motion } from 'framer-motion';

interface MenuOptionsProps {
  startPressed: boolean;
  isExiting: boolean;
  onExitComplete?: () => void;
}

export default function MenuOptions({ startPressed, isExiting, onExitComplete }: MenuOptionsProps) {
  return (
    <>
      {/* Small-Medium devices */}
      {(startPressed || isExiting) && (
        <motion.div
          initial={{ translateY: isExiting ? 0 : 300 }}
          animate={{ translateY: isExiting ? 300 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          style={{
            willChange: 'translate', // For optimizing performance, GPU and such
          }}
          onAnimationComplete={() => {
            if (isExiting && onExitComplete) onExitComplete();
          }}
        >
          <div
            id='menu-buttons'
            className='lg:hidden static flex flex-col items-center gap-2 md:gap-3 lg:gap-4 mt-8'
          >
            <button
              className='text-white-title text-2xl px-2 md:text-3xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105 
              active:scale-95 active:text-blackground active:bg-white-title bg-transparent hover:bg-[rgba(45,77,118,1)] transition-all duration-200 active:transition-none cursor-pointer'
            >
              <span
                className={`menu-button-white-bg bg-white-title px-2 ${isExiting ? 'menu-button-white-bg-reverse' : ''}`}
              >
                About Me
              </span>
              <span
                className={`absolute inset-0 menu-button ${isExiting ? 'menu-button-reverse' : ''}`}
              >
                About Me
              </span>
            </button>
            <button
              className='text-white-title text-2xl px-2 md:text-3xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105 
              active:scale-95 active:text-blackground active:bg-white-title bg-transparent hover:bg-[rgba(45,77,118,1)] transition-all duration-200 active:transition-none cursor-pointer'
            >
              <span
                className={`menu-button-white-bg bg-white-title px-2 ${isExiting ? 'menu-button-white-bg-reverse' : ''}`}
              >
                Projects
              </span>
              <span
                className={`absolute inset-0 menu-button ${isExiting ? 'menu-button-reverse' : ''}`}
              >
                Projects
              </span>
            </button>
            <button
              className='text-white-title text-2xl px-2 md:text-3xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105 
              active:scale-95 active:text-blackground active:bg-white-title bg-transparent hover:bg-[rgba(45,77,118,1)] transition-all duration-200 active:transition-none cursor-pointer'
            >
              <span
                className={`menu-button-white-bg bg-white-title px-2 ${isExiting ? 'menu-button-white-bg-reverse' : ''}`}
              >
                Extra
              </span>
              <span
                className={`absolute inset-0 menu-button ${isExiting ? 'menu-button-reverse' : ''}`}
              >
                Extra
              </span>
            </button>
            <button
              className='text-white-title text-2xl px-2 md:text-3xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105
              active:scale-95 active:text-blackground active:bg-white-title bg-transparent hover:bg-[rgba(45,77,118,1)] transition-all duration-200 active:transition-none cursor-pointer'
            >
              <span
                className={`menu-button-white-bg bg-white-title px-2 ${isExiting ? 'menu-button-white-bg-reverse' : ''}`}
              >
                Quit
              </span>
              <span
                className={`absolute inset-0 menu-button ${isExiting ? 'menu-button-reverse' : ''}`}
              >
                Quit
              </span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Buttons for large screens */}
      {(startPressed || isExiting) && (
        <motion.div
          className='hidden lg:flex fixed top-1/2 lg:right-3.5 xl:right-[12vw] -translate-y-1/2 flex-col items-center gap-4'
          initial={{ translateX: isExiting ? 0 : 300 }}
          animate={{ translateX: isExiting ? 300 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            if (isExiting && onExitComplete) onExitComplete();
          }}
        >
          <button
            className='text-white-title px-2 text-4xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 
            hover:scale-106 active:scale-95 active:text-blackground active:bg-white-title bg-transparent hover:bg-[rgba(45,77,118,1)] transition-all duration-200 active:transition-none cursor-pointer'
          >
            <span
              className={`menu-button-white-bg bg-white-title px-2 ${isExiting ? 'menu-button-white-bg-reverse' : ''}`}
            >
              About Me
            </span>
            <span
              className={`absolute inset-0 menu-button ${isExiting ? 'menu-button-reverse' : ''}`}
            >
              About Me
            </span>
          </button>
          <button
            className='text-white-title px-2 text-4xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-106 
          active:scale-95 active:text-blackground active:bg-white-title bg-transparent hover:bg-[rgba(45,77,118,1)] transition-all duration-200 active:transition-none cursor-pointer'
          >
            <span
              className={`menu-button-white-bg bg-white-title px-2 ${isExiting ? 'menu-button-white-bg-reverse' : ''}`}
            >
              Projects
            </span>
            <span
              className={`absolute inset-0 menu-button ${isExiting ? 'menu-button-reverse' : ''}`}
            >
              Projects
            </span>
          </button>
          <button
            className='text-white-title px-2 text-4xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-106 
          active:scale-95 active:text-blackground active:bg-white-title bg-transparent hover:bg-[rgba(45,77,118,1)] transition-all duration-200 active:transition-none cursor-pointer'
          >
            <span
              className={`menu-button-white-bg bg-white-title px-2 ${isExiting ? 'menu-button-white-bg-reverse' : ''}`}
            >
              Extra
            </span>
            <span
              className={`absolute inset-0 menu-button ${isExiting ? 'menu-button-reverse' : ''}`}
            >
              Extra
            </span>
          </button>
          <button
            className='text-white-title px-2 text-4xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-106 
          active:scale-95 active:text-blackground active:bg-white-title bg-transparent hover:bg-[rgba(45,77,118,1)] transition-all duration-200 active:transition-none cursor-pointer'
          >
            <span
              className={`menu-button-white-bg bg-white-title px-2 ${isExiting ? 'menu-button-white-bg-reverse' : ''}`}
            >
              Quit
            </span>
            <span
              className={`absolute inset-0 menu-button ${isExiting ? 'menu-button-reverse' : ''}`}
            >
              Quit
            </span>
          </button>
        </motion.div>
      )}
    </>
  );
}
