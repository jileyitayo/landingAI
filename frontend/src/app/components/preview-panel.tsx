import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Leaf, Droplets, TestTubeDiagonal } from "lucide-react";

export const PreviewPanel = () => {
  return (
    <Card className="h-full">
      <CardContent className="p-0">
        <div className="bg-gray-500 aspect-[9/16] w-full max-w-[400px] mx-auto flex flex-col justify-between text-center p-8">
            <div className="text-white">
                <h1 className="text-4xl font-bold">Introducing Our Eco-Friendly Water Bottle</h1>
                <p className="mt-2">Stay hydrated while helping the planet</p>
                <Button className="mt-4">Buy Now</Button>
            </div>
            <div className="text-white">
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <div className="flex justify-around">
                    <div className="flex flex-col items-center">
                        <Leaf size={48} />
                        <p>Sustainable Materials</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Droplets size={48} />
                        <p>Keeps Drinks Cold</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <TestTubeDiagonal size={48} />
                        <p>Leak Proof Design</p>
                    </div>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}; 