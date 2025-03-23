// Gallery.tsx
import { GalleryImage } from "@/components/GalleryImage";
import { JSX, useState } from "react";

export function Gallery(): JSX.Element {
  // Images data
  const images = [
    { path: "livingroom", alt: "Living Room" },
    { path: "bedroom", alt: "Bedroom" },
    { path: "kitchen", alt: "Kitchen" }
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
          
          {/* Navigation buttons */}
          <button 
            onClick={goToPrevImage}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 bg-white/80 hover:bg-white text-slate-600 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button 
            onClick={goToNextImage}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1 bg-white/80 hover:bg-white text-slate-600 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        
        {/* Indicator dots */}
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? 'bg-slate-600' : 'bg-slate-300'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Tablet layout - 2x2 grid with proper sizing */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
        <div className="aspect-square">
          <GalleryImage path="livingroom" alt="Living Room" />
        </div>
        <div className="aspect-square">
          <GalleryImage path="bedroom" alt="Bedroom" />
        </div>
        <div className="col-span-2 max-h-[40vh]">
          <GalleryImage path="kitchen" alt="Kitchen" fillHeight={true} />
        </div>
      </div>
      
      {/* Desktop layout - horizontal row with constrained image sizes */}
      <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8">
        <div className="aspect-square">
          <GalleryImage path="livingroom" alt="Living Room" />
        </div>
        <div className="aspect-square">
          <GalleryImage path="bedroom" alt="Bedroom" />
        </div>
        <div className="aspect-square">
          <GalleryImage path="kitchen" alt="Kitchen" />
        </div>
      </div>
    </div>
  );
}