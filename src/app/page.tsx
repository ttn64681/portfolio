'use client';

import { useState } from 'react';
import MainMenu from '../components/main-menu/MainMenu';
import Profile from '../components/about-me/Profile';
import Chat from '../components/chat/Chat';
import Projects from '@/components/projects/Projects';
import Experience from '@/components/experience/Experience';
import Extras from '@/components/extras/Extras';
import GameOverScreen from '@/components/game-over/GameOverScreen';
import Footer from '@/components/footer/Footer';

export default function Home() {
  const [showGameOver, setShowGameOver] = useState(false);

  const handleTryAgain = () => {
    setShowGameOver(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDismissGameOver = () => setShowGameOver(false);

  return (
    <div className='relative w-full min-h-screen bg-blackground flex flex-col'>
      <MainMenu onQuit={() => setShowGameOver(true)} />

      <div className='relative -top-[105px] w-full min-h-screen flex flex-col justify-center items-center bg-blackground px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-20 pb-12 z-[20]'>
        <Profile />
        <Projects />
        <Experience />
        <Chat />
        <Extras onSelect={() => null} />
      </div>

      {showGameOver && (
        <GameOverScreen onTryAgain={handleTryAgain} onDismiss={handleDismissGameOver} />
      )}

      <Footer />
    </div>
  );
}
