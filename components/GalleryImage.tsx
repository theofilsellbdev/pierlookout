// GalleryImage.tsx
import { JSX } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { Small } from "./Typography";

interface ImageProps {
  fillHeight?: boolean;
  path: string;
  alt: string;
  className?: string;
}

export function GalleryImage({
  fillHeight = false,
  path,
  alt,
  className = ""
}: ImageProps): JSX.Element {
  return (
    <div 
      className={`
        relative overflow-hidden group transition-all duration-300
        ${fillHeight ? 'h-full w-auto' : 'w-full h-auto'} 
        aspect-square border border-slate-300 hover:border-slate-600
        ${className}
      `}
    >
      <div className="absolute inset-[10px] overflow-hidden">
        <OptimizedImage
          path={path}
          alt={alt}
          objectFit="cover"
        />
      </div>
      
      {/* Optional caption overlay on hover */}
      <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="w-full h-fit bg-[#FAFCFC] p-6">
            <Small className="text-sm truncate">{alt}</Small>
          </div>
        </div>
      </div>
    </div>
  );
}