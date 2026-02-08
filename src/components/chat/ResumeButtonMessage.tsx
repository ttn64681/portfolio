'use client';

import PixelPFP from './PixelPFP';
import PixelBubble from './PixelBubble';

const ASSISTANT_LABEL = 'Thai Nguyen';

type ResumeButtonMessageProps = {
  onOpenResume: () => void;
};

export default function ResumeButtonMessage({ onOpenResume }: ResumeButtonMessageProps) {
  return (
    <div className='chat-message chat-message--assistant'>
      <PixelPFP variant='me' />
      <div className='chat-message__content'>
        <div className='chat-message__label'>{ASSISTANT_LABEL}</div>
        <PixelBubble variant='me'>
          <button
            type='button'
            onClick={onOpenResume}
            className='flex items-center justify-center gap-2 py-2 px-4 rounded border border-[#4dbdff]/50 bg-[#021728]/80 hover:bg-[#032642] hover:border-[#4dbdff] transition-colors font-pixel-mono text-sm text-[#4dbdff]'
            aria-label='View resume'
          >
            <svg
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='flex-shrink-0'
            >
              <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
              <polyline points='14 2 14 8 20 8' />
              <line x1='16' y1='13' x2='8' y2='13' />
              <line x1='16' y1='17' x2='8' y2='17' />
              <polyline points='10 9 9 9 8 9' />
            </svg>
            <span>View my resume</span>
          </button>
        </PixelBubble>
      </div>
    </div>
  );
}
