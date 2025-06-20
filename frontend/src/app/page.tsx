'use client';

import { useState, useCallback } from 'react';
import { ChatPanel } from "./components/chat-panel";
import { CustomizationPanel } from "./components/customization-panel";
import { PreviewPanel } from "./components/preview-panel";
import { LandingPageContent, HeroData } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

export default function Home() {
  const [draftContent, setDraftContent] = useState<LandingPageContent | null>(null);
  const [niche, setNiche] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 h-screen bg-gray-50 dark:bg-gray-900">
      <div className="lg:col-span-1 h-full flex flex-col">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="flex-1 overflow-auto">
            <ChatPanel onDraftGenerated={setDraftContent} niche={niche} />
          </TabsContent>
          <TabsContent value="customize" className="flex-1 overflow-auto">
              <CustomizationPanel 
                onNicheChange={setNiche} 
                aiGeneratedContent={draftContent}
              />
          </TabsContent>
        </Tabs>
      </div>
      <div className="lg:col-span-2 h-full">
        <PreviewPanel content={draftContent} />
      </div>
    </div>
  );
}
