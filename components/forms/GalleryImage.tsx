// GalleryImage.tsx
import { JSX } from "react";
import OptimizedImage from "@/components/forms/OptimizedImage";
import { Small } from "../Typography"; // Assuming Typography is in the same directory or adjust path

interface ImageProps {
  fillHeight?: boolean;
  path: string;
  alt: string;
  className?: string;
  onClick?: () => void; // Add onClick handler prop
}

export function GalleryImage({
  fillHeight = false,
  path,
  alt,
  className = "",
  onClick // Destructure onClick
}: ImageProps): JSX.Element {
  return (
    <div
      onClick={onClick} // Apply the onClick handler
      className={`
        relative overflow-hidden group transition-all duration-300
        ${fillHeight ? 'h-full w-auto' : 'w-full h-auto'}
        aspect-square border border-slate-300 hover:border-slate-600
        ${onClick ? 'cursor-pointer' : ''} // Add cursor-pointer if onClick is provided
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
      <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"> {/* Added pointer-events-none here so click goes through */}
        <div className="w-full p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="w-full h-fit bg-[#FAFCFC] p-6">
            {/* Ensure Small component exists and is imported correctly */}
            <Small className="text-sm truncate text-stone-800 font-medium block whitespace-nowrap overflow-hidden text-ellipsis">{alt}</Small>
          </div>
        </div>
      </div>
    </div>
  );
}