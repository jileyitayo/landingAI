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
      const response = await fetch('http://localhost:8000/api/generate-landing-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: niche, prompt: text }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Error from API:", response.status, errorBody);
        throw new Error('Failed to generate content');
      }

      const data = await response.json();

      if (!data.draft_content) {
        console.error("Invalid response from API, missing draft_content:", data);
        throw new Error("Invalid response from API");
      }

      const content = JSON.parse(data.draft_content);
      onDraftGenerated(content);

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: "I've generated a draft for you. You can see it in the preview panel.",
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating draft:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Sorry, something went wrong. Please check the console for details.',
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