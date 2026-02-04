'use client';

import Splash from '../components/main-menu/Splash';
import Menu from '../components/main-menu/Menu';
import BGFade from '../components/main-menu/BGFade';
import Profile from '../components/about-me/Profile';
import Chat from '../components/chat/Chat';
import ProjectsSection from '../components/projects/ProjectsSection';

export default function Home() {
  return (
    <div className='relative w-full min-h-screen bg-blackground'>
      <BGFade />
      <Splash />
      <Menu />

      {/* Main content: above splash so profile/chat are clickable */}
      <div className='relative -top-[105px] w-full min-h-screen flex flex-col justify-center items-center bg-blackground px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-28 z-[20]'>
        {/* About Me: profile section (portrait + dialogue box) */}
        <Profile />
        {/* Chat box: lives directly under the profile section */}
        <Chat />
        {/* Projects section: interactive cards from portfolio.ts */}
        <ProjectsSection />
      </div>
    </div>
  );
}
