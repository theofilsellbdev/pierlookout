import { LinkElement } from "@/components/Navigation";
import OptimizedImage from "@/components/OptimizedImage";
import { JSX } from "react";

export default function LandingImage(): JSX.Element {
  return (
    <div className="w-[90vw] md:w-[80vw] h-[50vh] md:h-[55vh] mx-auto bg-slate-300 relative">
      <OptimizedImage
        path="pier"
        alt="The Pier, Viewed From Pier Lookout"
        objectFit="cover"
      />
      <div className="w-full md:w-auto max-w-[80%] md:max-w-[50%] h-fit absolute top-3 right-3 md:top-5 md:right-5 flex flex-col items-end">
        <LinkElement 
          href="https://maps.google.com/?q=3+Grand+Parade+Eastbourne+East+Sussex+BN21+3EH+United+Kingdom" 
          variant="small"
          className="text-white font-medium text-right text-shadow"
        >
            Flat 5, 3 Grand Parade Eastbourne <br /> 
            East Sussex BN21 3EH
        </LinkElement>
      </div>
    </div>
  )
}