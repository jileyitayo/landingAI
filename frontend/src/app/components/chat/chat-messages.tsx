'use client';

import * as React from 'react';
import { ChatBubble } from '@/app/components/chat/chat-bubble';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
      ))}
      {isLoading && (
        <ChatBubble message="..." isUser={false} isLoading={true} />
      )}
    </div>
  );
}; 