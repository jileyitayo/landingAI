import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import Image from "next/image";

export const CustomizationPanel = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="niche">Niche</Label>
          <Select>
            <SelectTrigger id="niche">
              <SelectValue placeholder="Select a niche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="startup">Startup</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="headline">Headline</Label>
          <Input id="headline" defaultValue="Introducing Our Eco-Friendly Water Bottle" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtext">Subtext</Label>
          <Input id="subtext" defaultValue="Stay hydrated while helping the planet" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cta">Call-to-Action Button</Label>
          <Input id="cta" defaultValue="Buy Now" />
        </div>
        <div className="space-y-2">
          <Label>Background Image</Label>
          <div className="aspect-video rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Image
              src="/placeholder.svg"
              alt="Background"
              width={200}
              height={112}
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="overlay">Overlay</Label>
          <Switch id="overlay" />
        </div>
        <div className="flex items-center justify-between">
          <Label>Video</Label>
          <ChevronRightIcon className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
};

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )
  } 