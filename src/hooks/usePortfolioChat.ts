'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingFadeOut, setIsTypingFadeOut] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeOutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Track typing activity based on input changes.
  useEffect(() => {
    // Clear any existing timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = null;
    }

    if (input.trim().length === 0) {
      // Start fade out if currently typing
      if (isTyping) {
        setIsTypingFadeOut(true);
        fadeOutTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setIsTypingFadeOut(false);
        }, 300);
      }
      return;
    }

    // User is typing - clear fade out and show typing indicator
    setIsTypingFadeOut(false);
    setIsTyping(true);

    // After 800ms of no typing, start fade out
    typingTimeoutRef.current = setTimeout(() => {
      setIsTypingFadeOut(true);
      fadeOutTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setIsTypingFadeOut(false);
      }, 300);
    }, 800);
  }, [input, isTyping]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || isLoading) return;
      sendMessage({ text: trimmed });
      setInput('');
      setIsTyping(false);
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
    isTyping: isTyping || isTypingFadeOut,
    isTypingFadeOut,
  };
}
