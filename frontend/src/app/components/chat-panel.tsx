'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ChatInput, ChatMessages } from '@/app/components/chat';
import { LandingPageContent } from '../types';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface ChatPanelProps {
  onDraftGenerated: (content: LandingPageContent) => void;
  niche: string;
}

export const ChatPanel = ({ onDraftGenerated, niche }: ChatPanelProps) => {
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

    try {
      const response = await fetch('http://localhost:8000/api/v1/generate-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: text, niche: niche }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from the API');
      }

      const data = await response.json();
      console.log(data);

      // The AI response is a stringified JSON, so we need to parse it.
      const draftContent = JSON.parse(data.draft_content);
      onDraftGenerated(draftContent);

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: "I've generated a draft for you. You can see it in the preview panel.",
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, something went wrong.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Landing AI</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}; 