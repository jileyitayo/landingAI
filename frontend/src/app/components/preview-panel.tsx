import { Card, CardContent } from "@/app/components/ui/card";
import { LandingPageContent } from "@/app/types";
import { HeroPreview } from "@/app/components/preview-sections/hero-preview";
import { FeaturesSectionPreview } from "@/app/components/preview-sections/features-section-preview";
import SocialProofPreview from "@/app/components/preview-sections/social-proof-preview";
import CtaSectionPreview from "@/app/components/preview-sections/cta-section-preview";
import HeaderPreview from "./preview-sections/header-preview";
import FooterPreview from "./preview-sections/footer-preview";
import { PricingSectionPreview } from "./preview-sections/pricing-section-preview";

interface PreviewPanelProps {
  content: LandingPageContent | null;
}

export const PreviewPanel = ({ content }: PreviewPanelProps) => {
  if (!content) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <p>The preview of your landing page will appear here.</p>
        </CardContent>
      </Card>
    );
  }

  // Helper function to get button styling
  const getButtonClassName = (style: string, size: string) => {
    const baseClasses = "font-semibold transition-all duration-200";
    
    const styleClasses = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
    };
    
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };
    
    return `${baseClasses} ${styleClasses[style as keyof typeof styleClasses]} ${sizeClasses[size as keyof typeof sizeClasses]} rounded-lg`;
  };

  // Helper function to get layout classes
  const getLayoutClasses = (layout: string) => {
    switch (layout) {
      case 'left-aligned':
        return 'text-left items-start';
      case 'right-aligned':
        return 'text-right items-end';
      default:
        return 'text-center items-center';
    }
  };

  // Helper function to get background style
  const getBackgroundStyle = (backgroundType: string, backgroundValue: string) => {
    switch (backgroundType) {
      case 'color':
        return { backgroundColor: backgroundValue };
      case 'image':
        return { 
          backgroundImage: `url(${backgroundValue})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        };
      case 'video':
        return { backgroundColor: '#000' }; // Fallback for video
      default:
        return { backgroundColor: '#6366f1' };
    }
  };

  // Helper to extract video ID from YouTube/Vimeo URL
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    let videoId;
    if (url.includes('youtube.com/watch')) {
      videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1`;
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1`;
    } else if (url.includes('vimeo.com/')) {
      videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1`;
    }
    return null; // Not a supported URL
  };

  return (
    <Card className="h-full">
      <CardContent className="p-0">
        <div className="aspect-[9/16] w-full max-h-[98lvh] flex flex-col text-center overflow-y-auto">
          <HeaderPreview />

          <HeroPreview />

          <FeaturesSectionPreview />

          <SocialProofPreview />

          <CtaSectionPreview />

          <PricingSectionPreview />

          <FooterPreview />
        </div>
      </CardContent>
    </Card>
  );
}; 