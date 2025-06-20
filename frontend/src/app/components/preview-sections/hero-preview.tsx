'use client';

import useLandingPageStore from "@/lib/store";
import Image from "next/image";

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

export const HeroPreview = () => {
  const { hero } = useLandingPageStore();

  return (
    <div 
      className={`text-white p-8 flex-1 flex flex-col justify-center relative min-h-[500px] ${getLayoutClasses(hero.layout)}`}
      style={getBackgroundStyle(hero.backgroundType, hero.backgroundValue)}
    >
      {/* Video Background */}
      {hero.backgroundType === 'video' && hero.backgroundVideoUrl && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src={getEmbedUrl(hero.backgroundVideoUrl) || ''}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
            style={{ minWidth: '177.77vh', minHeight: '100vw' }} // Maintain 16:9 aspect ratio
          ></iframe>
        </div>
      )}
      
      {/* Overlay for better text readability */}
      {(hero.backgroundType === 'image' || hero.backgroundType === 'video') && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: hero.overlayColor || 'rgba(0,0,0,0.5)',
            opacity: hero.overlayOpacity || 0.5
          }}
        ></div>
      )}
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className={`grid ${hero.enableVisualElement && hero.visualUrl ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8 items-center`}>
          {/* Text Content */}
          <div className={`space-y-6 ${hero.layout === 'right-aligned' && hero.enableVisualElement && hero.visualUrl ? 'md:order-2' : ''}`}>
            <h1 className={`font-bold leading-tight ${hero.headlineFontSize || 'text-4xl md:text-6xl'} ${hero.headlineBold ? 'font-extrabold' : 'font-bold'} ${hero.headlineItalic ? 'italic' : ''}`}>
              {hero.headline}
            </h1>
            <p className={`text-gray-100 leading-relaxed ${hero.subHeadlineFontSize || 'text-xl md:text-2xl'}`}>
              {hero.subHeadline}
            </p>
            {hero.valueProposition && (
              <p className="text-lg text-blue-200 font-medium">
                {hero.valueProposition}
              </p>
            )}
            <div className="pt-4">
              <a href={hero.ctaLink || '#'} target="_blank" rel="noopener noreferrer">
                <button 
                  className={getButtonClassName(hero.ctaStyle, hero.ctaSize)}
                >
                  {hero.ctaText}
                </button>
              </a>
            </div>
          </div>

          {/* Visual Element */}
          {hero.enableVisualElement && hero.visualUrl && (
            <div className="flex justify-center">
              {hero.visualType === 'image' ? (
                <div className="relative">
                  <Image
                    src={hero.visualUrl || '/placeholder.svg'}
                    alt={'Hero visual'}
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
                  <source src={hero.visualUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 