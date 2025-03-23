"use client"

import { Navbar } from "@/components/Navigation";
import { JSX } from "react";
import LandingImage from "./LandingImage";
import BookingNavigation from "./BookingNavigation";
import { ReviewSection } from "./ReviewSection";

export default function HomeClient() : JSX.Element {
    return (
        <div className="w-screen min-h-screen flex flex-col overflow-y-scroll bg-[#FAFCFC]">
            {/* Section 1 - Navigation */}
            <Navbar></Navbar>
            <LandingImage></LandingImage>
            <BookingNavigation></BookingNavigation>
            <ReviewSection></ReviewSection>
        </div>
    )
}