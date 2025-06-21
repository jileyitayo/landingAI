'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';
import { type PricingTier } from '@/lib/store';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { CheckIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/app/components/ui/accordion"

const FeatureComparisonTable = ({ tiers }: { tiers: PricingTier[] }) => {
    const allFeatures = React.useMemo(() => {
        const featureSet = new Set<string>();
        tiers.forEach(tier => {
            tier.features.forEach(feature => {
                featureSet.add(feature);
            });
        });
        return Array.from(featureSet);
    }, [tiers]);

    if(allFeatures.length === 0) {
        return null;
    }

    return (
        <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Compare Plans</h3>
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-4 text-left font-semibold sticky left-0 bg-white z-10">Features</th>
                                    {tiers.map(tier => (
                                        <th key={tier.id} className="p-4 text-center font-semibold">{tier.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {allFeatures.map((feature, index) => (
                                    <tr key={index} className="border-b last:border-b-0">
                                        <td className="p-4 sticky left-0 bg-white z-10 font-medium">{feature}</td>
                                        {tiers.map(tier => (
                                            <td key={tier.id} className="p-4 text-center">
                                                {tier.features.includes(feature) ? (
                                                    <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                                                ) : (
                                                    <XIcon className="h-5 w-5 text-gray-400 mx-auto" />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export const PricingSectionPreview = () => {
  const { pricing } = useLandingPageStore();

  if (!pricing) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{pricing.title}</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricing.tiers.map((tier) => (
            <Card key={tier.id} className={cn('flex flex-col', tier.isFeatured ? 'border-primary border-2' : '')}>
              <CardHeader>
                <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-4xl font-bold mb-2">
                  {tier.price} <span className="text-lg font-normal">{tier.frequency}</span>
                </div>
                <ul className="space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{tier.ctaText}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {pricing.showComparisonTable && <FeatureComparisonTable tiers={pricing.tiers} />}

        {pricing.faqs.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
                {pricing.faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </div>
        )}
      </div>
    </section>
  );
}; 