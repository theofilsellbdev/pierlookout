'use client';

import React, { useState } from 'react';
import { Navbar, Footer } from "@/components/Navigation";
import { Heading, Subheading, Lead, Body } from "@/components/Typography";
import OptimizedImage from "@/components/forms/OptimizedImage";
import Link from "next/link";
import GalleryGrid from "./GalleryGrid";
import ImageModal from "./ImageModal";

// Gallery image data
const galleryImages = [
  {
    id: 'living-room',
    path: 'SofaArea', 
    alt: 'Living Room',
    description: 'The comfortable living area with sofa and stunning sea views'
  },
  {
    id: 'bedroom',
    path: 'BedroomA',
    alt: 'Bedroom',
    description: 'The romantic double bedroom with tasteful furnishings'
  },
  {
    id: 'kitchen',
    path: 'Kitchen',
    alt: 'Kitchen',
    description: 'Fully equipped kitchen with modern appliances'
  },
  {
    id: 'pier-view',
    path: 'Pier',
    alt: 'Pier View',
    description: 'Breathtaking views of Eastbourne Pier from the apartment'
  },
  {
    id: 'wide-angle',
    path: 'WideAngle',
    alt: 'The Flat',
    description: 'Wide angle view of the open plan living space'
  },
  {
    id: 'window',
    path: 'Window',
    alt: 'Window View',
    description: 'View from the apartment window'
  }
];

// Group images into categories
const galleryCategories = [
  {
    id: 'interior',
    title: 'Interior',
    description: 'Explore the elegant interior of our luxury seafront flat',
    images: galleryImages.filter(img => ['living-room', 'bedroom', 'kitchen', 'wide-angle'].includes(img.id))
  },
  {
    id: 'views',
    title: 'Views',
    description: 'Experience the breathtaking views from Pier Lookout',
    images: galleryImages.filter(img => ['pier-view', 'window'].includes(img.id))
  }
];

export default function GalleryPageClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(galleryImages[0]);

  // Function to open the modal with a specific image
  const openImageModal = (image: typeof galleryImages[0]) => {
    setCurrentImage(image);
    setModalOpen(true);
  };

  // Button animation on hover
  const buttonAnimation = "transform transition-transform duration-300 hover:scale-105 active:scale-95";

  return (
    <div className="w-screen min-h-screen flex flex-col overflow-y-auto bg-[#FAFCFC]">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow">
        {/* Header Image */}
        <section className="w-[90vw] md:w-[80vw] h-[50vh] mx-auto bg-slate-300 relative mb-12">
          <OptimizedImage
            path="Pier"
            alt="View from Pier Lookout"
            objectFit="cover"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Heading className="text-white font-[--font-shippori-serif] uppercase tracking-widest text-shadow">
              Photo Gallery
            </Heading>
          </div>
        </section>

        {/* Gallery Introduction */}
        <section className="w-[90vw] md:w-[80vw] mx-auto mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Subheading className="font-[--font-shippori-serif] text-stone-800 mb-4">
              Explore Pier Lookout
            </Subheading>
            <Lead className="text-stone-700 font-medium">
              Browse our collection of images showcasing our luxury seafront accommodation.
              Click on any image to view in larger size.
            </Lead>
          </div>

          {/* Gallery Categories */}
          {galleryCategories.map((category) => (
            <div key={category.id} className="mb-20">
              <div className="mb-8">
                <Subheading className="font-[--font-shippori-serif] text-stone-800 mb-2">
                  {category.title}
                </Subheading>
                <Body className="text-stone-700 font-medium">
                  {category.description}
                </Body>
              </div>
              
              <GalleryGrid 
                images={category.images} 
                onImageClick={openImageModal}
              />
            </div>
          ))}
        </section>

        {/* Booking CTA */}
        <section className="w-[90vw] md:w-[80vw] mx-auto mb-20">
          <div className="bg-stone-100 border border-stone-200 p-8 md:p-12 flex flex-col items-center text-center">
            <Subheading className="font-[--font-shippori-serif] text-stone-800 mb-4">
              Ready to Book Your Stay?
            </Subheading>
            <Lead className="text-stone-700 font-medium max-w-2xl mx-auto mb-8">
              Experience the breathtaking views and luxurious comfort of Pier Lookout. 
              Book your stay now for an unforgettable experience on the Eastbourne seafront.
            </Lead>
            <Link 
              href="/booking" 
              className={`w-full max-w-md px-6 py-4 outline outline-offset-[-1px] outline-stone-600 flex justify-center items-center hover:bg-white transition-colors ${buttonAnimation}`}
            >
              <Body className="text-stone-700 font-medium font-[--font-shippori-serif] uppercase tracking-widest text-center">
                Book The Flat
              </Body>
            </Link>
          </div>
        </section>
      </main>

      {/* Image Modal */}
      <ImageModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        image={currentImage}
        allImages={galleryImages}
        setCurrentImage={setCurrentImage}
      />

      <Footer />
    </div>
  );
}