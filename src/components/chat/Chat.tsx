'use client';

import { useEffect, useRef } from 'react';
import { usePortfolioChat } from '@/hooks/usePortfolioChat';
import Message from './Message';

/**
 * Chat box under the profile section. Uses RAG via /api/chat.
 * Renders only Message components; no inline message creation.
 */
export default function Chat() {
  const { messages, input, setInput, handleSubmit, isLoading, error } = usePortfolioChat();
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isLoading]);

  const displayMessages = messages.filter((m) => m.role !== 'system');
  const lastIsAssistant =
    displayMessages.length > 0 && displayMessages[displayMessages.length - 1].role === 'assistant';

  return (
    <section className='chat-section w-full flex justify-center px-1 sm:px-3 md:px-6 lg:px-10 mt-10'>
      <div className='chat-inner w-full max-w-[1200px]'>
        <div className='relative rounded-3xl p-[8px] bg-gradient-to-b from-[#4dbdff] to-[#466C8C]'>
          <div className='relative rounded-[22px] bg-[#021728] px-4 sm:px-6 py-4 sm:py-5 shadow-[0_24px_70px_rgba(0,0,0,0.8)]'>
            <div className='mb-3 sm:mb-4 flex items-center justify-between gap-3'>
              <div className='text-[10px] sm:text-xs tracking-[0.28em] uppercase text-white-title/70 font-pixel-mono'>
                Portfolio Chatbox
              </div>
              <div className='hidden sm:flex items-center gap-2 text-[10px] text-white-title/50 font-pixel-mono'>
                <span className='inline-block h-[6px] w-[6px] rounded-full bg-[#4dbdff] shadow-[0_0_12px_rgba(77,189,255,0.9)]' />
                <span>{isLoading ? 'Thinking…' : 'RAG'}</span>
              </div>
            </div>

            <div className='relative min-h-[260px] h-[50vh] sm:h-[55vh] md:h-[60vh] max-h-[640px]'>
              <div className='chat-messages'>
                {error && (
                  <p className='text-sm text-red-400 font-pixel-mono'>
                    {error.message || 'Something went wrong.'}
                  </p>
                )}
                {displayMessages.length === 0 && !isLoading ? (
                  <p className='text-sm sm:text-base text-white-title/75 font-pixel-mono leading-relaxed'>
                    Ask me anything about my work, stack, or experience. I&apos;ll use my portfolio
                    context to answer.
                  </p>
                ) : (
                  displayMessages.map((msg) => (
                    <Message
                      key={msg.id}
                      role={msg.role as 'user' | 'assistant'}
                      content={msg.content}
                      isLoading={
                        msg.role === 'assistant' &&
                        lastIsAssistant &&
                        isLoading &&
                        msg.id === displayMessages[displayMessages.length - 1]?.id
                      }
                    />
                  ))
                )}
                {isLoading && displayMessages.length > 0 && lastIsAssistant === false && (
                  <Message role='assistant' content='' isLoading />
                )}
                <div ref={endOfMessagesRef} />
              </div>

              <form
                onSubmit={handleSubmit}
                className='chat-input-wrap absolute inset-x-0 bottom-0 px-1 pb-1'
              >
                <div className='chat-input-inner relative flex items-center gap-3 rounded-2xl border border-[#4dbdff]/40 bg-[#031b31]/95 px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.9)]'>
                  <input
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Ask me anything about my work, stack, or experience...'
                    className='flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-white-title placeholder:text-white-title/40 font-pixel-mono'
                  />
                  <button
                    type='submit'
                    className='inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4dbdff] to-[#4d8cff] px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-semibold font-pixel-mono text-[#021728] shadow-[0_16px_40px_rgba(0,0,0,0.95)] hover:brightness-110 active:translate-y-px transition-all disabled:opacity-40 disabled:cursor-not-allowed'
                    disabled={!input.trim() || isLoading}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
