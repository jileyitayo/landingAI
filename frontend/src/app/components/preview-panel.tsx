import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Leaf, Droplets, TestTubeDiagonal } from "lucide-react";
import { LandingPageContent } from "../types";

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

  return (
    <Card className="h-full">
      <CardContent className="p-0">
        <div className="bg-gray-500 aspect-[9/16] w-full max-h-[98lvh] flex flex-col text-center overflow-y-auto">
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

          {/* Hero Section */}
          <div className="text-white p-8 flex-1 flex flex-col justify-center">
            <h1 className="text-4xl font-bold">{content.hero.headline}</h1>
            <p className="mt-2 text-lg">{content.hero.sub_headline}</p>
            <Button className="mt-4 mx-auto">{content.cta.button_text}</Button>
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
                  <p className="italic mb-2">"{testimonial.quote}"</p>
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