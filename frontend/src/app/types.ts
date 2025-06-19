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