// Gallery.tsx
import { GalleryImage } from "@/components/GalleryImage";
import Link from "next/link";
import { JSX, useState } from "react";

export default function Gallery(): JSX.Element {
  // Title for the gallery section
  const galleryTitle = "Explore Our Space";
  
  // Images data
  const images = [
    { path: "Kitchen", alt: "Kitchen" },
    { path: "BedroomA", alt: "Bedroom" },
    { path: "WideAngle", alt: "The Flat" }
  ];
  
  // State for mobile carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Navigation functions
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-[90vw] md:w-[80vw] mx-auto py-8 md:py-12">
      {/* Gallery Title */}
      <div className="flex flex-col items-center justify-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-[--font-shippori-serif] text-center text-slate-700">{galleryTitle}</h2>
        <Link href="/gallery" className="mt-2 text-sm underline transition-colors font-[--font-cormorant-serif] text-slate-500">
          View full gallery
        </Link>
      </div>
      {/* Mobile layout - carousel with navigation buttons */}
      <div className="md:hidden">
        <div className="relative">
          {/* Current image */}
          <div className="w-full max-w-[80vw] mx-auto aspect-square">
            <GalleryImage 
              path={images[currentImageIndex].path} 
              alt={images[currentImageIndex].alt} 
            />
          </div>
          
          {/* Navigation removed from here - moved to bottom */}
        </div>
        
        {/* Navigation controls and counter in a row */}
        <div className="flex justify-center items-center gap-8 mt-4">
          <button 
            onClick={goToPrevImage}
            className="text-slate-800 hover:text-slate-600 transition-colors"
            aria-label="Previous image"
          >
            <span className="font-[--font-shippori-serif] text-sm tracking-wider">Previous</span>
          </button>
          
          <div className="font-[--font-shippori-serif] text-sm tracking-widest text-slate-700">
            {currentImageIndex + 1} / {images.length}
          </div>
          
          <button 
            onClick={goToNextImage}
            className="text-slate-800 hover:text-slate-600 transition-colors"
            aria-label="Next image"
          >
            <span className="font-[--font-goudy-serif] text-sm tracking-wider">Next</span>
          </button>
        </div>
      </div>
      
      {/* Tablet layout - 2x2 grid with proper sizing */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
        <div className="aspect-square">
          <GalleryImage path="SofaArea" alt="Living Room" />
        </div>
        <div className="aspect-square">
          <GalleryImage path="BedroomA" alt="Bedroom" />
        </div>
        <div className="col-span-2 max-h-[40vh]">
          <GalleryImage path="Kitchen" alt="Kitchen" fillHeight={true} />
        </div>
      </div>
      
      {/* Desktop layout - horizontal row with constrained image sizes */}
      <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8">
        <div className="aspect-square">
          <GalleryImage path="SofaArea" alt="Living Room" />
        </div>
        <div className="aspect-square">
          <GalleryImage path="BedroomA" alt="Bedroom" />
        </div>
        <div className="aspect-square">
          <GalleryImage path="Kitchen" alt="Kitchen" />
        </div>
      </div>
    </div>
  );
}