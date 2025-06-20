export interface LandingPageContent {
    niche: string;
    header: {
      logo_text: string;
      menu_items: {
        label: string;
        href: string;
      }[];
    };
    hero: {
      headline: string;
      sub_headline: string;
      background_type: 'color' | 'image' | 'video';
      background_value: string; // color hex, image URL, or video URL
      layout: 'centered' | 'left-aligned' | 'right-aligned';
      visual_element?: {
        type: 'image' | 'video';
        url: string;
        alt_text?: string;
      };
      cta_button: {
        text: string;
        style: 'primary' | 'secondary' | 'outline';
        size: 'sm' | 'md' | 'lg';
        href?: string;
      };
      value_proposition?: string;
      headline_font_size?: string;
      headline_bold?: boolean;
      headline_italic?: boolean;
      sub_headline_font_size?: string;
      background_video_url?: string;
      overlay_color?: string;
      overlay_opacity?: number;
    };
    features: {
      title: string;
      description: string;
    }[];
    testimonials: {
      quote: string;
      author: string;
    }[];
    cta: {
      headline: string;
      button_text: string;
    };
    footer: {
      text: string;
    };
  } 

  export interface HeroData {
    headline: string;
    subHeadline: string;
    backgroundType: 'color' | 'image' | 'video';
    backgroundValue: string;
    layout: 'centered' | 'left-aligned' | 'right-aligned';
    ctaText: string;
    ctaLink: string;
    ctaStyle: 'primary' | 'secondary' | 'outline';
    ctaSize: 'sm' | 'md' | 'lg';
    valueProposition: string;
    visualUrl: string;
    visualType: 'image' | 'video';
    headlineFontSize: string;
    headlineBold: boolean;
    headlineItalic: boolean;
    subHeadlineFontSize: string;
    backgroundVideoUrl: string;
    overlayColor: string;
    overlayOpacity: number;
    enableVisualElement: boolean;
  } 