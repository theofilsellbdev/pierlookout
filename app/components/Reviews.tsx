"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { franc } from "franc";
import langs from "langs";
import { trackEvent } from "@/lib/analytics";

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

function detectLanguage(text: string) {
  const code = franc(text); // e.g. "eng", "deu", "fra", etc.

  if (code === "und") return { iso: "und", language: "Unknown" };

  const lang = langs.where("3", code);
  return {
    iso: code,
    language: lang?.name ?? "Unknown",
  };
}

export default function Reviews() {
  const [reviews, setReviews] = useState<EviivoReview[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const hasLoggedSectionViewRef = useRef(false);
  const hasLoggedInitialImpressionRef = useRef(false);

  const fetchReviews = async () => {
    try {
      let hasNext = true;
      let p = 1;
      let allReviews: EviivoReview[] = [];

      while (hasNext) {
        const res = await fetch(
          `/api/eviivo-reviews?shortname=PierLookoutBN21&page=${p}`,
          { next: { revalidate: 3600 } }
        );

        if (!res.ok) {
          console.error(
            "❌ Failed to fetch reviews:",
            res.status,
            res.statusText
          );
          trackEvent("reviews_fetch_error", {
            status: res.status,
          });
          return;
        }

        const data: unknown = await res.json();

        if (isReviewsResponse(data)) {
          const filteredReviews = data.reviews.filter((review) => {
            const { iso } = detectLanguage(review.body);
            return iso === "eng";
          });

          allReviews = allReviews.concat(filteredReviews);
          hasNext = data.hasNext;
          p += 1;
        } else {
          console.error("❌ Invalid review data shape:", data);
          trackEvent("reviews_fetch_error", {
            reason: "invalid_shape",
          });
          return;
        }
      }

      setReviews(allReviews);

      trackEvent("reviews_fetch_success", {
        total_reviews: allReviews.length,
      });
    } catch (err) {
      console.error("❌ Error fetching reviews:", err);
      trackEvent("reviews_fetch_error", {
        reason: "exception",
      });
    }
  };

  // Fetch reviews on mount
  useEffect(() => {
    void fetchReviews();
  }, []);

  // Track when the reviews section enters the viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const element = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoggedSectionViewRef.current) {
            hasLoggedSectionViewRef.current = true;

            trackEvent("section_view", {
              section_id: "reviews",
            });

            // Initial impression if we already have reviews
            if (reviews.length > 0 && !hasLoggedInitialImpressionRef.current) {
              hasLoggedInitialImpressionRef.current = true;
              const review = reviews[0];
              trackEvent("review_impression", {
                index: 1,
                stayed: review.stayed,
              });
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [reviews]);

  // Track review impressions when the current page changes
  useEffect(() => {
    if (!hasLoggedSectionViewRef.current) return;
    if (reviews.length === 0) return;

    const review = reviews[currentPage];

    trackEvent("review_impression", {
      index: currentPage + 1,
      stayed: review.stayed,
    });
  }, [currentPage, reviews]);

  const handlePrev = () => {
    if (reviews.length === 0) return;

    const nextIndex =
      currentPage === 0 ? reviews.length - 1 : currentPage - 1;

    trackEvent("reviews_prev_click", {
      from_index: currentPage + 1,
      to_index: nextIndex + 1,
    });

    setCurrentPage(nextIndex);
  };

  const handleNext = () => {
    if (reviews.length === 0) return;

    const nextIndex =
      currentPage === reviews.length - 1 ? 0 : currentPage + 1;

    trackEvent("reviews_next_click", {
      from_index: currentPage + 1,
      to_index: nextIndex + 1,
    });

    setCurrentPage(nextIndex);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full h-[60vh] my-[5rem] px-[1rem] sm:px-[3rem] md:px-[5rem] flex flex-col items-center justify-center"
      style={{ fontFamily: "--var-shippori-serif" }}
    >
      {reviews.length > 0 ? (
        <article className="w-fit mx-[2rem] [&>*]:max-w-xl h-fit grid-cols-[1fr_1fr_1fr] grid-rows-[auto_auto_auto_auto] gap-y-[1rem] grid items-center justify-center my-[1rem]">
          {/* title & rating */}
          <h3 className="h-fit font-extralight flex flex-row gap-2 items-center justify-center w-full text-center col-span-3 text-[clamp(1rem,3vw,1.2rem)]">
            <span>
              {reviews[currentPage].rating?.value} /{" "}
              {reviews[currentPage].rating?.outOf}
            </span>
            |
            <span>{reviews[currentPage].title}</span>
          </h3>
          {/* body */}
          <p className="h-fit col-span-3 text-[clamp(.8rem,2vw,1rem)] text-center italic text-stone-800 leading-relaxed">
            &ldquo;{reviews[currentPage].body}&rdquo;
          </p>
          {/* author */}
          <footer className="h-fit w-full flex items-center justify-center text-[clamp(.8rem,2vw,1rem)] text-center text-stone-800 col-span-3">
            - {reviews[currentPage].name}, stayed{" "}
            {reviews[currentPage].stayed}
          </footer>
          {/* Left Arrow */}
          <div className="w-full h-[2rem] px-[3rem] col-span-1 row-span-1 flex items-center justify-center opacity-40 hover:opacity-100 cursor-pointer transition duration-200">
            <div className="relative w-full h-auto aspect-[1/5] min-w-[50px]">
              <Image
                src="/arrow.png"
                fill
                objectFit="contain"
                alt="Previous Review"
                onClick={handlePrev}
              />
            </div>
          </div>
          {/* Page */}
          <div className="w-full h-fit col-span-1 row-span-1 flex items-center justify-center text-stone-800 text-[clamp(.8rem,2vw,1rem)]">
            Review {currentPage + 1} of {reviews.length}
          </div>
          {/* Right Arrow */}
          <div className="w-full h-[2rem] px-[3rem] col-span-1 row-span-1 flex items-center justify-center opacity-40 hover:opacity-100 cursor-pointer transition duration-200">
            <div className="relative w-full h-auto aspect-[1/5] scale-x-[-1] min-w-[50px]">
              <Image
                src="/arrow.png"
                fill
                objectFit="contain"
                alt="Next Review"
                onClick={handleNext}
              />
            </div>
          </div>
        </article>
      ) : (
        <div className="flex items-center justify-center">
          {["_", "_", "_"].map((dot, idx) => (
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
          ))}
        </div>
      )}
    </section>
  );
}