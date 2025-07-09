import { motion } from 'framer-motion';

export default function Menu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 10, duration: 1 }}
    >
      <div className='fixed flex flex-col justify-center lg:flex-row lg:justify-start w-full h-full items-center z-5 '>
        {/* Left side content */}
        <div className='flex flex-col text-center items-center justify-center lg:translate-y-[1.3rem] leading-snug'>
          <h1
            className='mx-6 text-white-title font-bold font-pixel-headline md:text-nowrap lg:translate-x-[10vw] leading-tight [word-spacing:0.2rem] [text-shadow:0_0_10px_rgba(100,170,3600,.3)] p-3'
            style={{ fontSize: 'clamp(3.1rem, 5.5vw, 3.5rem)' }}
          >
            THAI NGUYEN
          </h1>
          <h2
            className='text-white-title text-5xl lg:translate-x-[25vw] w-min text-nowrap font-pixel-mono'
            style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
          >
            [&nbsp;Press Start&nbsp;]
          </h2>
          <h3
            className='text-blackground w-min lg:translate-x-[32vw] px-1 text-nowrap bg-white-title text-4xl font-bold font-pixel-retron mt-5 drop-shadow-xs drop-shadow-blue-100'
            style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)' }}
          >
            Portfolio v1.0.0
          </h3>
        </div>

        {/* Buttons for small/medium screens - show below title */}
        <div className='lg:hidden static flex flex-col items-center gap-4 mt-8'>
          <button className='text-white-title text-2xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105 transition-transform'>
            Option 1
          </button>
          <button className='text-white-title text-2xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105 transition-transform'>
            Option 2
          </button>
          <button className='text-white-title text-2xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105 transition-transform'>
            Option 3
          </button>
        </div>
      </div>

      {/* Right side buttons - positioned absolutely on large screens */}
      <div className='hidden lg:flex fixed top-1/2 right-[10vw] -translate-y-1/2 flex-col items-center gap-4 z-5'>
        <button className='text-white-title bg-[rgba(45,77,118,1)] px-2 text-4xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105 transition-transform'>
          About Me
        </button>
        <button className='text-white-title text-4xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105 transition-transform'>
          Projects
        </button>
        <button className='text-white-title text-4xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105 transition-transform'>
          Extra
        </button>
        <button className='text-white-title text-4xl font-bold font-pixel-retron drop-shadow-xs drop-shadow-blue-100 hover:scale-105 transition-transform'>
          Quit
        </button>
      </div>
    </motion.div>
  );
}
