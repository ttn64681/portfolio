'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

/**
 * Chat box that lives directly under the profile section.
 * - Wider than the profile area but shrinks responsively.
 * - Blue/cyan vertical gradient border (matching portrait blue tones).
 * - Scrollable history area with enough padding so the floating input
 *   never covers messages.
 * - Clean, modern floating input + send button in white/cyan/blue palette.
 *
 * NOTE: This is just the UI shell for now – no RAG / backend wiring yet.
 */
export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  // Always keep the latest message in view.
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // For now, just echo messages locally. RAG/backend can plug in later.
    setMessages((prev) => [...prev, trimmed]);
    setInput('');
  };

  return (
    <section className='w-full mt-10 flex justify-center px-1 sm:px-3 md:px-6 lg:px-10'>
      {/* Outer width: slightly wider than profile, but clamped for large screens */}
      <div className='w-full max-w-[1200px]'>
        {/* Gradient border shell */}
        <div className='relative rounded-3xl p-[2px] bg-gradient-to-b from-[#4dbdff] to-[#466C8C]'>
          {/* Inner panel */}
          <div className='relative rounded-[22px] bg-[#021728] px-4 sm:px-6 py-4 sm:py-5 shadow-[0_24px_70px_rgba(0,0,0,0.8)]'>
            {/* Header / label */}
            <div className='mb-3 sm:mb-4 flex items-center justify-between gap-3'>
              <div className='text-[10px] sm:text-xs tracking-[0.28em] uppercase text-white-title/70 font-pixel-mono'>
                Portfolio Chatbox
              </div>
              <div className='hidden sm:flex items-center gap-2 text-[10px] text-white-title/50 font-pixel-mono'>
                <span className='inline-block h-[6px] w-[6px] rounded-full bg-[#4dbdff] shadow-[0_0_12px_rgba(77,189,255,0.9)]' />
                <span>Idle · RAG coming soon</span>
              </div>
            </div>

            {/* Scrollable history + floating input
                Use viewport-relative height so it doesn't feel squashed on small screens,
                but still respects larger layouts on desktop. */}
            <div className='relative min-h-[260px] h-[50vh] sm:h-[55vh] md:h-[60vh] max-h-[640px]'>
              {/* Messages area */}
              <div className='h-full overflow-y-auto pr-1 space-y-2 pb-24'>
                {messages.length === 0 ? (
                  <p className='text-sm sm:text-base text-white-title/75 font-pixel-mono leading-relaxed'>
                    Start typing below to send a message. This chat box will soon be wired up to a
                    custom AI assistant that knows my projects, experience, and stack.
                  </p>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className='inline-block max-w-[86%] rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-sm sm:text-base text-white-title/95 font-pixel-mono backdrop-blur-[2px] shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
                    >
                      {msg}
                    </div>
                  ))
                )}
                <div ref={endOfMessagesRef} />
              </div>

              {/* Floating input bar */}
              <form
                onSubmit={handleSubmit}
                className='pointer-events-none absolute inset-x-0 bottom-0 px-1 pb-1'
              >
                <div className='pointer-events-auto relative flex items-center gap-3 rounded-2xl border border-[#4dbdff]/40 bg-[#031b31]/95 px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-sm shadow-[0_20px_40px_rgba(0,0,0,0.9)]'>
                  <input
                    type='text'
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder='Ask me anything about my work, stack, or experience...'
                    className='flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-white-title placeholder:text-white-title/40 font-pixel-mono'
                  />

                  <button
                    type='submit'
                    className='inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4dbdff] to-[#4d8cff] px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-semibold font-pixel-mono text-[#021728] shadow-[0_16px_40px_rgba(0,0,0,0.95)] hover:brightness-110 active:translate-y-px active:shadow-[0_10px_28px_rgba(0,0,0,0.9)] transition-all disabled:opacity-40 disabled:cursor-not-allowed'
                    disabled={!input.trim()}
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
