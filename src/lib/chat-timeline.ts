/**
 * Build the ordered chat timeline (intro → messages + client blocks → loading → typing).
 * All blocks (resume, fun_fact, error) follow the same rule: they are appended after a given
 * anchor (intro or a message id). One sequential pass; no special "sticky" error state.
 */

import type { ChatMessageDisplay, ChatTimelineRow, ClientBlock } from '@/types/chat';

/** Single error "block" pinned to an anchor, same as resume/fun_fact. Cleared when user sends again. */
export type ErrorBlock = {
  afterMessageId: string;
  errorCode: string | null;
  message: string;
} | null;

export type BuildTimelineParams = {
  displayMessages: ChatMessageDisplay[];
  clientBlocks: ClientBlock[];
  errorBlock: ErrorBlock;
  isLoading: boolean;
  isTyping: boolean;
  isTypingFadeOut: boolean;
};

export function buildChatTimeline({
  displayMessages,
  clientBlocks,
  errorBlock,
  isLoading,
  isTyping,
  isTypingFadeOut,
}: BuildTimelineParams): ChatTimelineRow[] {
  const rows: ChatTimelineRow[] = [];
  const lastIsAssistant =
    displayMessages.length > 0 && displayMessages[displayMessages.length - 1].role === 'assistant';

  rows.push({ type: 'intro' });
  clientBlocks
    .filter((b) => b.afterMessageId === 'intro')
    .forEach((b) => {
      if (b.type === 'resume_button') rows.push({ type: 'resume_button', id: b.id });
      else if (b.type === 'fun_fact') rows.push({ type: 'fun_fact', id: b.id, text: b.text });
    });
  if (errorBlock?.afterMessageId === 'intro') {
    rows.push({ type: 'error', errorCode: errorBlock.errorCode, message: errorBlock.message });
  }

  displayMessages.forEach((msg, idx) => {
    const isLast = idx === displayMessages.length - 1;
    rows.push({
      type: 'message',
      id: msg.id,
      role: msg.role,
      content: msg.content,
      isLoading:
        msg.role === 'assistant' && lastIsAssistant && isLoading && isLast,
    });
    if (errorBlock?.afterMessageId === msg.id) {
      rows.push({ type: 'error', errorCode: errorBlock.errorCode, message: errorBlock.message });
    }
    clientBlocks
      .filter((b) => b.afterMessageId === msg.id)
      .forEach((b) => {
        if (b.type === 'resume_button') rows.push({ type: 'resume_button', id: b.id });
        else if (b.type === 'fun_fact') rows.push({ type: 'fun_fact', id: b.id, text: b.text });
      });
  });

  if (
    isLoading &&
    (displayMessages.length === 0 || displayMessages[displayMessages.length - 1].role !== 'assistant')
  ) {
    rows.push({ type: 'loading' });
  }
  if (isTyping || isTypingFadeOut) rows.push({ type: 'typing' });
  return rows;
}
