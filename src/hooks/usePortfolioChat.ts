'use client';

import { useCallback, useMemo, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { ChatMessageDisplay, ChatRole } from '@/types/chat';

function getMessageContent(message: { parts?: unknown[] }): string {
  const parts = message.parts ?? [];
  return parts
    .filter(
      (p): p is { type: string; text?: string } =>
        typeof p === 'object' && p != null && 'type' in p,
    )
    .filter((p) => p.type === 'text' && typeof p.text === 'string')
    .map((p) => p.text!)
    .join('');
}

function getMessageRole(role: string): ChatRole {
  if (role === 'user' || role === 'assistant' || role === 'system') return role;
  return 'user';
}

export function usePortfolioChat() {
  const [input, setInput] = useState('');

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const displayMessages: ChatMessageDisplay[] = useMemo(() => {
    return messages.map((m) => ({
      id: m.id,
      role: getMessageRole(m.role),
      content: getMessageContent(m),
    }));
  }, [messages]);

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || isLoading) return;
      sendMessage({ text: trimmed });
      setInput('');
    },
    [input, isLoading, sendMessage],
  );

  return {
    messages: displayMessages,
    input,
    setInput,
    handleSubmit,
    status,
    error,
    isLoading,
  };
}
