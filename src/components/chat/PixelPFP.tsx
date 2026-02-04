'use client';

type PixelPFPProps = {
  variant: 'me' | 'user';
};

export default function PixelPFP({ variant }: PixelPFPProps) {
  const modifier = variant === 'me' ? 'chat-pfp--me' : 'chat-pfp--you';
  return <div className={`chat-pfp ${modifier}`} aria-hidden />;
}
