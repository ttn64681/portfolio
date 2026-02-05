'use client';

import { useEffect, useRef, useState } from 'react';
import { usePortfolioChat } from '@/hooks/usePortfolioChat';
import Message from './Message';
import ResumeViewer from './ResumeViewer';

/**
 * Chat box under the profile section. Uses RAG via /api/chat.
 * Renders only Message components; no inline message creation.
 */
export default function Chat() {
  const { messages, input, setInput, handleSubmit, isLoading, isTyping, isTypingFadeOut, error } =
    usePortfolioChat();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Simple intro: show assistant loading bubble briefly, then a static intro message.
  const [introPhase, setIntroPhase] = useState<'idle' | 'loading' | 'done'>('loading');
  const [showResume, setShowResume] = useState(false);
  const [resumeAfterMessageId, setResumeAfterMessageId] = useState<string | null>(null);
  const [borderPulseKey, setBorderPulseKey] = useState(0);
  const [isBorderPulsing, setIsBorderPulsing] = useState(false);
  const borderPulseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (introPhase !== 'loading') return;
    const timer = window.setTimeout(() => {
      setIntroPhase('done');
    }, 400); // quick "thinking" moment before first message
    return () => window.clearTimeout(timer);
  }, [introPhase]);

  // Single border brighten pulse per keypress: brighten then return to normal.
  useEffect(() => {
    if (borderPulseKey === 0) return;
    if (borderPulseTimeoutRef.current !== null) {
      window.clearTimeout(borderPulseTimeoutRef.current);
    }
    setIsBorderPulsing(true);
    borderPulseTimeoutRef.current = window.setTimeout(() => {
      setIsBorderPulsing(false);
      borderPulseTimeoutRef.current = null;
    }, 50);
  }, [borderPulseKey]);

  const hasScrolledRef = useRef(false);

  useEffect(() => {
    // Avoid auto-scrolling the page on first load/refresh.
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true;
      return;
    }

    const container = messagesContainerRef.current;
    if (!container || messages.length === 0) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    // Only auto-scroll when user is already near the bottom to avoid "jumping" the page.
    if (distanceFromBottom < 80) {
      container.scrollTop = scrollHeight;
    }
  }, [messages.length, isLoading]);

  // Avoid auto-focusing the chat input on page load/refresh.
  useEffect(() => {
    inputRef.current?.blur();
  }, []);

  const displayMessages = messages.filter((m) => m.role !== 'system');
  const lastIsAssistant =
    displayMessages.length > 0 && displayMessages[displayMessages.length - 1].role === 'assistant';

  const introText =
    "Hey, I'm definitely the real Thai Nguyen. Let me prove it- Ask me about my portfolio, tech stack, or what I do for fun!";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setBorderPulseKey((prev) => prev + 1);
  };

  return (
    <section
      id='chat'
      className='chat-section w-full flex justify-center px-1 sm:px-3 md:px-6 md:mt-4 lg:px-10 mb-20'
    >
      <div className='chat-inner w-full max-w-[1200px]'>
        <div className='chat-outer relative rounded-3xl p-[8px]'>
          <div
            className={`chat-outer__border absolute inset-0 rounded-3xl bg-gradient-to-b from-[#4dbdff] to-[#466C8C] transition-all duration-300 pointer-events-none ${
              isBorderPulsing ? 'chat-border-pulse' : ''
            }`}
            aria-hidden
          />
          <div className='relative rounded-[22px] bg-[#021728] px-4 sm:px-6 py-4 sm:py-5 shadow-[0_24px_70px_rgba(0,0,0,0.8)] transition-all duration-300'>
            <div className='mb-3 sm:mb-4 flex items-center justify-between gap-3'>
              <div className='text-[10px] sm:text-xs tracking-[0.28em] uppercase text-white-title/70 font-pixel-mono'>
                Portfolio Chatbox
              </div>
              <div className='hidden sm:flex items-center gap-2 text-[10px] text-white-title/50 font-pixel-mono'>
                {/* Status Indicator: Green for ready, Yellow for thinking, Red for error */}
                {isLoading ? (
                  // yellow loading dot
                  <span className='inline-block h-[6px] w-[6px] rounded-full bg-[#ffe44d] shadow-[0_0_12px_rgba(255,228,77,0.9)]' />
                ) : error ? (
                  // red error dot
                  <span className='inline-block h-[6px] w-[6px] rounded-full bg-[#ff0000] shadow-[0_0_12px_rgba(255,0,0,0.9)]' />
                ) : (
                  //  light-blue ready dot
                  <span className='inline-block h-[6px] w-[6px] rounded-full bg-[#4dbdff] shadow-[0_0_12px_rgba(77,189,255,0.9)]' />
                )}
                <span>{isLoading ? 'Thinking…' : error ? 'Error' : 'RAG'}</span>
              </div>
            </div>

            {/* Chat messages container */}
            <div className='relative min-h-[260px] h-[50vh] sm:h-[55vh] md:h-[60vh] max-h-[640px]'>
              <div className='chat-messages' ref={messagesContainerRef}>
                {/* Always show intro message */}
                {introPhase === 'loading' ? (
                  <Message role='assistant' content='' isLoading />
                ) : (
                  <>
                    <Message role='assistant' content={introText} />
                    {/* Show resume after intro if requested before any messages */}
                    {showResume && resumeAfterMessageId === 'intro' && (
                      <>
                        <Message
                          role='assistant'
                          content="Here's my current resume. You can scroll through it below."
                        />
                        <ResumeViewer />
                      </>
                    )}
                  </>
                )}

                {/* User and assistant messages - render in order */}
                {displayMessages.map((msg, index) => {
                  const isLastMessage = index === displayMessages.length - 1;
                  const shouldShowResumeAfterThis =
                    showResume && resumeAfterMessageId === msg.id && msg.role === 'assistant';

                  return (
                    <div key={msg.id}>
                      <Message
                        role={msg.role as 'user' | 'assistant'}
                        content={msg.content}
                        isLoading={
                          msg.role === 'assistant' && lastIsAssistant && isLoading && isLastMessage
                        }
                      />
                      {/* Show resume right after the assistant message that triggered it */}
                      {shouldShowResumeAfterThis && (
                        <>
                          <Message
                            role='assistant'
                            content="Here's my current resume. You can scroll through it below."
                          />
                          <ResumeViewer />
                        </>
                      )}
                    </div>
                  );
                })}

                {/* Assistant loading bubble (when responding to user) — above user typing bubble */}
                {isLoading && displayMessages.length > 0 && lastIsAssistant === false && (
                  <Message role='assistant' content='' isLoading />
                )}

                {/* User typing indicator: show as soon as user types (including on load); always after assistant content; fade out */}
                {(isTyping || isTypingFadeOut) && (
                  <div className={isTypingFadeOut ? 'chat-message-fade-out' : ''}>
                    <Message role='user' content='' isLoading />
                  </div>
                )}
                {/* Friendly, in-character error message instead of a red banner */}
                {error && (
                  <Message
                    role='assistant'
                    content={
                      "Hmm, something on my server side glitched out (could be an unauthorized domain or a temporary hiccup). I can't answer this one, but you can try again in a bit or use the contact links above to reach me directly."
                    }
                  />
                )}
                <div className='h-4' />
                <div ref={endOfMessagesRef} />
              </div>

              <form
                onSubmit={handleSubmit}
                className='chat-input-wrap absolute inset-x-0 bottom-0 px-1 pb-1'
              >
                <div className='chat-input-inner relative flex items-center gap-3 rounded-2xl border border-[#4dbdff]/40 bg-[#031b31]/95 px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-all duration-200'>
                  <input
                    type='text'
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Ask me anything about my work, stack, or experience...'
                    className='flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-white-title placeholder:text-white-title/40 font-pixel-mono'
                    ref={inputRef}
                  />
                  <div className='flex items-center gap-2'>
                    <button
                      type='button'
                      className='inline-flex items-center justify-center rounded-full border border-[#4dbdff]/70 bg-[#021728] px-3 py-1.5 text-[12px] sm:text-sm font-pixel-mono text-[#4dbdff] shadow-[0_8px_20px_rgba(0,0,0,0.9)] hover:bg-[#032642] hover:border-[#7fd0ff] hover:scale-105 active:translate-y-px active:scale-100 transition-all'
                      onClick={() => {
                        // Track the last assistant message ID so resume appears after it
                        const lastMsg = displayMessages[displayMessages.length - 1];
                        if (lastMsg && lastMsg.role === 'assistant') {
                          setResumeAfterMessageId(lastMsg.id);
                        } else {
                          // If no messages yet, use a special marker
                          setResumeAfterMessageId('intro');
                        }
                        setShowResume(true);
                      }}
                      aria-label='View resume'
                    >
                      {/* Document icon SVG */}
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
    </section>
  );
}
