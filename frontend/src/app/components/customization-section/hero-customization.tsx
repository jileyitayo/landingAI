import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";
import { HeroData, LandingPageContent } from "@/app/types";
import useLandingPageStore from "@/lib/store";

interface HeroCustomizationProps {
  aiGeneratedContent?: LandingPageContent | null;
  colorPalette: string[];
}

export const HeroCustomization = ({
  aiGeneratedContent,
  colorPalette,
}: HeroCustomizationProps) => {
  const { hero, setHero } = useLandingPageStore();

  const updateHeroData = (field: keyof HeroData, value: any) => {
    setHero({ [field]: value });
  };

  return (
    <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
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
            value={hero.headline}
            onChange={(e) => updateHeroData('headline', e.target.value)}
          />
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="headline-bold">Bold</Label>
              <Switch
                id="headline-bold"
                checked={hero.headlineBold}
                onCheckedChange={(checked) => updateHeroData('headlineBold', checked)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="headline-italic">Italic</Label>
              <Switch
                id="headline-italic"
                checked={hero.headlineItalic}
                onCheckedChange={(checked) => updateHeroData('headlineItalic', checked)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="headline-fontsize">Size</Label>
              <Select
                value={hero.headlineFontSize}
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
            value={hero.subHeadline}
            onChange={(e) => updateHeroData('subHeadline', e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <Label htmlFor="subheadline-fontsize">Size</Label>
            <Select
              value={hero.subHeadlineFontSize}
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
            value={hero.valueProposition}
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
            value={hero.ctaText}
            onChange={(e) => updateHeroData('ctaText', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cta-link">Button Link (URL)</Label>
          <Input
            id="cta-link"
            value={hero.ctaLink}
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
            value={hero.backgroundType} 
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
        
        {hero.backgroundType === 'color' && (
          <div className="space-y-3">
            <Label>Background Color</Label>
            
            {/* Color Picker Input */}
            <div className="flex space-x-2">
              <input
                type="color"
                value={hero.backgroundValue}
                onChange={(e) => updateHeroData('backgroundValue', e.target.value)}
                className="w-12 h-10 rounded border cursor-pointer"
              />
              <Input
                value={hero.backgroundValue}
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

        {hero.backgroundType === 'image' && (
          <div className="space-y-2">
            <Label htmlFor="bg-image-upload">Upload Image</Label>
            <Input id="bg-image-upload" type="file" accept="image/*" />
            <p className="text-sm text-gray-500">Or enter image URL:</p>
            <Input
              placeholder="https://example.com/image.jpg"
              value={hero.backgroundValue.startsWith('http') ? hero.backgroundValue : ''}
              onChange={(e) => updateHeroData('backgroundValue', e.target.value)}
            />
          </div>
        )}

        {hero.backgroundType === 'video' && (
          <div className="space-y-2">
            <Label htmlFor="bg-video-url">Video URL (YouTube, Vimeo)</Label>
            <Input
              id="bg-video-url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={hero.backgroundVideoUrl}
              onChange={(e) => updateHeroData('backgroundVideoUrl', e.target.value)}
            />
          </div>
        )}

        {/* Overlay Settings */}
        {(hero.backgroundType === 'image' || hero.backgroundType === 'video') && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-semibold">Background Overlay</h4>
            <div className="space-y-2">
              <Label htmlFor="overlay-color">Overlay Color</Label>
              <div className="flex space-x-2">
                <input
                  id="overlay-color"
                  type="color"
                  value={hero.overlayColor}
                  onChange={(e) => updateHeroData('overlayColor', e.target.value)}
                  className="w-12 h-10 rounded border cursor-pointer"
                />
                <Input
                  value={hero.overlayColor}
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
                  value={hero.overlayOpacity}
                  onChange={(e) => updateHeroData('overlayOpacity', parseFloat(e.target.value))}
                  className="w-full"
                />
                <span>{Math.round(hero.overlayOpacity * 100)}%</span>
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
            value={hero.layout} 
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
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Visual Element</h3>
            <Switch
                checked={hero.enableVisualElement}
                onCheckedChange={(checked) => updateHeroData('enableVisualElement', checked)}
            />
        </div>
        {hero.enableVisualElement && (
            <div className="space-y-4 pl-4 border-l-2">
                <div className="space-y-2">
                <Label>Visual Type</Label>
                <Select 
                    value={hero.visualType} 
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
                    value={hero.visualUrl}
                    onChange={(e) => updateHeroData('visualUrl', e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                />
                </div>
            </div>
        )}
      </div>

      {/* CTA Button Customization */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Call-to-Action Button</h3>
        <div className="space-y-2">
          <Label>Button Style</Label>
          <Select
            value={hero.ctaStyle}
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
            value={hero.ctaSize}
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
    </div>
  );
}; 