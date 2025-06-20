'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const CtaSectionCustomization = () => {
  const { cta, setCta } = useLandingPageStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCta({ [name]: value });
  };

  return (
    <div className="space-y-4 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      <h3 className="text-lg font-semibold">CTA Section</h3>
      <div className="space-y-2">
        <Label htmlFor="cta-headline">Headline</Label>
        <Input
          id="cta-headline"
          name="headline"
          value={cta.headline}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cta-sub-text">Sub-text</Label>
        <Input
          id="cta-sub-text"
          name="subText"
          value={cta.subText}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cta-button-text">Button Text</Label>
        <Input
          id="cta-button-text"
          name="buttonText"
          value={cta.buttonText}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cta-button-link">Button Link</Label>
        <Input
          id="cta-button-link"
          name="buttonLink"
          value={cta.buttonLink}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default CtaSectionCustomization; 