'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

const HeaderPreview = () => {
  const { header } = useLandingPageStore();

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-8 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">{header.logoText}</div>
      <nav className="hidden md:flex space-x-6">
        {header.menuItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="md:hidden">
        <Button variant="ghost" size="icon">
           <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};

export default HeaderPreview; 