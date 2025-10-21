// Gallery.tsx

import OptimizedImage from "@/components/OptimisedImage";
import { JSX, useEffect, useState } from "react";

interface selectedImage {
  imageTitle: string;
  path: string;
}

const IMAGES: selectedImage[] = [
  { imageTitle: 'A Living Space', path: 'SofaArea' },
  { imageTitle: 'The Bedroom', path: 'BedroomA' },
  { imageTitle: 'The Kitchen', path: 'Kitchen' },
  { imageTitle: 'A Pier View', path: 'Pier' },
  { imageTitle: 'The Flat', path: 'WideAngle' },
  { imageTitle: 'Window View', path: 'Window' }
]

export default function Gallery(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<selectedImage>({ imageTitle: 'A Living Space', path: 'SofaArea' });
  const [controls, setControls] = useState<[selectedImage, selectedImage]>([IMAGES[IMAGES.length - 1], IMAGES[1]]);

  useEffect(() => {
    const updateControls = () => {
      const currentIndex = IMAGES.findIndex(img => img.path === selectedImage.path);
      const prevIndex = currentIndex === 0 ? IMAGES.length - 1 : currentIndex - 1;
      const nextIndex = (currentIndex + 1) % IMAGES.length;
      setControls([IMAGES[prevIndex], IMAGES[nextIndex]]);
    };
    updateControls();
  }, [selectedImage]);

  return (
    <section
      className="w-full h-fit md:h-[80vh] px-[2rem] flex items-center justify-center py-10"
      style={{ fontFamily: "--var-shippori-serif" }}
    >
      {/* Grid */}
      <div className="max-w-5xl w-full h-full grid grid-cols-1 md:grid-cols-[1fr_auto] grid-rows-[auto_auto_1fr] md:grid-rows-[auto_1fr] gap-x-[5rem] gap-y-[clamp(.5rem,1vw,1rem)]">
        {/* Image Container */}
        <div className="relative h-full w-auto aspect-square order-2 md:order-3 col-span-1 md:row-span-2 bg-gray-300">
          <OptimizedImage
            path={selectedImage.path}
            alt={selectedImage.imageTitle}
            objectFit="cover"
            quality={100}
            priority
          />
        </div>
        {/* Title */}
        <div className="flex flex-col justify-center order-1 col-span-1 text-[clamp(.7rem,2vw,1rem)] py-[clamp(.5rem,1vw,1rem)]">
          <h1 className="text-[clamp(1rem,2rem,3rem)]">Gallery</h1>
          <h2 className="pl-2 border-l-1 border-l-gray-600">{selectedImage ? selectedImage.imageTitle : "No Image Selected"}</h2>
        </div>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row order-2 md:order-3 w-full sm:justify-between sm:items-end md:pr-[4rem]">
          <button
            className="flex flex-col"
            onClick={() => setSelectedImage(controls[0])}
          >
            <span className="text-[clamp(.6rem,2vw,.7rem)]">Previous</span>
            <span className="text-[clamp(.7rem,2vw,1rem)]">{controls[0].imageTitle}</span>
          </button>
          <button
            className="flex flex-col sm:items-end"
            onClick={() => setSelectedImage(controls[1])}
          >
            <span className="text-[clamp(.6rem,2vw,.7rem)]">Next</span>
            <span className="text-[clamp(.7rem,2vw,1rem)]">{controls[1].imageTitle}</span>
          </button>
        </div>
      </div>
    </section>
  );
}