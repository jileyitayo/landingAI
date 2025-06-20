'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChatPanel } from "./components/chat-panel";
import { CustomizationPanel } from "./components/customization-panel";
import { PreviewPanel } from "./components/preview-panel";
import { LandingPageContent } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import useLandingPageStore from '@/lib/store';

export default function Home() {
  const [draftContent, setDraftContent] = useState<LandingPageContent | null>(null);
  const [niche, setNiche] = useState('');
  
  const { 
    setHero, 
    setHeader, 
    setFooter, 
    setCta,
    setFeatures,
    setTestimonials,
    setFeaturesTitle,
    setTestimonialsTitle
  } = useLandingPageStore();

  useEffect(() => {
    if (draftContent) {
      if (draftContent.header) {
        setHeader({
          logoText: draftContent.header.logo_text || 'Logo',
          menuItems: draftContent.header.menu_items.map((item, index) => ({ id: `${Date.now()}-${index}`, ...item })) || [],
        });
      }
      if (draftContent.hero) {
        const aiHero = draftContent.hero;
        setHero({
          headline: aiHero.headline || 'Your Compelling Headline Here',
          subHeadline: aiHero.sub_headline || 'Supporting subtitle that explains your value proposition',
          backgroundType: aiHero.background_type || 'color',
          backgroundValue: aiHero.background_value || '#6366f1',
          layout: aiHero.layout || 'centered',
          ctaText: aiHero.cta_button?.text || 'Get Started',
          ctaStyle: aiHero.cta_button?.style || 'primary',
          ctaSize: aiHero.cta_button?.size || 'lg',
          valueProposition: aiHero.value_proposition || 'Transform your business with our innovative solution',
          visualUrl: aiHero.visual_element?.url || 'https://picsum.photos/500/500',
          visualType: aiHero.visual_element?.type || 'image',
          enableVisualElement: !!aiHero.visual_element,
        });
      }
      if (draftContent.features) {
        setFeaturesTitle(draftContent.features[0]?.title || 'Features');
        const newFeatures = draftContent.features.map((feature, index) => ({
            id: `${Date.now()}-${index}`,
            title: feature.title || `Feature ${index + 1}`,
            description: feature.description || 'Description for the feature.',
            icon: 'Star'
        }));
        setFeatures(newFeatures);
      }
      if (draftContent.testimonials) {
        setTestimonialsTitle('What Our Customers Say');
        const newTestimonials = draftContent.testimonials.map((testimonial, index) => ({
          id: `${Date.now()}-${index}`,
          quote: testimonial.quote || 'This is an amazing product!',
          authorName: testimonial.author || 'Satisfied Customer',
          authorTitle: 'CEO, Company',
          authorImage: `https://picsum.photos/100?random=${index}`
        }));
        setTestimonials(newTestimonials);
      }
      if (draftContent.cta) {
        setCta({
          headline: draftContent.cta.headline || 'Ready to Get Started?',
          subText: 'Join us now and take your business to the next level.',
          buttonText: draftContent.cta.button_text || 'Sign Up for Free',
          buttonLink: '#',
        });
      }
      if (draftContent.footer) {
        setFooter({
          text: draftContent.footer.text || '© 2024 Your Company. All rights reserved.',
        });
      }
    }
  }, [draftContent, setHero, setHeader, setFooter, setCta, setFeatures, setTestimonials, setFeaturesTitle, setTestimonialsTitle]);

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
