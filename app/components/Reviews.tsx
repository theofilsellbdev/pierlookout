import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface EviivoReview {
    name: string;
    stayed: string;
    rating: {
        value: number;
        outOf: number;
    } | null;
    title: string;
    body: string;
    like: string;
}

export interface EviivoReviewsResponse {
    shortname: string;
    page: number;
    hasNext: boolean;
    count: number;
    reviews: EviivoReview[];
}
const isRecord = (v: unknown): v is Record<string, unknown> =>
    typeof v === "object" && v !== null;

const isRating = (v: unknown): v is { value: number; outOf: number } =>
    isRecord(v) &&
    typeof v.value === "number" &&
    Number.isFinite(v.value) &&
    typeof v.outOf === "number" &&
    Number.isFinite(v.outOf);

const isReview = (v: unknown): v is EviivoReview =>
    isRecord(v) &&
    typeof v.name === "string" &&
    typeof v.stayed === "string" &&
    (v.rating === null || isRating(v.rating)) &&
    typeof v.title === "string" &&
    typeof v.body === "string" &&
    typeof v.like === "string";

const isReviewsResponse = (v: unknown): v is EviivoReviewsResponse =>
    isRecord(v) &&
    typeof v.shortname === "string" &&
    typeof v.page === "number" &&
    typeof v.hasNext === "boolean" &&
    typeof v.count === "number" &&
    Array.isArray(v.reviews) &&
    v.reviews.every(isReview);

export default function Reviews() {
    const [reviews, setReviews] = useState<EviivoReview[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/eviivo-reviews?shortname=PierLookoutBN21&page=1`, { next: { revalidate: 3600 } });
            // Check if the response is okay
            if (!res.ok) { console.error("❌ Failed to fetch reviews:", res.status, res.statusText); return; } // Early return on bad response
            // Parse the JSON response
            const data: unknown = await res.json();
            // ✅ Validate response before setting state
            if (isReviewsResponse(data)) setReviews(data.reviews);
            else console.error("❌ Invalid review data shape:", data);
        } catch (err) {
            // ✅ Catch and log any errors during fetch or parsing
            console.error("❌ Error fetching reviews:", err);
        }
    };

    useEffect(() => void fetchReviews(), []);

    return (
        <section
            className="w-full h-[60vh] my-[5rem] px-[1rem] sm:px-[3rem] md:px-[5rem] flex flex-col items-center justify-center"
        >
            {
                reviews.length > 0 ? (
                    <article className="w-fit mx-[2rem] [&>*]:max-w-xl h-fit grid-cols-[1fr_1fr_1fr] grid-rows-[auto_auto_auto_auto] gap-y-[1rem] grid items-center justify-center my-[1rem]"
                        style={{ fontFamily: "--var-shippori-serif" }}
                    >
                        {/* title & rating */}
                        <h3 className="h-fit font-extralight flex flex-row gap-2 items-center justify-center w-full text-center col-span-3 text-[clamp(1rem,3vw,1.2rem)]">
                            <span>{reviews[currentPage].rating?.value} / {reviews[currentPage].rating?.outOf}</span>
                            |
                            <span>{reviews[currentPage].title}</span>
                        </h3>
                        {/* body */}
                        <p className="h-fit col-span-3 text-[clamp(.8rem,2vw,1rem)] text-center italic text-stone-800 leading-relaxed">
                            &ldquo;{reviews[currentPage].body}&rdquo;
                        </p>
                        {/* author */}
                        <footer className="h-fit w-full flex items-center justify-center text-[clamp(.8rem,2vw,1rem)] text-center text-stone-800 col-span-3">
                            - {reviews[currentPage].name}, stayed {reviews[currentPage].stayed}
                        </footer>
                        {/* Left Arrow */}
                        <div className="w-full h-[2rem] px-[3rem] col-span-1 row-span-1 flex items-center justify-center opacity-40 hover:opacity-100 cursor-pointer transition duration-200">
                            <div className="relative w-full h-auto aspect-[1/5]">
                                <Image
                                    src="/arrow.png"
                                    fill
                                    objectFit="contain"
                                    alt="Previous Review"
                                    onClick={() => setCurrentPage(prev => prev === 0 ? reviews.length - 1 : prev - 1)}
                                />
                            </div>
                        </div>
                        {/* Page */}
                        <div className="w-full h-fit col-span-1 row-span-1 flex items-center justify-center text-stone-800 text-[clamp(.8rem,2vw,1rem)]">
                            Review {currentPage + 1} of {reviews.length}
                        </div>
                        {/* Right Arrow */}
                        <div className="w-full h-[2rem] px-[3rem] col-span-1 row-span-1 flex items-center justify-center opacity-40 hover:opacity-100 cursor-pointer transition duration-200">
                            <div className="relative w-full h-auto aspect-[1/5] scale-x-[-1]">
                                <Image
                                    src="/arrow.png"
                                    fill
                                    objectFit="contain"
                                    alt="Previous Review"
                                    onClick={() => setCurrentPage(prev => prev === reviews.length - 1 ? 0 : prev + 1)}
                                />
                            </div>
                        </div>

                    </article>
                ) : (
                    <div className="flex items-center justify-center">
                        {
                            ['_', '_', '_'].map((dot, idx) => (
                                <motion.span
                                    key={idx}
                                    className="w-2 h-2 bg-gray-800 rounded-full mx-[2px]"
                                    initial={{ y: 0 }}
                                    animate={{ y: -5 }}
                                    transition={{
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        duration: 0.5,
                                        delay: idx * 0.2,
                                    }}
                                />
                            ))
                        }
                    </div>
                )
            }
        </section>
    );
}