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

  const handleHeroChange = useCallback((heroData: HeroData) => {
    if (draftContent) {
      const updatedContent: LandingPageContent = {
        ...draftContent,
        hero: {
          ...draftContent.hero,
          headline: heroData.headline,
          sub_headline: heroData.subHeadline,
          background_type: heroData.backgroundType,
          background_value: heroData.backgroundValue,
          layout: heroData.layout,
          cta_button: {
            ...draftContent.hero.cta_button,
            text: heroData.ctaText,
            style: heroData.ctaStyle,
            size: heroData.ctaSize,
            href: heroData.ctaLink,
          },
          value_proposition: heroData.valueProposition,
          visual_element: heroData.visualUrl ? {
            type: heroData.visualType,
            url: heroData.visualUrl,
            alt_text: 'Hero visual element'
          } : undefined,
          headline_font_size: heroData.headlineFontSize,
          headline_bold: heroData.headlineBold,
          headline_italic: heroData.headlineItalic,
          sub_headline_font_size: heroData.subHeadlineFontSize,
          background_video_url: heroData.backgroundVideoUrl,
          overlay_color: heroData.overlayColor,
          overlay_opacity: heroData.overlayOpacity,
        }
      };
      setDraftContent(updatedContent);
    }
  }, [draftContent]);

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
                onHeroChange={handleHeroChange}
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
