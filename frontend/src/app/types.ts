export interface LandingPageContent {
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