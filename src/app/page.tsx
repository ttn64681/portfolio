'use client';

import Splash from '../components/main-menu/Splash';
import Menu from '../components/main-menu/Menu';
import BGFade from '../components/main-menu/BGFade';
import Profile from '../components/about-me/Profile';

export default function Home() {
  return (
    <div className='relative w-full min-h-screen bg-blackground'>
      <BGFade />
      <Splash />
      <Menu />

      {/* Main menu content: first viewport */}
      <div className='relative top-0 w-full min-h-screen flex flex-col justify-center items-center bg-blackground p-60 z-10'>
        <h1 className='text-white-title text-8xl font-bold font-pixelify text-shadow-pixel-large'>
          {' '}
          [ Press Enter ]
        </h1>
        <h2 className='text-white-title text-4xl font-pixel-headline text-shadow-pixel-blue'>
          THAI NGUYEN
        </h2>
        <p className='text-white-title text-2xl font-pixel-mono text-shadow-pixel'>Subtext...</p>
        <p className='text-white-title text-2xl font-pixel-retron text-shadow-pixel'>Subtext...</p>
        <p className='text-white-title text-2xl font-pixel-terminal text-shadow-pixel'>
          Subtext...
        </p>
      </div>

      {/* About Me: profile section (portrait + dialogue box) */}
      <Profile />




    </div>
 
  );
}
