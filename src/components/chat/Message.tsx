'use client';

import PixelPFP from './PixelPFP';
import PixelBubble from './PixelBubble';
import PixelBubbleLoading from './PixelBubbleLoading';
import type { ChatRole } from '@/types/chat';

type MessageProps = {
  role: ChatRole;
  content: string;
  isLoading?: boolean;
};

const ASSISTANT_LABEL = 'Thai Nguyen';
const USER_LABEL = '(You) chill_dude_68';

export default function Message({ role, content, isLoading }: MessageProps) {
  if (role === 'user') {
    return (
      <div className='chat-message chat-message--user'>
        <PixelPFP variant='user' />
        <div className='chat-message__content'>
          <div className='chat-message__label'>{USER_LABEL}</div>
          {isLoading ? (
            <PixelBubbleLoading variant='you' />
          ) : (
            <PixelBubble variant='you'>{content}</PixelBubble>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='chat-message chat-message--assistant'>
      <PixelPFP variant='me' />
      <div className='chat-message__content'>
        <div className='chat-message__label'>{ASSISTANT_LABEL}</div>
        {isLoading ? (
          <PixelBubbleLoading variant='me' />
        ) : (
          <PixelBubble variant='me'>{content}</PixelBubble>
        )}
      </div>
    </div>
  );
}
