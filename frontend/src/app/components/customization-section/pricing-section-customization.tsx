'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Button } from "@/app/components/ui/button";
import useLandingPageStore from "@/lib/store";
import { Textarea } from "@/app/components/ui/textarea";
import { TrashIcon } from "lucide-react";

export const PricingSectionCustomization = () => {
    const { pricing, setPricingTitle, addPricingTier, updatePricingTier, removePricingTier, setPricingShowComparisonTable, addPricingFAQ, updatePricingFAQ, removePricingFAQ } = useLandingPageStore();

    return (
        <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Pricing Section Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        value={pricing.title}
                        onChange={(e) => setPricingTitle(e.target.value)}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Pricing Tiers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {pricing.tiers.map((tier, index) => (
                        <div key={tier.id} className="p-4 border rounded-md space-y-2 relative">
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removePricingTier(tier.id)}>
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                            <div className="space-y-1">
                                <Label>Plan Name</Label>
                                <Input value={tier.name} onChange={(e) => updatePricingTier(tier.id, { name: e.target.value })} />
                            </div>
                            <div className="flex gap-2">
                                <div className="space-y-1 w-1/2">
                                    <Label>Price</Label>
                                    <Input value={tier.price} onChange={(e) => updatePricingTier(tier.id, { price: e.target.value })} />
                                </div>
                                <div className="space-y-1 w-1/2">
                                    <Label>Frequency</Label>
                                    <Input value={tier.frequency} onChange={(e) => updatePricingTier(tier.id, { frequency: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label>Features (one per line)</Label>
                                <Textarea value={tier.features.join('\n')} onChange={(e) => updatePricingTier(tier.id, { features: e.target.value.split('\n') })} />
                            </div>
                            <div className="flex gap-2">
                                <div className="space-y-1 w-1/2">
                                    <Label>CTA Text</Label>
                                    <Input value={tier.ctaText} onChange={(e) => updatePricingTier(tier.id, { ctaText: e.target.value })} />
                                </div>
                                <div className="space-y-1 w-1/2">
                                    <Label>CTA Link</Label>
                                    <Input value={tier.ctaLink} onChange={(e) => updatePricingTier(tier.id, { ctaLink: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id={`featured-${tier.id}`}
                                    checked={tier.isFeatured}
                                    onCheckedChange={(checked) => updatePricingTier(tier.id, { isFeatured: checked })}
                                />
                                <Label htmlFor={`featured-${tier.id}`}>Featured Plan</Label>
                            </div>
                        </div>
                    ))}
                    <Button onClick={addPricingTier}>Add Tier</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Feature Comparison</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center space-x-2">
                     <Switch
                        id="show-comparison-table"
                        checked={pricing.showComparisonTable}
                        onCheckedChange={setPricingShowComparisonTable}
                    />
                    <Label htmlFor="show-comparison-table">Show Feature Comparison Table</Label>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>FAQs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {pricing.faqs.map((faq) => (
                        <div key={faq.id} className="p-4 border rounded-md space-y-2 relative">
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removePricingFAQ(faq.id)}>
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                            <div className="space-y-1">
                                <Label>Question</Label>
                                <Input value={faq.question} onChange={(e) => updatePricingFAQ(faq.id, { question: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <Label>Answer</Label>
                                <Textarea value={faq.answer} onChange={(e) => updatePricingFAQ(faq.id, { answer: e.target.value })} />
                            </div>
                        </div>
                    ))}
                    <Button onClick={addPricingFAQ}>Add FAQ</Button>
                </CardContent>
            </Card>
        </div>
    );
} 