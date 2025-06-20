'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';
import { Button } from '../ui/button';

const CtaSectionPreview = () => {
  const { cta } = useLandingPageStore();

  return (
    <section className="py-20 px-4 text-center bg-gray-50 dark:bg-gray-800">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {cta.headline}
      </h2>
      <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-300">
        {cta.subText}
      </p>
      <div className="mt-8">
        <Button asChild size="lg">
          <a href={cta.buttonLink}>{cta.buttonText}</a>
        </Button>
      </div>
    </section>
  );
};

export default CtaSectionPreview; 