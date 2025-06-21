'use client';

import React from 'react';
import useLandingPageStore from '@/lib/store';
import type { SocialProofTestimonial, ClientLogo, Rating, Award } from '@/lib/store';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

// Individual Editors
const TestimonialEditor = ({ testimonial }: { testimonial: SocialProofTestimonial }) => {
  const { updateSocialProofTestimonial, removeSocialProofTestimonial } = useLandingPageStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateSocialProofTestimonial(testimonial.id, { [name]: value });
  };

  const handleTypeChange = (value: 'text' | 'video') => {
    updateSocialProofTestimonial(testimonial.id, { type: value });
  };

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{testimonial.author || 'New Testimonial'}</h4>
        <Button variant="ghost" size="sm" onClick={() => removeSocialProofTestimonial(testimonial.id)}>Remove</Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Type</Label>
          <Select onValueChange={handleTypeChange} defaultValue={testimonial.type}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Media URL</Label>
          <Input name="media" value={testimonial.media} onChange={handleChange} placeholder="Image or Video URL" />
        </div>
      </div>
      <div>
        <Label>Content</Label>
        <Textarea name="content" value={testimonial.content} onChange={handleChange} placeholder="Testimonial content or video description" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Author</Label>
          <Input name="author" value={testimonial.author} onChange={handleChange} />
        </div>
        <div>
          <Label>Author's Title</Label>
          <Input name="title" value={testimonial.title} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

const LogoEditor = ({ logo }: { logo: ClientLogo }) => {
    const { updateClientLogo, removeClientLogo } = useLandingPageStore();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      updateClientLogo(logo.id, { [name]: value });
    };
  
    return (
      <div className="p-4 border rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">{logo.alt || 'New Logo'}</h4>
          <Button variant="ghost" size="sm" onClick={() => removeClientLogo(logo.id)}>Remove</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Logo URL</Label>
            <Input name="src" value={logo.src} onChange={handleChange} />
          </div>
          <div>
            <Label>Alt Text</Label>
            <Input name="alt" value={logo.alt} onChange={handleChange} />
          </div>
        </div>
        <div>
          <Label>Link</Label>
          <Input name="link" value={logo.link} onChange={handleChange} />
        </div>
      </div>
    );
  };
  
  const RatingEditor = ({ rating }: { rating: Rating }) => {
    const { updateRating, removeRating } = useLandingPageStore();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const isNumber = name === 'rating' || name === 'reviews';
      updateRating(rating.id, { [name]: isNumber ? Number(value) : value });
    };
  
    return (
      <div className="p-4 border rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">{rating.site || 'New Rating'}</h4>
          <Button variant="ghost" size="sm" onClick={() => removeRating(rating.id)}>Remove</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Site Name</Label>
            <Input name="site" value={rating.site} onChange={handleChange} />
          </div>
          <div>
            <Label>Link to Site</Label>
            <Input name="link" value={rating.link} onChange={handleChange} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Rating (out of 5)</Label>
            <Input name="rating" type="number" value={rating.rating} onChange={handleChange} max={5} step={0.1} />
          </div>
          <div>
            <Label>Number of Reviews</Label>
            <Input name="reviews" type="number" value={rating.reviews} onChange={handleChange} />
          </div>
        </div>
      </div>
    );
  };

  const AwardEditor = ({ award }: { award: Award }) => {
    const { updateAward, removeAward } = useLandingPageStore();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      updateAward(award.id, { [name]: value });
    };
  
    return (
      <div className="p-4 border rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">{award.title || 'New Award'}</h4>
          <Button variant="ghost" size="sm" onClick={() => removeAward(award.id)}>Remove</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <Label>Title</Label>
                <Input name="title" value={award.title} onChange={handleChange} />
            </div>
            <div>
                <Label>Organization</Label>
                <Input name="organization" value={award.organization} onChange={handleChange} />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <Label>Year</Label>
                <Input name="year" value={award.year} onChange={handleChange} />
            </div>
            <div>
                <Label>Image URL</Label>
                <Input name="image" value={award.image} onChange={handleChange} />
            </div>
        </div>
      </div>
    );
  };


// Main Component
const SocialProofCustomization = () => {
  const { socialProof, setSocialProofTitle, addSocialProofTestimonial, addClientLogo, addRating, addAward } = useLandingPageStore();

  return (
    <div className="p-4 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* General Title */}
      <div>
        <Label htmlFor="socialProofTitle" className="text-lg font-semibold">Social Proof Section Title</Label>
        <Input
          id="socialProofTitle"
          value={socialProof.title}
          onChange={(e) => setSocialProofTitle(e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Testimonials */}
      <div className="space-y-4 p-4 border-t">
        <h3 className="text-md font-semibold">Testimonials</h3>
        {socialProof.testimonials.map(t => <TestimonialEditor key={t.id} testimonial={t} />)}
        <Button onClick={addSocialProofTestimonial}>Add Testimonial</Button>
      </div>

      {/* Client Logos */}
      <div className="space-y-4 p-4 border-t">
        <h3 className="text-md font-semibold">Client Logos</h3>
        {socialProof.logos.map(l => <LogoEditor key={l.id} logo={l} />)}
        <Button onClick={addClientLogo}>Add Logo</Button>
      </div>

      {/* Ratings */}
      <div className="space-y-4 p-4 border-t">
        <h3 className="text-md font-semibold">Ratings & Reviews</h3>
        {socialProof.ratings.map(r => <RatingEditor key={r.id} rating={r} />)}
        <Button onClick={addRating}>Add Rating</Button>
      </div>

      {/* Awards */}
      <div className="space-y-4 p-4 border-t">
        <h3 className="text-md font-semibold">Awards & Press</h3>
        {socialProof.awards.map(a => <AwardEditor key={a.id} award={a} />)}
        <Button onClick={addAward}>Add Award</Button>
      </div>
    </div>
  );
};

export default SocialProofCustomization; 