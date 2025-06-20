'use client';

import React, { useState } from 'react';
import useLandingPageStore from '@/lib/store';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface GeneralSettingsCustomizationProps {
  onNicheChange: (niche: string) => void;
}

const GeneralSettingsCustomization = ({ onNicheChange }: GeneralSettingsCustomizationProps) => {
  const { header, footer, setHeader, setFooter, addMenuItem, removeMenuItem, updateMenuItem } = useLandingPageStore();
  const [customNiche, setCustomNiche] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeader({ [e.target.name]: e.target.value });
  };

  const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFooter({ [e.target.name]: e.target.value });
  };
  
  const handleMenuItemChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateMenuItem(id, { [name]: value });
  };

  const handleNicheSelect = (value: string) => {
    setSelectedNiche(value);
    if (value === 'custom') {
      onNicheChange(customNiche);
    } else {
      onNicheChange(value);
      setCustomNiche('');
    }
  };

  const handleCustomNicheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomNiche(e.target.value);
    if (selectedNiche === 'custom') {
      onNicheChange(e.target.value);
    }
  };

  return (
    <div className="space-y-6 p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div>
        <h3 className="text-lg font-semibold mb-4">Business Niche</h3>
        <div className="space-y-2">
          <Select onValueChange={handleNicheSelect} value={selectedNiche}>
            <SelectTrigger id="niche">
              <SelectValue placeholder="Select a niche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saas">SaaS Technology</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="startup">Tech Startup</SelectItem>
              <SelectItem value="fitness">Fitness & Wellness</SelectItem>
              <SelectItem value="consulting">Business Consulting</SelectItem>
              <SelectItem value="restaurant">Restaurant & Food</SelectItem>
              <SelectItem value="healthcare">Healthcare Services</SelectItem>
              <SelectItem value="education">Education & Training</SelectItem>
              <SelectItem value="custom">Custom (specify below)</SelectItem>
            </SelectContent>
          </Select>
          {selectedNiche === 'custom' && (
            <div className="mt-2">
              <Label htmlFor="custom-niche">Custom Niche</Label>
              <Input
                id="custom-niche"
                placeholder="Describe your specific business niche"
                value={customNiche}
                onChange={handleCustomNicheChange}
                className="mt-1"
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Header Settings</h3>
        <div className="space-y-2">
          <Label htmlFor="logo-text">Logo Text</Label>
          <Input
            id="logo-text"
            name="logoText"
            value={header.logoText}
            onChange={handleHeaderChange}
          />
        </div>
        <div className="mt-4 space-y-2">
            <Label>Menu Items</Label>
            {header.menuItems.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Input
                  name="label"
                  placeholder="Label"
                  value={item.label}
                  onChange={(e) => handleMenuItemChange(item.id, e)}
                  className="flex-1"
                />
                <Input
                  name="href"
                  placeholder="Link"
                  value={item.href}
                  onChange={(e) => handleMenuItemChange(item.id, e)}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" onClick={() => removeMenuItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
             <Button onClick={addMenuItem} variant="outline" size="sm">
              Add Menu Item
            </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Footer Settings</h3>
        <div className="space-y-2">
          <Label htmlFor="footer-text">Footer Text</Label>
          <Input
            id="footer-text"
            name="text"
            value={footer.text}
            onChange={handleFooterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsCustomization; 