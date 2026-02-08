'use client';

import { useEffect } from 'react';

type ResumePopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ResumePopup({ isOpen, onClose }: ResumePopupProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-label='Resume viewer'
    >
      <div
        className='relative w-full max-w-[90vw] max-h-[90vh] bg-[#010a14] border border-[#4dbdff]/40 rounded-xl overflow-hidden shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='w-full h-[85vh] min-h-[400px]'>
          <object
            data='/api/resume'
            type='application/pdf'
            width='100%'
            height='100%'
            className='w-full h-full'
          >
            <p className='px-4 py-3 text-sm text-white-title/80 font-pixel-mono'>
              PDF preview is not available in this browser.{' '}
              <a
                href='/api/resume'
                target='_blank'
                rel='noopener noreferrer'
                className='underline text-[#4dbdff]'
              >
                Download the resume here
              </a>
              .
            </p>
          </object>
        </div>
      </div>
    </div>
  );
}
