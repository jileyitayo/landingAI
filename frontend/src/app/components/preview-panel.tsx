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
        <div className="bg-gray-500 aspect-[9/16] w-full max-w-[400px] mx-auto flex flex-col justify-between text-center p-8 overflow-y-auto">
          <div className="text-white">
            <h1 className="text-4xl font-bold">{content.hero.headline}</h1>
            <p className="mt-2">{content.hero.sub_headline}</p>
            <Button className="mt-4">{content.cta.button_text}</Button>
          </div>
          <div className="text-white mt-8">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <div className="flex flex-col items-center space-y-4">
              {content.features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Leaf size={48} />
                  <p className="font-bold">{feature.title}</p>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-white mt-8">
            <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
            <div className="flex flex-col items-center space-y-4">
              {content.testimonials.map((testimonial, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p>"{testimonial.quote}"</p>
                  <p className="font-bold">- {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-white mt-8">
            <h2 className="text-2xl font-bold mb-4">{content.cta.headline}</h2>
            <Button className="mt-4">{content.cta.button_text}</Button>
          </div>
          <div className="text-white mt-8">
             <p>{content.footer.text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 