'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';
import Image from 'next/image';

const TestimonialsPreview = () => {
  const { testimonials } = useLandingPageStore();

  if (!testimonials || testimonials.items.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
            {testimonials.title}
          </h2>
        </div>

        <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-12 text-center md:max-w-full md:grid-cols-3">
          {testimonials.items.map((testimonial) => (
            <div key={testimonial.id} className="p-8 bg-white rounded-lg shadow-md">
              <blockquote className="text-lg text-gray-700">
                <p>"{testimonial.quote}"</p>
              </blockquote>
              <div className="mt-6">
                <Image
                  className="object-cover mx-auto rounded-full w-14 h-14"
                  src={testimonial.authorImage || 'https://picsum.photos/100'}
                  alt={testimonial.authorName}
                  width={56}
                  height={56}
                />
                <p className="mt-4 text-base font-bold text-gray-900">
                  {testimonial.authorName}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {testimonial.authorTitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview; 