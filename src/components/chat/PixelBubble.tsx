'use client';

import type { ReactNode } from 'react';

type PixelBubbleProps = {
  variant: 'me' | 'you';
  children: ReactNode;
};

export default function PixelBubble({ variant, children }: PixelBubbleProps) {
  const modifier = variant === 'me' ? 'chat-bubble--me' : 'chat-bubble--you';
  return (
    <div className={`chat-bubble ${modifier}`}>
      <div className='chat-bubble__inner'>{children}</div>
    </div>
  );
}
