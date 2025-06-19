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
      headline_font_size?: number;
      headline_bold?: boolean;
      headline_italic?: boolean;
      sub_headline_font_size?: number;
      background_type: 'color' | 'image' | 'video';
      background_value: string; // color hex, image URL, or video URL
      overlay_color?: string;
      overlay_opacity?: number;
      layout: 'centered' | 'left-aligned' | 'right-aligned';
      visual_element?: {
        type: 'image' | 'video';
        url: string;
        alt_text?: string;
      };
      cta_button: {
        text: string;
        url?: string;
        style: 'primary' | 'secondary' | 'outline';
        size: 'sm' | 'md' | 'lg';
      };
      value_proposition?: string;
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