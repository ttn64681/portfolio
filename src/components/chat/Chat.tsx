'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePortfolioChat } from '@/hooks/usePortfolioChat';
import { buildChatTimeline, type ErrorBlock } from '@/lib/chat-timeline';
import { useBorderPulse } from '@/hooks/useBorderPulse';
import { parseChatError } from '@/lib/chat-error';
import { FUN_FACTS, pickRandom } from '@/data/chat-config';
import type { ClientBlock } from '@/types/chat';
import ResumePopup from './ResumePopup';
import ChatTimeline from './ChatTimeline';

/**
 * Chat box under the profile section. Uses RAG via /api/chat.
 */
export default function Chat() {
  const { messages, input, setInput, handleSubmit, isLoading, isTyping, isTypingFadeOut, error } =
    usePortfolioChat();
  const { isBorderPulsing, triggerPulse } = useBorderPulse();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hasScrolledRef = useRef(false);

  const [introPhase, setIntroPhase] = useState<'idle' | 'loading' | 'done'>('loading');
  const [clientBlocks, setClientBlocks] = useState<ClientBlock[]>([]);
  const [resumePopupOpen, setResumePopupOpen] = useState(false);
  /** Error shown as a single block after an anchor (same rule as resume/fun_fact). Cleared on submit. */
  const [errorBlock, setErrorBlock] = useState<ErrorBlock>(null);

  // On error, show error block
  useEffect(() => {
    if (error) {
      const afterMessageId = messages.length > 0 ? messages[messages.length - 1].id : 'intro';
      setErrorBlock({
        afterMessageId,
        errorCode: parseChatError(error.message).errorCode,
        message: error.message || '',
      });
    }
  }, [error, messages]);

  // Intro bubble loading
  useEffect(() => {
    if (introPhase !== 'loading') return;
    const timer = window.setTimeout(() => setIntroPhase('done'), 600);
    return () => window.clearTimeout(timer);
  }, [introPhase]);

  useEffect(() => {
    inputRef.current?.blur();
  }, []);

  const lastMessageId = messages.length > 0 ? messages[messages.length - 1].id : 'intro';

  const timeline = useMemo(
    () =>
      buildChatTimeline({
        displayMessages: messages,
        clientBlocks,
        errorBlock,
        isLoading,
        isTyping,
        isTypingFadeOut,
      }),
    [messages, clientBlocks, errorBlock, isLoading, isTyping, isTypingFadeOut],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      setErrorBlock(null);
      handleSubmit(e);
    },
    [handleSubmit],
  );

  // On type, trigger border color pulse
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      triggerPulse();
    },
    [setInput, triggerPulse],
  );

  const addResumeBlock = useCallback(() => {
    setClientBlocks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: 'resume_button', afterMessageId: lastMessageId },
    ]);
  }, [lastMessageId]);

  const addFunFactBlock = useCallback(() => {
    setClientBlocks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'fun_fact',
        afterMessageId: lastMessageId,
        text: pickRandom(FUN_FACTS),
      },
    ]);
  }, [lastMessageId]);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true;
      return;
    }
    const container = messagesContainerRef.current;
    if (!container || timeline.length === 0) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - (scrollTop + clientHeight) < 80) {
      container.scrollTop = scrollHeight;
    }
  }, [timeline.length, isLoading]);

  return (
    <section
      id='chat'
      className='chat-section w-full flex flex-col items-center justify-center md:mt-4 mb-20'
    >
      <header className='chat-section__header w-full max-w-[1200px] mb-6'>
        <div className='section-badge-wrap'>
          <h2 className='section-badge section-badge--chat'>Chat</h2>
        </div>
        <p className='chat-section__subtitle font-pixel-mono text-sm text-white-title/80 max-w-xl mt-1'>
          RAG-powered Q&A about my work and experience.
        </p>
      </header>

      <div className='chat-inner w-full max-w-[1200px]'>
        <div className='chat-outer relative p-[.25rem] md:p-[.35rem] lg:p-[.5rem]'>
          <div
            className={`chat-outer__border absolute inset-0 rounded-3xl bg-gradient-to-b from-[#4dbdff] to-[#2a5da0] transition-all duration-300 pointer-events-none ${
              isBorderPulsing ? 'chat-border-pulse' : ''
            }`}
            aria-hidden
          />
          <div className='relative rounded-[22px] bg-[#021728] px-4 sm:px-6 py-4 sm:py-5 shadow-[0_24px_70px_rgba(0,0,0,0.8)] transition-all duration-300'>
            <div className='mb-3 sm:mb-4 flex items-center justify-between gap-3'>
              <div className='text-[10px] sm:text-xs tracking-[0.28em] uppercase text-white-title/70 font-pixel-mono'>
                Portfolio Chatbox
              </div>
              <div className='hidden sm:flex items-center gap-2 text-[12px] text-white-title/50 font-pixel-mono'>
                {isLoading ? (
                  <span className='inline-block h-[7px] w-[7px] rounded-full -top-[1px] bg-[#ffe44d] shadow-[0_0_12px_rgba(255,228,77,0.9)]' />
                ) : errorBlock ? (
                  <span className='inline-block h-[7px] w-[7px] rounded-full -top-[1px] bg-[#ff0000] shadow-[0_0_12px_rgba(255,0,0,0.9)]' />
                ) : (
                  <span className='inline-block h-[7px] w-[7px] rounded-full -mt-[.05rem] bg-[#4dbdff] shadow-[0_0_12px_rgba(77,189,255,0.9)]' />
                )}
                <span>{isLoading ? 'Thinking…' : errorBlock ? 'Error' : 'RAG'}</span>
              </div>
            </div>

            <div className='relative min-h-[260px] h-[50vh] sm:h-[55vh] md:h-[60vh] max-h-[640px]'>
              <div className='chat-messages' ref={messagesContainerRef}>
                <ChatTimeline
                  timeline={timeline}
                  introPhase={introPhase}
                  isTypingFadeOut={isTypingFadeOut}
                  onOpenResume={() => setResumePopupOpen(true)}
                />
                <div className='h-4' />
                <div ref={endOfMessagesRef} />
              </div>

              <form
                onSubmit={onSubmit}
                className='chat-input-wrap absolute inset-x-0 bottom-0 px-1 pb-1'
              >
                <div className='chat-input-inner relative flex items-center gap-3 rounded-2xl border border-[#4dbdff]/40 hover:border-[#4dbdff]/60 bg-[#031b31]/95 px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-all duration-200'>
                  <input
                    type='text'
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Ask me anything...'
                    className='flex-1 bg-transparent outline-none text-xs sm:text-sm text-white-title placeholder:text-white-title/40 font-pixel-mono'
                    ref={inputRef}
                  />
                  <div className='flex items-center gap-2'>
                    <button
                      type='button'
                      className='inline-flex items-center justify-center rounded-full border border-[#4dbdff]/70 bg-[#021728] px-3 py-1.5 text-[11px] sm:text-xs font-pixel-mono text-[#4dbdff] shadow-[0_8px_20px_rgba(0,0,0,0.9)] hover:bg-[#032642] hover:border-[#7fd0ff] hover:scale-105 active:translate-y-px active:scale-100 transition-all'
                      onClick={addFunFactBlock}
                      aria-label='Fun fact'
                    >
                      Fun fact
                    </button>
                    <button
                      type='button'
                      className='inline-flex items-center justify-center rounded-full border border-[#4dbdff]/70 bg-[#021728] px-3 py-1.5 text-[12px] sm:text-sm font-pixel-mono text-[#4dbdff] shadow-[0_8px_20px_rgba(0,0,0,0.9)] hover:bg-[#032642] hover:border-[#7fd0ff] hover:scale-105 active:translate-y-px active:scale-100 transition-all'
                      onClick={addResumeBlock}
                      aria-label='View resume'
                    >
                      <svg
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='text-[#4dbdff]'
                      >
                        <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                        <polyline points='14 2 14 8 20 8' />
                        <line x1='16' y1='13' x2='8' y2='13' />
                        <line x1='16' y1='17' x2='8' y2='17' />
                        <polyline points='10 9 9 9 8 9' />
                      </svg>
                    </button>
                    <button
                      type='submit'
                      className='inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4dbdff] to-[#4d8cff] px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-semibold font-pixel-mono text-[#021728] shadow-[0_16px_40px_rgba(0,0,0,0.95)] hover:brightness-110 hover:scale-105 active:translate-y-px active:scale-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100'
                      disabled={!input.trim() || isLoading}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ResumePopup isOpen={resumePopupOpen} onClose={() => setResumePopupOpen(false)} />
    </section>
  );
}
