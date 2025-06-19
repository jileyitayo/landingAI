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