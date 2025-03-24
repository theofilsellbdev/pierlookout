import OptimizedImage from "@/components/OptimizedImage";
import { Lead } from "@/components/Typography";
import { JSX } from "react";

type ReviewScore = {
  platform: string;
  score: string;
};

export default function ReviewSection(): JSX.Element {
  // Review data can be extracted into a constant or fetched
  const reviewScores: ReviewScore[] = [
    { platform: "Google", score: "5/5" },
    { platform: "Booking.com", score: "9.2/10" },
    { platform: "Eviivo", score: "5/5" }
  ];

  return (
    <section aria-label="Guest Reviews" className="w-[90vw] md:w-[80vw] mx-auto py-8 md:py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Reviews content */}
        <div className="flex flex-col items-center justify-center gap-5 w-full lg:w-3/5">
          <Lead className="text-center w-full text-2xl md:text-3xl lg:text-4xl leading-relaxed">
            A top floor regency flat with breathtaking views of the Eastbourne pier and seafront.
          </Lead>
          
          {/* Review scores - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-5 w-full">
            {reviewScores.map((review) => (
              <div key={review.platform} className="flex flex-col items-center justify-center">
                <div className="text-center text-slate-600 text-xl md:text-2xl font-normal font-[--font-cormorant-serif] tracking-wider">
                  {review.platform}
                </div>
                <div className="text-center text-slate-600 text-4xl md:text-5xl lg:text-6xl font-normal font-[--font-shippori-serif] tracking-widest">
                  {review.score}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Watercolor image - desktop only */}
        <div className="hidden lg:block lg:w-2/5 max-w-[400px] aspect-[373/567] relative mix-blend-darken">
          <OptimizedImage
            path="watercolour"
            objectFit="cover"
            alt="Watercolor illustration of the property"
          />
        </div>
      </div>
    </section>
  );
}