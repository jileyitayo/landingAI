import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { LandingPageContent, HeroData } from "../types";
import { HeroCustomization } from "@/app/components/customization-section/hero-customization";

interface CustomizationPanelProps {
  onNicheChange: (niche: string) => void;
  onHeroChange?: (heroData: HeroData) => void;
  aiGeneratedContent?: LandingPageContent | null;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ 
  onNicheChange, 
  onHeroChange,
  aiGeneratedContent
}) => {
  const [customNiche, setCustomNiche] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const hasLoadedAIContent = useRef(false);
  
  // Hero section state
  const [heroData, setHeroData] = useState<HeroData>({
    headline: 'Your Compelling Headline Here',
    subHeadline: 'Supporting subtitle that explains your value proposition',
    backgroundType: 'color',
    backgroundValue: '#6366f1',
    layout: 'centered',
    ctaText: 'Get Started',
    ctaLink: '#',
    ctaStyle: 'primary',
    ctaSize: 'lg',
    valueProposition: 'Transform your business with our innovative solution',
    visualUrl: '',
    visualType: 'image',
    headlineFontSize: 'text-5xl',
    headlineBold: true,
    headlineItalic: false,
    subHeadlineFontSize: 'text-xl',
    backgroundVideoUrl: '',
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    overlayOpacity: 0.5,
  });

  // Update hero data when AI content is generated (only once per content)
  useEffect(() => {
    if (aiGeneratedContent?.hero && !hasLoadedAIContent.current) {
      const aiHero = aiGeneratedContent.hero;
      const updatedHeroData: HeroData = {
        headline: aiHero.headline || 'Your Compelling Headline Here',
        subHeadline: aiHero.sub_headline || 'Supporting subtitle that explains your value proposition',
        backgroundType: aiHero.background_type || 'color',
        backgroundValue: aiHero.background_value || '#6366f1',
        layout: aiHero.layout || 'centered',
        ctaText: aiHero.cta_button?.text || 'Get Started',
        ctaStyle: aiHero.cta_button?.style || 'primary',
        ctaSize: aiHero.cta_button?.size || 'lg',
        valueProposition: aiHero.value_proposition || 'Transform your business with our innovative solution',
        visualUrl: aiHero.visual_element?.url || '',
        visualType: aiHero.visual_element?.type || 'image',
        headlineFontSize: 'text-5xl',
        headlineBold: true,
        headlineItalic: false,
        subHeadlineFontSize: 'text-xl',
        ctaLink: '#',
        backgroundVideoUrl: '',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        overlayOpacity: 0.5,
      };
      setHeroData(updatedHeroData);
      onHeroChange?.(updatedHeroData);
      hasLoadedAIContent.current = true;
    }
  }, [aiGeneratedContent, onHeroChange]);

  // Reset the loaded flag when a new draft is generated (indicated by niche change)
  useEffect(() => {
    hasLoadedAIContent.current = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiGeneratedContent?.niche]);

  const handleNicheSelect = (value: string) => {
    setSelectedNiche(value);
    if (value === 'custom') {
      onNicheChange(customNiche);
    } else {
      onNicheChange(value);
      setCustomNiche('');
    }
  };

  const handleCustomNicheChange = (value: string) => {
    setCustomNiche(value);
    if (selectedNiche === 'custom') {
      onNicheChange(value);
    }
  };

  const updateHeroData = (field: keyof HeroData, value: HeroData[keyof HeroData]) => {
    const newHeroData = { ...heroData, [field]: value };
    setHeroData(newHeroData);
    onHeroChange?.(newHeroData);
  };

  // Predefined color palette for quick selection
  const colorPalette = [
    '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
    '#f43f5e', '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#84cc16', '#22c55e', '#10b981', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#1f2937', '#374151'
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customization</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="niche" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="niche">Niche & Basic</TabsTrigger>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
          </TabsList>
          
          <TabsContent value="niche" className="p-4 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="niche">Business Niche</Label>
              <Select onValueChange={handleNicheSelect}>
                <SelectTrigger id="niche">
                  <SelectValue placeholder="Select a niche" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS Technology</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="startup">Tech Startup</SelectItem>
                  <SelectItem value="fitness">Fitness & Wellness</SelectItem>
                  <SelectItem value="consulting">Business Consulting</SelectItem>
                  <SelectItem value="restaurant">Restaurant & Food</SelectItem>
                  <SelectItem value="healthcare">Healthcare Services</SelectItem>
                  <SelectItem value="education">Education & Training</SelectItem>
                  <SelectItem value="custom">Custom (specify below)</SelectItem>
                </SelectContent>
              </Select>
              {selectedNiche === 'custom' && (
                <div className="mt-2">
                  <Label htmlFor="custom-niche">Custom Niche</Label>
                  <Input
                    id="custom-niche"
                    placeholder="Describe your specific business niche"
                    value={customNiche}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomNicheChange(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Background Image</Label>
              <div className="aspect-video rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Image
                  src="/placeholder.svg"
                  alt="Background"
                  width={200}
                  height={112}
                  className="object-contain"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="overlay">Overlay</Label>
              <Switch id="overlay" />
            </div>
          </TabsContent>

          <TabsContent value="hero">
            <HeroCustomization
              heroData={heroData}
              updateHeroData={updateHeroData}
              aiGeneratedContent={aiGeneratedContent}
              colorPalette={colorPalette}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}; 