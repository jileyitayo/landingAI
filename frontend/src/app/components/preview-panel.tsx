import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Leaf } from "lucide-react";
import { LandingPageContent } from "../types";
import { HeroPreview } from "./preview-sections/hero-preview";

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
          {/* Header Section */}
          <header className="bg-white text-gray-800 px-8 py-4 flex justify-between items-center">
            <div className="text-xl font-bold">
              {content.header.logo_text}
            </div>
            <nav className="hidden md:flex space-x-6">
              {content.header.menu_items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="md:hidden">
              <button className="text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </header>

          <HeroPreview hero={content.hero} />

          {/* Features Section */}
          <div className="text-white p-8 bg-gray-600">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <Leaf size={48} className="mb-2" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="text-white p-8 bg-gray-700">
            <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
            <div className="space-y-6">
              {content.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <p className="italic mb-2">&quot;{testimonial.quote}&quot;</p>
                  <p className="font-bold text-sm">- {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-white p-8 bg-gray-800">
            <h2 className="text-2xl font-bold mb-4">{content.cta.headline}</h2>
            <Button className="mx-auto">{content.cta.button_text}</Button>
          </div>

          {/* Footer */}
          <footer className="bg-gray-900 text-white p-4 text-center">
            <p className="text-sm">{content.footer.text}</p>
          </footer>
        </div>
      </CardContent>
    </Card>
  );
}; 