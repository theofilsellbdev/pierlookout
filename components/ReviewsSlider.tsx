'use client';

import React, { useState, useEffect } from 'react';
import { Lead, Small } from "@/components/Typography";

interface Review {
    name: string;
    date: string;
    rating: string;
    title: string;
    content: string;
    recommend?: boolean;
}

export default function ReviewsSlider() {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Reviews data
    const reviews: Review[] = [
        {
            name: "Leigh",
            date: "Mar 25",
            rating: "5/5",
            title: "Perfect stay",
            content: "We had a lovely stay at this beautiful apartment. It's immaculately clean and well equipped with everything you could need. Ideally situated on the seafront within walking distance from the Pier, shops and restaurants. We look forward to returning in the future",
            recommend: true
        },
        {
            name: "Martin",
            date: "Oct 24",
            rating: "5/5",
            title: "All was good. Accomodation, location.",
            content: "We loved the accommodation and was looked after very well. Amazing views from the flat. Found two lovely restaurants The Glass House and Pierre Bistrop."
        },
        {
            name: "Amita",
            date: "Sep 24",
            rating: "5/5",
            title: "Just what the doctor ordered for my mental wellness",
            content: "Nice location. Clean apartment. Only negative thing was the steps",
            recommend: true
        },
        {
            name: "Tamanna",
            date: "Jun 24",
            rating: "5/5",
            title: "Comfortable, clean and accommodating for all our needs!",
            content: "The flat was spacious, the bed clean and the view was really special. Perfect location. Thank you!",
            recommend: true
        },
        {
            name: "Judith",
            date: "Mar 24",
            rating: "5/5",
            title: "Lovely place for a great weekend.",
            content: "It was convenient, clean and quiet.",
            recommend: true
        }
    ];

    // Set up the interval for cycling through reviews
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsTransitioning(true);

            // Change to next review after fade-out completes
            setTimeout(() => {
                setCurrentReviewIndex((prevIndex) =>
                    prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
                );

                // Reset transition state after changing review
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 300);
            }, 300);
        }, 8000); // 8 seconds between reviews

        return () => clearInterval(intervalId);
    }, [reviews.length]);

    const currentReview = reviews[currentReviewIndex];

    return (
        <div className="p-6 text-white">
            <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-1 items-baseline">
                        <Small className=" tracking-wide text-white/80">{currentReview.name}</Small>
                        <Small className="text-white/80">• Stayed: {currentReview.date}</Small>
                    </div>
                    <Small className=" text-white/80">{currentReview.rating}</Small>
                </div>

                <Small className=" mb-2 block text-white/80">{currentReview.title}</Small>

                <Lead className="text-white leading-relaxed mb-2">
                    {currentReview.content}
                </Lead>

                <Small className="text-white/80 italic">Would Recommend</Small>
            </div>
        </div>
    );
}