import { useEffect, useState, useCallback } from 'react';
import Typewriter from 'typewriter-effect';
import { BREAKPOINTS } from '@/lib/breakpoints';
import MenuOptions, { type MenuAction } from './MenuOptions';

type MenuProps = {
  /** Called when user clicks Quit (so page can show Game Over overlay). */
  onQuit?: () => void;
};

export default function Menu({ onQuit }: MenuProps) {
  const [echoActive, setEchoActive] = useState(false);
  const [startPressed, setStartPressed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleStartPress = () => {
    if (startPressed) {
      setIsExiting(true);
      setStartPressed(false);
    } else {
      setStartPressed(true);
    }
  };

  const handleExitComplete = () => {
    setIsExiting(false);
  };

  const handleMenuAction = useCallback(
    (action: MenuAction) => {
      if (action === 'quit') {
        setIsExiting(true);
        setStartPressed(false);
        onQuit?.();
        return;
      }
      const sectionId = action === 'experience' ? 'about-me' : action;
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    },
    [onQuit],
  );

  useEffect(() => {
    const scaleMult = -0.0005;
    const scrollYMult = 0.5;

    const handleScroll = () => {
      const container = document.getElementById('menu-container');
      if (!container) return;

      const isMobile = window.innerWidth <= BREAKPOINTS.mobile;
      if (isMobile) {
        container.style.transform = 'translateY(0) scale(1)';
        return;
      }

      const scrollY = window.scrollY;
      const scale = 1 + scrollY * scaleMult;
      const translateY = scrollY * scrollYMult;
      container.style.transform = `translateY(-${translateY}px) scale(${scale})`;
    };

    const onResize = () => handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', onResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div id='menu-container' className='fixed inset-0 z-40'>
      <div className='flex flex-col justify-center lg:-translate-x-[5vw] xl:translate-x-0 lg:flex-row lg:justify-start w-full h-full items-center'>
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
                  'Portfolio v1.3.1',
                  'Programmer',
                  'Software Engineer',
                  'Web Developer',
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

        <MenuOptions
          startPressed={startPressed}
          isExiting={isExiting}
          onExitComplete={handleExitComplete}
          onAction={handleMenuAction}
        />
      </div>
    </div>
  );
}
