'use client';

import * as React from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = React.useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="flex w-full items-center space-x-2 p-4 border-t">
      <Input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" size="icon" onClick={handleSendMessage} disabled={isLoading}>
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}; 