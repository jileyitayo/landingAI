import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Leaf } from "lucide-react";
import { LandingPageContent } from "../types";
import Image from "next/image";

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

          {/* Enhanced Hero Section */}
          <div 
            className={`text-white p-8 flex-1 flex flex-col justify-center relative min-h-[500px] ${getLayoutClasses(content.hero.layout)}`}
            style={getBackgroundStyle(content.hero.background_type, content.hero.background_value)}
          >
            {/* Video Background */}
            {content.hero.background_type === 'video' && content.hero.background_video_url && (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <iframe
                  src={getEmbedUrl(content.hero.background_video_url) || ''}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
                  style={{ minWidth: '177.77vh', minHeight: '100vw' }} // Maintain 16:9 aspect ratio
                ></iframe>
              </div>
            )}
            
            {/* Overlay for better text readability */}
            {(content.hero.background_type === 'image' || content.hero.background_type === 'video') && (
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: content.hero.overlay_color || 'rgba(0,0,0,0.5)',
                  opacity: content.hero.overlay_opacity || 0.5
                }}
              ></div>
            )}
            
            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl mx-auto w-full">
              <div className={`grid ${content.hero.visual_element ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8 items-center`}>
                {/* Text Content */}
                <div className={`space-y-6 ${content.hero.layout === 'right-aligned' && content.hero.visual_element ? 'md:order-2' : ''}`}>
                  <h1 className={`font-bold leading-tight ${content.hero.headline_font_size || 'text-4xl md:text-6xl'} ${content.hero.headline_bold ? 'font-extrabold' : 'font-bold'} ${content.hero.headline_italic ? 'italic' : ''}`}>
                    {content.hero.headline}
                  </h1>
                  <p className={`text-gray-100 leading-relaxed ${content.hero.sub_headline_font_size || 'text-xl md:text-2xl'}`}>
                    {content.hero.sub_headline}
                  </p>
                  {content.hero.value_proposition && (
                    <p className="text-lg text-blue-200 font-medium">
                      {content.hero.value_proposition}
                    </p>
                  )}
                  <div className="pt-4">
                    <a href={content.hero.cta_button.href || '#'} target="_blank" rel="noopener noreferrer">
                      <button 
                        className={getButtonClassName(content.hero.cta_button.style, content.hero.cta_button.size)}
                      >
                        {content.hero.cta_button.text}
                      </button>
                    </a>
                  </div>
                </div>

                {/* Visual Element */}
                {content.hero.visual_element && (
                  <div className="flex justify-center">
                    {content.hero.visual_element.type === 'image' ? (
                      <div className="relative">
                        <Image
                          src={content.hero.visual_element.url || '/placeholder.svg'}
                          alt={content.hero.visual_element.alt_text || 'Hero visual'}
                          width={400}
                          height={300}
                          className="rounded-lg shadow-2xl max-w-full h-auto"
                          style={{ maxWidth: '400px', maxHeight: '300px' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwSDI1MFYyMDBIMTUwVjEwMFoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0icG9zaXRpb246IGFic29sdXRlOyB0b3A6IDUwJTsgbGVmdDogNTAlOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTsiPgo8cGF0aCBkPSJNMzUgNUg1QzIuMjM4NTggNSAwIDcuMjM4NTggMCAxMFYzMEMwIDMyLjc2MTQgMi4yMzg1OCAzNSA1IDM1SDM1QzM3Ljc2MTQgMzUgNDAgMzIuNzYxNCA0MCAzMFYxMEM0MCA3LjIzODU4IDM3Ljc2MTQgNSAzNSA1WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTUgMTVDMTcuNzYxNCAxNSAyMCAxMi43NjE0IDIwIDEwQzIwIDcuMjM4NTggMTcuNzYxNCA1IDE1IDVDMTIuMjM4NiA1IDEwIDcuMjM4NTggMTAgMTBDMTAgMTIuNzYxNCAxMi4yMzg2IDE1IDE1IDE1WiIgZmlsbD0iIzZCNzI4MCIvPgo8cGF0aCBkPSJNNSAzMEwxNSAyMEwyNSAzMEg1WiIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4KPC9zdmc+';
                          }}
                        />
                      </div>
                    ) : (
                      <video
                        controls
                        className="rounded-lg shadow-2xl max-w-full h-auto"
                        style={{ maxWidth: '400px' }}
                        onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          target.style.display = 'none';
                          // Create fallback div
                          const fallback = document.createElement('div');
                          fallback.className = 'rounded-lg shadow-2xl bg-gray-200 flex items-center justify-center text-gray-500';
                          fallback.style.width = '400px';
                          fallback.style.height = '300px';
                          fallback.innerHTML = 'Video unavailable';
                          target.parentNode?.appendChild(fallback);
                        }}
                      >
                        <source src={content.hero.visual_element.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

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