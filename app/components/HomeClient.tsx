"use client"

import { Footer, Navbar } from "@/components/Navigation";
import { JSX } from "react";
import LandingImage from "./LandingImage";
import BookingNavigation from "./BookingNavigation";
import ReviewSection from "./ReviewSection";
import Gallery from "./Gallery";
import LocalDirectory from "./LocalDirectory";
import { ApartmentInfoSection } from "./ApartmentInfoSection";

export default function HomeClient(): JSX.Element {
    return (
        <div className="w-screen min-h-screen flex flex-col overflow-y-auto bg-[#FAFCFC]">
            <header>
                <Navbar />
            </header>
            <main>
                <LandingImage />
                <BookingNavigation />
                <ReviewSection />
                <Gallery />
                <ApartmentInfoSection />
                <LocalDirectory />
            </main>
            <Footer />
        </div>
    );
}