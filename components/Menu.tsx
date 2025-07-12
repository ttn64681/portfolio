import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

export default function Menu() {
  const [echoActive, setEchoActive] = useState(false);
  const [startPressed, setStartPressed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleStartPress = () => {
    if (startPressed) {
      // Starting exit animation
      setIsExiting(true);
      setStartPressed(false);
      // Wait for animation to complete before hiding buttons
      setTimeout(() => {
        setIsExiting(false);
      }, 200); // Match the longest animation duration
    } else if (!startPressed) {
      // Starting enter animation
      setStartPressed(true);
    }
  };

  useEffect(() => {
    // Y Parallax and Scale Effect (based on Splash.tsx component)
    const handleScroll = () => {
      const scaleMult: number = -0.0005;
      const scrollYMult: number = 0.5;

      const scrollY: number = window.scrollY;
      const container: HTMLElement | null = document.getElementById('menu-container');

      if (container) {
        const scale = 1 + scrollY * scaleMult;
        const translateY = scrollY * scrollYMult;

        container.style.transform = `
          translateY(-${translateY}px)
          scale(${scale})
        `;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id='menu-container' className='fixed inset-0 z-5'>
      <div className='flex flex-col justify-center lg:-translate-x-[5vw] xl:translate-x-0 lg:flex-row lg:justify-start w-full h-full items-center'>
        {/* Left side content */}
        <div className='flex flex-col text-center items-center justify-center lg:translate-y-[1.3rem] leading-snug'>
          <h1
            id='menu-title'
            className='mx-6 text-white-title font-bold font-pixel-headline md:text-nowrap md:text-[4rem] text-[3rem] lg:text-[3.5rem] xl:text-[4.5vw] lg:translate-x-[10vw] leading-tight [word-spacing:0.2rem] [text-shadow:0_0_10px_rgba(100,170,3600,.3)] p-3'
          >
            THAI NGUYEN
          </h1>
          <div className='relative lg:translate-x-[25vw]'>
            {/* Echo effect - blurred duplicate text */}
            {echoActive && (
              <>
                {/* First echo */}
                <div
                  className='absolute inset-0 animate-echo text-5xl w-min text-nowrap font-pixel-mono text-[#62d8ff] pointer-events-none'
                  style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
                  onClick={() => handleStartPress()}
                >
                  {startPressed ? '[ Back ]' : '[ Press Start ]'}
                </div>
                {/* Second echo with delay */}
                <div
                  className='absolute inset-0 animate-echo-delayed text-5xl w-min text-nowrap font-pixel-mono text-[#62d8ff] pointer-events-none'
                  style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
                >
                  {startPressed ? '[ Back ]' : '[ Press Start ]'}
                </div>
              </>
            )}
            <button
              className='text-5xl w-min text-nowrap font-pixel-mono text-[#62d8ff] hover:scale-105 duration-200 transition-all cursor-pointer
              active:text-blackground active:scale-95 active:transition-none active:bg-white-title hover:text-white-title active:[text-shadow:0_0_10px_rgba(0,0,0,.4)] 
              [text-shadow:0_0_10px_rgba(100,200,255,.7)] lg:[text-shadow:0_0_10px_rgba(0,0,0,.5)]'
              style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}
              onMouseEnter={() => setEchoActive(true)}
              onMouseLeave={() => setEchoActive(false)}
              onClick={() => handleStartPress()}
            >
              {startPressed ? '[ Back ]' : '[ Press Start ]'}
            </button>
          </div>
          <h3
            className='text-blackground w-min lg:translate-x-[32vw] px-1 text-nowrap bg-white-title text-4xl font-bold font-pixel-retron mt-5 drop-shadow-xs drop-shadow-blue-100'
            style={{ fontSize: 'clamp(1.4rem, 2vw, 2rem)' }}
          >
            <Typewriter
              options={{
                strings: [
                  'Portfolio v1.0.0',
                  'Programmer',
                  'Software Engineer',
                  'Web Developer',
                  'Frontend Dev',
                  'Full Stack Dev',
                  'UI/UX Designer',
                  'Bad Artist',
                  'Bad Musician',
                  'Bad Gamer',
                  'Bad Photographer',
                ],
                autoStart: true,
                loop: true,
                delay: 90,
                deleteSpeed: 30,
              }}
            />
          </h3>
        </div>

        {/* Small devices */}
        {(startPressed || isExiting) && (
          <motion.div
            initial={{ translateY: isExiting ? 0 : 300 }}
            animate={{ translateY: isExiting ? 300 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{
              willChange: 'translate', // For optimizing performance, GPU and such
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
      </div>
    </div>
  );
}
