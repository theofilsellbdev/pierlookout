import OptimizedImage from "@/components/OptimisedImage";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section
            className="w-full h-[80vh] relative mt-[5rem] px-[1rem] sm:px-[3rem] md:px-[5rem]"
            // Metadata for accessibility and SEO - this is the key description of the flat
            role="region"
            aria-labelledby="pier-lookout-hero"
            id="pier-lookout-hero"
        >
            {/* SEO: Main heading and description for the flat */}
            <h1 id="pier-lookout-title" className="sr-only">
                Pier Lookout - Stunning Coastal Flat for Rent
            </h1>
            <meta name="description" content="Experience breathtaking sea views and modern comfort at Pier Lookout. Book your stay at this beautiful coastal flat today." />
            {/* Hero content goes here */}

            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-[1fr_1fr] lg:grid-cols-[3fr_2fr] grid-rows-[1fr_1fr] sm:grid-rows-1 gap-x-[2rem] gap-y-[.2rem] items-center justify-center">
                {/* Left Side: Image or Visual Representation */}
                <div className="w-full h-full bg-gray-300 relative">
                    <OptimizedImage
                        path="Window"
                        alt="View from Pier Lookout"
                        objectFit="cover"
                        quality={100}
                    />
                </div>
                {/* Right Side: Textual Content */}
                <div
                    className="w-full h-fit px-[1rem] [&>*]:text-[clamp(.8rem,2vw,1rem)]"
                    style={{ fontFamily: "var(--font-shippori-serif)" }}
                >
                    {/* Header */}
                    <h2 className="hidden sm:block">Pier Lookout</h2>
                    {/* Body */}
                    <div className="mt-[1rem] text-stone-800 leading-relaxed">
                        A cozy, clean, and comfortable flat,&nbsp;
                        <span className="italic font-bold">just steps from the beach</span>
                        &nbsp;with sea and pier views.
                        <div className="mt-[1rem]">
                            Experience breathtaking sea views and modern comfort at Pier Lookout. Book your stay at this beautiful coastal flat today. Enjoy a bright a comfortable flat in the summer or a cozy retreat in the winter, with all the amenities you need for a relaxing getaway.
                        </div>
                    </div>
                    {/* CTA */}

                    <div className="mt-[2rem] flex">
                        <Link
                            href="https://via.eviivo.com/PierLookoutBN21"
                            className="pr-2 relative group "
                            style={{ fontFamily: "var(--font-shippori-serif)" }}
                        >
                            Book Now
                            <div
                                className="absolute left-0 -bottom-1 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

