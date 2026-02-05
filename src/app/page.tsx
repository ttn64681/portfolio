'use client';

import MainMenu from '../components/main-menu/MainMenu';
import Profile from '../components/about-me/Profile';
import Chat from '../components/chat/Chat';
import Projects from '@/components/projects/Projects';

export default function Home() {
  return (
    <div className='relative w-full min-h-screen bg-blackground'>
      <MainMenu />

      <div className='relative -top-[105px] w-full min-h-screen flex flex-col justify-center items-center bg-blackground px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-28 z-[20]'>
        <div id='about-me'>
          <Profile />
        </div>
        <Projects />
        <Chat />
      </div>
    </div>
  );
}
