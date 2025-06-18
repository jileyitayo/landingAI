'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ChatInput, ChatMessages } from '@/app/components/chat';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const ChatPanel = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiMessage: Message = {
      id: Date.now().toString(),
      text: `This is a simulated response to: "${text}"`,
      isUser: false,
    };
    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Conversational AI</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}; 