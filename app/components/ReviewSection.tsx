import OptimizedImage from "@/components/OptimizedImage";
import { Lead } from "@/components/Typography";
import { JSX } from "react";

export function ReviewSection(): JSX.Element {
  return (
    <div className="w-[90vw] md:w-[80vw] mx-auto py-8 md:py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Reviews content */}
        <div className="flex flex-col items-center justify-center gap-5 w-full lg:w-3/5">
          <Lead className="text-center w-full text-2xl md:text-3xl lg:text-4xl leading-relaxed">
            {`A top floor regency flat with breathtaking views of the Eastbourne pier and seafront.`}
          </Lead>
          
          {/* Review scores - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-5 w-full">
            {/* Google */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-center text-slate-600 text-xl md:text-2xl font-normal font-[--font-cormorant-serif] tracking-[2.50px]">
                Google
              </div>
              <div className="text-center text-slate-600 text-4xl md:text-5xl lg:text-6xl font-normal font-[--font-shippori-serif] tracking-[6px] md:tracking-[11px]">
                5/5
              </div>
            </div>
            
            {/* Booking.com */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-center text-slate-600 text-xl md:text-2xl font-normal font-[--font-cormorant-serif] tracking-[2.50px]">
                Booking.com
              </div>
              <div className="text-center text-slate-600 text-4xl md:text-5xl lg:text-6xl font-normal font-[--font-shippori-serif] tracking-[6px] md:tracking-[11px]">
                9.2/10
              </div>
            </div>
            
            {/* Eviivo */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-center text-slate-600 text-xl md:text-2xl font-normal font-[--font-cormorant-serif] tracking-[2.50px]">
                Eviivo
              </div>
              <div className="text-center text-slate-600 text-4xl md:text-5xl lg:text-6xl font-normal font-[--font-shippori-serif] tracking-[6px] md:tracking-[11px]">
                5/5
              </div>
            </div>
          </div>
        </div>
        
        {/* Watercolor image - desktop only */}
        <div className="hidden lg:block lg:w-2/5 max-w-[400px] aspect-[373/567] relative mix-blend-darken">
          <OptimizedImage
            path="watercolour"
            objectFit="cover"
            alt="Watercolor illustration"
          />
        </div>
      </div>
    </div>
  );
}