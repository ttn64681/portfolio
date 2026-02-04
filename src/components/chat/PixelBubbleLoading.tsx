'use client';

type PixelBubbleLoadingProps = {
  variant: 'me' | 'you';
};

export default function PixelBubbleLoading({ variant }: PixelBubbleLoadingProps) {
  const modifier = variant === 'me' ? 'chat-bubble--me' : 'chat-bubble--you';
  return (
    <div className={`chat-bubble ${modifier} chat-bubble--loading`}>
      <div className='chat-bubble__inner chat-bubble-loading-dots' aria-live='polite'>
        {' '}
      </div>
    </div>
  );
}
