'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

const GeneralSettingsCustomization = () => {
  const { header, footer, setHeader, setFooter, addMenuItem, removeMenuItem, updateMenuItem } = useLandingPageStore();

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

  return (
    <div className="space-y-6 p-4">
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