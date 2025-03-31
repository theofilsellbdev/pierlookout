'use client';

import React from 'react';
// Make sure the path to GalleryImage is correct
import { GalleryImage as GalleryImageComponent } from '@/components/forms/GalleryImage'; // Renamed import to avoid conflict with interface name

// Interface for the image data (can be shared or defined here)
interface GalleryImage {
  id: string;
  path: string;
  alt: string;
  description: string; // Keep description if it's used elsewhere, like the modal
}

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <GalleryImageComponent // Use the imported component
          key={image.id}
          path={image.path}
          alt={image.alt}
          onClick={() => onImageClick(image)} // Pass the click handler
          // No className needed here unless you want additional styling per item from the grid level
        />
      ))}
    </div>
  );
}