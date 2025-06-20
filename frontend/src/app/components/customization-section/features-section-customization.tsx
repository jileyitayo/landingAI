'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import * as LucideIcons from 'lucide-react';

const iconNames = Object.keys(LucideIcons).filter(key => {
    const potentialIcon = (LucideIcons as any)[key];
    return potentialIcon && typeof potentialIcon === 'object' && 'render' in potentialIcon;
});

const FeatureBlockCustomization = ({ featureId }: { featureId: string }) => {
  const { features, updateFeature, removeFeature } = useLandingPageStore();
  const feature = features.items.find((f) => f.id === featureId);

  if (!feature) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFeature(featureId, { [name]: value });
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFeature(featureId, { icon: e.target.value });
  };

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{feature.title}</h4>
        <Button variant="ghost" size="sm" onClick={() => removeFeature(featureId)}>
          Remove
        </Button>
      </div>
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input name="title" value={feature.title} onChange={handleInputChange} />
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea name="description" value={feature.description} onChange={handleInputChange} />
      </div>
      <div>
        <label className="text-sm font-medium">Icon</label>
        <select value={feature.icon} onChange={handleIconChange} className="w-full p-2 border rounded">
          {iconNames.map((iconName) => (
            <option key={iconName} value={iconName}>
              {iconName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const FeaturesSectionCustomization = () => {
  const { features, setFeaturesTitle, addFeature } = useLandingPageStore();

  return (
    <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div>
        <label className="text-sm font-medium">Section Title</label>
        <Input value={features.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFeaturesTitle(e.target.value)} />
      </div>

      <div className="space-y-4">
        {features.items.map((feature) => (
          <FeatureBlockCustomization key={feature.id} featureId={feature.id} />
        ))}
      </div>

      <Button onClick={addFeature}>Add Feature</Button>
    </div>
  );
}; 