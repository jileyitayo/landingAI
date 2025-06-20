'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

type LucideIconComponent = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & React.RefAttributes<SVGSVGElement>>;

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as LucideIconComponent;

  if (LucideIcon) {
    return <LucideIcon className={cn('h-10 w-10 mb-4 text-primary', className)} />;
  }
  
  return <LucideIcons.HelpCircle className={cn('h-10 w-10 mb-4 text-gray-400', className)} />;
};

const FeatureBlockPreview = ({ featureId }: { featureId: string }) => {
  const { features } = useLandingPageStore();
  const feature = features.items.find((f) => f.id === featureId);

  if (!feature) {
    return null;
  }

  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-md">
      <Icon name={feature.icon} />
      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  );
};

export const FeaturesSectionPreview = () => {
  const { features } = useLandingPageStore();

  if (!features || features.items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{features.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.items.map((feature) => (
            <FeatureBlockPreview key={feature.id} featureId={feature.id} />
          ))}
        </div>
      </div>
    </section>
  );
}; 