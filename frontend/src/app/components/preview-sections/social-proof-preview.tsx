'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';
import Image from 'next/image';
import { Star } from 'lucide-react';

const SocialProofPreview = () => {
  const { socialProof } = useLandingPageStore();

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
            {socialProof.title}
          </h2>
        </div>

        {/* Testimonials */}
        {socialProof.testimonials.length > 0 && (
          <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-12 text-center md:max-w-full md:grid-cols-3">
            {socialProof.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-8 bg-gray-50 rounded-lg shadow-sm">
                {testimonial.type === 'video' && testimonial.media && (
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <iframe src={testimonial.media.replace("watch?v=", "embed/")} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                )}
                <blockquote className="text-lg text-gray-700">
                  <p>"{testimonial.content}"</p>
                </blockquote>
                <div className="mt-6 flex items-center justify-center space-x-4">
                  {testimonial.media && testimonial.type === 'text' && (
                    <Image
                      className="object-cover rounded-full w-14 h-14"
                      src={testimonial.media}
                      alt={testimonial.author}
                      width={56}
                      height={56}
                    />
                  )}
                  <div>
                    <p className="text-base font-bold text-gray-900">{testimonial.author}</p>
                    <p className="mt-1 text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Client Logos */}
        {socialProof.logos.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 mt-16">
            {socialProof.logos.map((logo) => (
              <a key={logo.id} href={logo.link} title={logo.alt} className="flex items-center">
                <Image className="h-10 object-contain" src={logo.src} alt={logo.alt} width={158} height={48} />
              </a>
            ))}
          </div>
        )}
        
        {/* Ratings */}
        {socialProof.ratings.length > 0 && (
          <div className="grid grid-cols-1 gap-8 mt-16 text-center md:grid-cols-3">
            {socialProof.ratings.map((rating) => (
              <div key={rating.id} className="p-6 border-t-2 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">{rating.site}</h3>
                <div className="flex items-center justify-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.floor(rating.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-600">{rating.rating.toFixed(1)} out of 5</p>
                <a href={rating.link} className="mt-2 text-sm text-blue-600 hover:underline">Based on {rating.reviews} reviews</a>
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {socialProof.awards.length > 0 && (
          <div className="grid grid-cols-2 gap-8 mt-16 sm:grid-cols-4">
            {socialProof.awards.map((award) => (
              <div key={award.id} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <Image src={award.image} alt={award.title} width={80} height={80} className="object-contain" />
                <p className="mt-3 text-sm font-semibold text-gray-800">{award.title}</p>
                <p className="text-xs text-gray-600">{award.organization}, {award.year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialProofPreview; 