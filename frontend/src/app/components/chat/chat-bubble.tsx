import * as React from 'react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isLoading?: boolean;
}

export const ChatBubble = ({ message, isUser, isLoading }: ChatBubbleProps) => {
  const bubbleClasses = cn(
    'px-4 py-2 rounded-lg max-w-xs lg:max-w-md',
    isUser
      ? 'bg-blue-500 text-white self-end'
      : 'bg-gray-200 text-gray-900 self-start',
    isLoading && 'animate-pulse'
  );

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={bubbleClasses}>{message}</div>
    </div>
  );
}; 