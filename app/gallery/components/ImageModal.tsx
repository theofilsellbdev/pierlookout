'use client';

import React, { useCallback, useEffect } from 'react';
import { Body, Small } from "@/components/Typography";
import OptimizedImage from "@/components/forms/OptimizedImage";

interface GalleryImage {
  id: string;
  path: string;
  alt: string;
  description: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: GalleryImage;
  allImages: GalleryImage[];
  setCurrentImage: (image: GalleryImage) => void;
}

export default function ImageModal({ 
  isOpen, 
  onClose, 
  image, 
  allImages,
  setCurrentImage
}: ImageModalProps) {
  // Navigate to next image
  const goToNextImage = useCallback(() => {
    const currentIndex = allImages.findIndex(img => img.id === image.id);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentImage(allImages[nextIndex]);
  }, [allImages, image.id, setCurrentImage]);

  // Navigate to previous image
  const goToPrevImage = useCallback(() => {
    const currentIndex = allImages.findIndex(img => img.id === image.id);
    const prevIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
    setCurrentImage(allImages[prevIndex]);
  }, [allImages, image.id, setCurrentImage]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent): void => {
      switch(e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          goToNextImage();
          break;
        case 'ArrowLeft':
          goToPrevImage();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Lock scrolling when modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'visible';
      }
    };
  }, [isOpen, image.id, onClose, goToNextImage, goToPrevImage]);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-stone-300 transition-colors z-50"
          aria-label="Close modal"
        >
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Previous Button */}
        <button 
          onClick={goToPrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-stone-300 transition-colors z-50"
          aria-label="Previous image"
        >
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Next Button */}
        <button 
          onClick={goToNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-stone-300 transition-colors z-50"
          aria-label="Next image"
        >
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Image Container */}
        <div className="relative max-w-4xl w-full h-full flex flex-col items-center justify-center">
          <div className="relative w-full h-[70vh] md:h-[80vh]">
            <div className="w-full h-full">
              <OptimizedImage
                path={image.path}
                alt={image.alt}
                objectFit="contain"
                quality={90}
              />
            </div>
          </div>
          
          {/* Image Caption */}
          <div className="mt-4 bg-white/90 backdrop-blur-sm p-4 w-full text-center">
            <Body className="text-stone-800 font-medium">{image.alt}</Body>
            <Small className="text-stone-700 mt-1">{image.description}</Small>
          </div>
        </div>
      </div>
    </>
  );
}