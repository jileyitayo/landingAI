import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { HeroCustomization } from "@/app/components/customization-section/hero-customization";
import { FeaturesSectionCustomization } from "@/app/components/customization-section/features-section-customization";
import SocialProofCustomization from "@/app/components/customization-section/social-proof-customization";
import CtaSectionCustomization from "@/app/components/customization-section/cta-section-customization";
import GeneralSettingsCustomization from "@/app/components/customization-section/general-settings-customization";
import { PricingSectionCustomization } from "@/app/components/customization-section/pricing-section-customization";
import { MediaLibraryCustomization } from "@/app/components/customization-section/media-library-customization";

interface CustomizationPanelProps {
  onNicheChange: (niche: string) => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ 
  onNicheChange, 
}) => {
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
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="niche">Basic</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="socialProof">Social Proof</TabsTrigger>
            <TabsTrigger value="cta">CTA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="niche" className="p-4 space-y-6">
            <GeneralSettingsCustomization onNicheChange={onNicheChange} />
          </TabsContent>

          <TabsContent value="media">
            <MediaLibraryCustomization />
          </TabsContent>

          <TabsContent value="hero">
            <HeroCustomization
              colorPalette={colorPalette}
            />
          </TabsContent>
          <TabsContent value="features">
            <FeaturesSectionCustomization />
          </TabsContent>
          <TabsContent value="pricing">
            <PricingSectionCustomization />
          </TabsContent>
          <TabsContent value="socialProof">
            <SocialProofCustomization />
          </TabsContent>
          <TabsContent value="cta">
            <CtaSectionCustomization />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}; 