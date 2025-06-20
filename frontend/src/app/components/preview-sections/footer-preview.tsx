'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';

const FooterPreview = () => {
  const { footer } = useLandingPageStore();

  return (
    <footer className="bg-gray-900 text-white p-4 text-center">
      <p className="text-sm">{footer.text}</p>
    </footer>
  );
};

export default FooterPreview; 