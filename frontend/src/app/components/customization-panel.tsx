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

          <TabsContent value="hero" className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* AI Content Status */}
            {aiGeneratedContent && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-700">
                  ✅ Content loaded from AI generation. Customize below to override.
                </p>
              </div>
            )}

            {/* Hero Content */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Content</h3>
              <div className="space-y-2">
                <Label htmlFor="hero-headline">Headline</Label>
                <Input
                  id="hero-headline"
                  value={heroData.headline}
                  onChange={(e) => updateHeroData('headline', e.target.value)}
                />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="headline-bold">Bold</Label>
                    <Switch
                      id="headline-bold"
                      checked={heroData.headlineBold}
                      onCheckedChange={(checked) => updateHeroData('headlineBold', checked)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="headline-italic">Italic</Label>
                    <Switch
                      id="headline-italic"
                      checked={heroData.headlineItalic}
                      onCheckedChange={(checked) => updateHeroData('headlineItalic', checked)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="headline-fontsize">Size</Label>
                    <Select
                      value={heroData.headlineFontSize}
                      onValueChange={(value) => updateHeroData('headlineFontSize', value)}
                    >
                      <SelectTrigger id="headline-fontsize" className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-3xl">Small</SelectItem>
                        <SelectItem value="text-4xl">Medium</SelectItem>
                        <SelectItem value="text-5xl">Large</SelectItem>
                        <SelectItem value="text-6xl">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-subheadline">Sub-headline</Label>
                <Input
                  id="hero-subheadline"
                  value={heroData.subHeadline}
                  onChange={(e) => updateHeroData('subHeadline', e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <Label htmlFor="subheadline-fontsize">Size</Label>
                  <Select
                    value={heroData.subHeadlineFontSize}
                    onValueChange={(value) => updateHeroData('subHeadlineFontSize', value)}
                  >
                    <SelectTrigger id="subheadline-fontsize" className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text-lg">Small</SelectItem>
                      <SelectItem value="text-xl">Medium</SelectItem>
                      <SelectItem value="text-2xl">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value-prop">Value Proposition</Label>
                <Input
                  id="value-prop"
                  value={heroData.valueProposition}
                  onChange={(e) => updateHeroData('valueProposition', e.target.value)}
                />
              </div>
            </div>

            {/* CTA Button Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Call to Action</h3>
              <div className="space-y-2">
                <Label htmlFor="cta-text">Button Text</Label>
                <Input
                  id="cta-text"
                  value={heroData.ctaText}
                  onChange={(e) => updateHeroData('ctaText', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-link">Button Link (URL)</Label>
                <Input
                  id="cta-link"
                  value={heroData.ctaLink}
                  onChange={(e) => updateHeroData('ctaLink', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Background Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Background</h3>
              <div className="space-y-2">
                <Label>Background Type</Label>
                <Select 
                  value={heroData.backgroundType} 
                  onValueChange={(value) => updateHeroData('backgroundType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="color">Solid Color</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {heroData.backgroundType === 'color' && (
                <div className="space-y-3">
                  <Label>Background Color</Label>
                  
                  {/* Color Picker Input */}
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={heroData.backgroundValue}
                      onChange={(e) => updateHeroData('backgroundValue', e.target.value)}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      value={heroData.backgroundValue}
                      onChange={(e) => updateHeroData('backgroundValue', e.target.value)}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                  
                  {/* Color Palette */}
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-600">Quick Colors</Label>
                    <div className="grid grid-cols-10 gap-1">
                      {colorPalette.map((color, index) => (
                        <Button
                          key={index}
                          className="w-full h-8 p-0 border"
                          style={{ backgroundColor: color }}
                          onClick={() => updateHeroData('backgroundValue', color)}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {heroData.backgroundType === 'image' && (
                <div className="space-y-2">
                  <Label htmlFor="bg-image-upload">Upload Image</Label>
                  <Input id="bg-image-upload" type="file" accept="image/*" />
                  <p className="text-sm text-gray-500">Or enter image URL:</p>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={heroData.backgroundValue.startsWith('http') ? heroData.backgroundValue : ''}
                    onChange={(e) => updateHeroData('backgroundValue', e.target.value)}
                  />
                </div>
              )}

              {heroData.backgroundType === 'video' && (
                <div className="space-y-2">
                  <Label htmlFor="bg-video-url">Video URL (YouTube, Vimeo)</Label>
                  <Input
                    id="bg-video-url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={heroData.backgroundVideoUrl}
                    onChange={(e) => updateHeroData('backgroundVideoUrl', e.target.value)}
                  />
                </div>
              )}

              {/* Overlay Settings */}
              {(heroData.backgroundType === 'image' || heroData.backgroundType === 'video') && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold">Background Overlay</h4>
                  <div className="space-y-2">
                    <Label htmlFor="overlay-color">Overlay Color</Label>
                    <div className="flex space-x-2">
                      <input
                        id="overlay-color"
                        type="color"
                        value={heroData.overlayColor}
                        onChange={(e) => updateHeroData('overlayColor', e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        value={heroData.overlayColor}
                        onChange={(e) => updateHeroData('overlayColor', e.target.value)}
                        placeholder="rgba(0, 0, 0, 0.5)"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="overlay-opacity">Overlay Opacity</Label>
                    <div className="flex items-center space-x-3">
                      <input
                        id="overlay-opacity"
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={heroData.overlayOpacity}
                        onChange={(e) => updateHeroData('overlayOpacity', parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <span>{Math.round(heroData.overlayOpacity * 100)}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Layout Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Layout</h3>
              <div className="space-y-2">
                <Label>Text Alignment</Label>
                <Select 
                  value={heroData.layout} 
                  onValueChange={(value) => updateHeroData('layout', value as 'centered' | 'left-aligned' | 'right-aligned')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centered">Centered</SelectItem>
                    <SelectItem value="left-aligned">Left Aligned</SelectItem>
                    <SelectItem value="right-aligned">Right Aligned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Visual Element */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Visual Element</h3>
              <div className="space-y-2">
                <Label>Visual Type</Label>
                <Select 
                  value={heroData.visualType} 
                  onValueChange={(value) => updateHeroData('visualType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Visual URL</Label>
                <Input
                  value={heroData.visualUrl}
                  onChange={(e) => updateHeroData('visualUrl', e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>
            </div>

            {/* CTA Button Customization */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Call-to-Action Button</h3>
              <div className="space-y-2">
                <Label>Button Style</Label>
                <Select
                  value={heroData.ctaStyle}
                  onValueChange={(value) => updateHeroData('ctaStyle', value as 'primary' | 'secondary' | 'outline')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Button Size</Label>
                <Select
                  value={heroData.ctaSize}
                  onValueChange={(value) => updateHeroData('ctaSize', value as 'sm' | 'md' | 'lg')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}; 