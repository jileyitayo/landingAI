import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { LandingPageContent } from "../types";

interface CustomizationPanelProps {
  onNicheChange: (niche: string) => void;
  onHeroChange?: (heroData: any) => void;
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
  const [heroData, setHeroData] = useState({
    headline: 'Your Compelling Headline Here',
    subHeadline: 'Supporting subtitle that explains your value proposition',
    headlineFontSize: 48,
    headlineBold: true,
    headlineItalic: false,
    subHeadlineFontSize: 24,
    backgroundType: 'color' as 'color' | 'image' | 'video',
    backgroundValue: '#6366f1',
    overlayColor: '#000000',
    overlayOpacity: 30,
    layout: 'centered' as 'centered' | 'left-aligned' | 'right-aligned',
    ctaText: 'Get Started',
    ctaUrl: '#',
    ctaStyle: 'primary' as 'primary' | 'secondary' | 'outline',
    ctaSize: 'lg' as 'sm' | 'md' | 'lg',
    valueProposition: 'Transform your business with our innovative solution',
    visualUrl: '',
    visualType: 'image' as 'image' | 'video'
  });

  // Update hero data when AI content is generated (only once per content)
  useEffect(() => {
    if (aiGeneratedContent?.hero && !hasLoadedAIContent.current) {
      const aiHero = aiGeneratedContent.hero;
      const updatedHeroData = {
        headline: aiHero.headline || 'Your Compelling Headline Here',
        subHeadline: aiHero.sub_headline || 'Supporting subtitle that explains your value proposition',
        headlineFontSize: aiHero.headline_font_size || 48,
        headlineBold: aiHero.headline_bold || true,
        headlineItalic: aiHero.headline_italic || false,
        subHeadlineFontSize: aiHero.sub_headline_font_size || 24,
        backgroundType: aiHero.background_type || 'color',
        backgroundValue: aiHero.background_value || '#6366f1',
        overlayColor: aiHero.overlay_color || '#000000',
        overlayOpacity: aiHero.overlay_opacity || 30,
        layout: aiHero.layout || 'centered',
        ctaText: aiHero.cta_button?.text || 'Get Started',
        ctaUrl: aiHero.cta_button?.url || '#',
        ctaStyle: aiHero.cta_button?.style || 'primary',
        ctaSize: aiHero.cta_button?.size || 'lg',
        valueProposition: aiHero.value_proposition || 'Transform your business with our innovative solution',
        visualUrl: aiHero.visual_element?.url || '',
        visualType: aiHero.visual_element?.type || 'image'
      };
      setHeroData(updatedHeroData);
      onHeroChange?.(updatedHeroData);
      hasLoadedAIContent.current = true;
    }
  }, [aiGeneratedContent, onHeroChange]);

  // Reset the loaded flag when new content is generated
  useEffect(() => {
    if (aiGeneratedContent) {
      hasLoadedAIContent.current = false;
    }
  }, [aiGeneratedContent?.niche]); // Only reset when niche changes (new generation)

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

  const updateHeroData = (field: string, value: any) => {
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
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="space-y-1">
                    <Label htmlFor="headline-size" className="text-xs">Font Size</Label>
                    <div className="flex items-center space-x-1">
                      <Input
                        id="headline-size"
                        type="number"
                        min="12"
                        max="96"
                        value={heroData.headlineFontSize}
                        onChange={(e) => updateHeroData('headlineFontSize', parseInt(e.target.value))}
                        className="text-xs"
                      />
                      <span className="text-xs text-gray-500">px</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Bold</Label>
                    <Switch
                      checked={heroData.headlineBold}
                      onCheckedChange={(checked) => updateHeroData('headlineBold', checked)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Italic</Label>
                    <Switch
                      checked={heroData.headlineItalic}
                      onCheckedChange={(checked) => updateHeroData('headlineItalic', checked)}
                    />
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
                <div className="space-y-1">
                  <Label htmlFor="subheadline-size" className="text-xs">Font Size</Label>
                  <div className="flex items-center space-x-1">
                    <Input
                      id="subheadline-size"
                      type="number"
                      min="12"
                      max="48"
                      value={heroData.subHeadlineFontSize}
                      onChange={(e) => updateHeroData('subHeadlineFontSize', parseInt(e.target.value))}
                      className="text-xs w-20"
                    />
                    <span className="text-xs text-gray-500">px</span>
                  </div>
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
                        <button
                          key={index}
                          className={`w-6 h-6 rounded border-2 cursor-pointer transition-all hover:scale-110 ${
                            heroData.backgroundValue === color ? 'border-gray-800' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => updateHeroData('backgroundValue', color)}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {heroData.backgroundType !== 'color' && (
                <div className="space-y-2">
                  <Label>
                    {heroData.backgroundType === 'image' ? 'Image URL' : 'Video URL'}
                  </Label>
                  <Input
                    value={heroData.backgroundValue}
                    onChange={(e) => updateHeroData('backgroundValue', e.target.value)}
                    placeholder={heroData.backgroundType === 'image' ? 'https://images.unsplash.com/photo-...' : 'https://example.com/video.mp4'}
                  />
                  {heroData.backgroundType === 'image' && (
                    <div className="space-y-2">
                      <Label>Or Upload Image</Label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              updateHeroData('backgroundValue', e.target?.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  )}
                </div>
              )}
              
              {/* Overlay Controls */}
              {(heroData.backgroundType === 'image' || heroData.backgroundType === 'video') && (
                <div className="space-y-3">
                  <Label>Overlay Settings</Label>
                  <div className="space-y-2">
                    <Label className="text-sm">Overlay Color</Label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        value={heroData.overlayColor}
                        onChange={(e) => updateHeroData('overlayColor', e.target.value)}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        value={heroData.overlayColor}
                        onChange={(e) => updateHeroData('overlayColor', e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm">Overlay Opacity</Label>
                      <span className="text-sm text-gray-500">{heroData.overlayOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={heroData.overlayOpacity}
                      onChange={(e) => updateHeroData('overlayOpacity', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
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
                  onValueChange={(value) => updateHeroData('layout', value)}
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

            {/* CTA Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Call-to-Action Button</h3>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input
                  value={heroData.ctaText}
                  onChange={(e) => updateHeroData('ctaText', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Button URL</Label>
                <Input
                  value={heroData.ctaUrl}
                  onChange={(e) => updateHeroData('ctaUrl', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Style</Label>
                  <Select 
                    value={heroData.ctaStyle} 
                    onValueChange={(value) => updateHeroData('ctaStyle', value)}
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
                  <Label>Size</Label>
                  <Select 
                    value={heroData.ctaSize} 
                    onValueChange={(value) => updateHeroData('ctaSize', value)}
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
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )
  } 