'use client';

type PixelBubbleLoadingProps = {
  variant: 'me' | 'you';
};

export default function PixelBubbleLoading({ variant }: PixelBubbleLoadingProps) {
  const modifier = variant === 'me' ? 'chat-bubble--me' : 'chat-bubble--you';
  return (
    <div className={`chat-bubble ${modifier} chat-bubble--loading`}>
      <div className='chat-bubble__inner' aria-live='polite'>
        <div className='chat-loading-dots'>
          <span className='chat-loading-dot chat-loading-dot--1' />
          <span className='chat-loading-dot chat-loading-dot--2' />
          <span className='chat-loading-dot chat-loading-dot--3' />
        </div>
      </div>
    </div>
  );
}
