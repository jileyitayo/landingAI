import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { LandingPageContent, HeroData } from "@/app/types";
import { HeroCustomization } from "@/app/components/customization-section/hero-customization";
import { FeaturesSectionCustomization } from "@/app/components/customization-section/features-section-customization";
import useLandingPageStore from "@/lib/store";
import TestimonialsCustomization from "@/app/components/customization-section/testimonials-customization";
import CtaSectionCustomization from "@/app/components/customization-section/cta-section-customization";
import GeneralSettingsCustomization from "@/app/components/customization-section/general-settings-customization";

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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="niche">Basic</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="cta">CTA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="niche" className="p-4 space-y-6">
            <GeneralSettingsCustomization onNicheChange={onNicheChange} />
          </TabsContent>

          <TabsContent value="hero">
            <HeroCustomization
              colorPalette={colorPalette}
            />
          </TabsContent>
          <TabsContent value="features">
            <FeaturesSectionCustomization />
          </TabsContent>
          <TabsContent value="testimonials">
            <TestimonialsCustomization />
          </TabsContent>
          <TabsContent value="cta">
            <CtaSectionCustomization />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}; 