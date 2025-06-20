'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';
import type { Testimonial } from '@/lib/store';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';

const TestimonialBlockCustomization = ({ testimonialId }: { testimonialId: string }) => {
  const { testimonials, updateTestimonial, removeTestimonial } = useLandingPageStore();
  const testimonial = testimonials.items.find((t) => t.id === testimonialId);

  if (!testimonial) {
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateTestimonial(testimonialId, { [name]: value });
  };

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{testimonial.authorName || 'New Testimonial'}</h4>
        <Button variant="ghost" size="sm" onClick={() => removeTestimonial(testimonialId)}>
          Remove
        </Button>
      </div>
      <div>
        <Label htmlFor={`quote-${testimonial.id}`}>Quote</Label>
        <Textarea
          id={`quote-${testimonial.id}`}
          name="quote"
          value={testimonial.quote}
          onChange={handleInputChange}
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor={`authorName-${testimonial.id}`}>Author Name</Label>
        <Input
          id={`authorName-${testimonial.id}`}
          name="authorName"
          value={testimonial.authorName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor={`authorTitle-${testimonial.id}`}>Author Title</Label>
        <Input
          id={`authorTitle-${testimonial.id}`}
          name="authorTitle"
          value={testimonial.authorTitle}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor={`authorImage-${testimonial.id}`}>Author Image URL</Label>
        <Input
          id={`authorImage-${testimonial.id}`}
          name="authorImage"
          value={testimonial.authorImage}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

const TestimonialsCustomization = () => {
  const { testimonials, setTestimonialsTitle, addTestimonial } = useLandingPageStore();

  return (
    <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div>
        <Label htmlFor="testimonialsTitle">Section Title</Label>
        <Input
          id="testimonialsTitle"
          value={testimonials.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTestimonialsTitle(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {testimonials.items.map((testimonial) => (
          <TestimonialBlockCustomization key={testimonial.id} testimonialId={testimonial.id} />
        ))}
      </div>

      <Button onClick={addTestimonial}>Add Testimonial</Button>
    </div>
  );
};

export default TestimonialsCustomization; 