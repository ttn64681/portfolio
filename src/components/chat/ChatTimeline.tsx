'use client';

import type { ChatTimelineRow } from '@/types/chat';
import { INTRO_TEXT, getFriendlyErrorMessage } from '@/data/chat-config';
import Message from './Message';
import ResumeButton from './ResumeButton';

type ChatTimelineProps = {
  timeline: ChatTimelineRow[];
  introPhase: 'idle' | 'loading' | 'done';
  isTypingFadeOut: boolean;
  onOpenResume: () => void;
};

/**
 * Renders the ordered chat timeline (intro, messages, client blocks, error, loading, typing).
 * Isolated so Chat.tsx focuses on state and form.
 */
export default function ChatTimeline({
  timeline,
  introPhase,
  isTypingFadeOut,
  onOpenResume,
}: ChatTimelineProps) {
  return (
    <>
      {timeline.map((row) => {
        if (row.type === 'intro') {
          return introPhase === 'loading' ? (
            <Message key='intro-loading' role='assistant' content='' isLoading />
          ) : (
            <Message key='intro' role='assistant' content={INTRO_TEXT} />
          );
        }
        if (row.type === 'message') {
          return (
            <Message key={row.id} role={row.role} content={row.content} isLoading={row.isLoading} />
          );
        }
        if (row.type === 'error') {
          const friendlyMessage = getFriendlyErrorMessage(row.errorCode);
          return <Message key='error' role='assistant' content={friendlyMessage} />;
        }
        if (row.type === 'resume_button') {
          return <ResumeButton key={row.id} onOpenResume={onOpenResume} />;
        }
        if (row.type === 'fun_fact') {
          return <Message key={row.id} role='assistant' content={row.text} />;
        }
        if (row.type === 'loading') {
          return <Message key='loading' role='assistant' content='' isLoading />;
        }
        if (row.type === 'typing') {
          return (
            <div key='typing' className={isTypingFadeOut ? 'chat-message-fade-out' : ''}>
              <Message role='user' content='' isLoading />
            </div>
          );
        }
        return null;
      })}
    </>
  );
}
