"use client"

import { Footer, Navbar } from "@/components/Navigation";
import { JSX } from "react";

import LocalDirectory from "./LocalDirectory";
import LandingSection from "./Landing";
import HeroSection from "./HeroTitle";
import Reviews from "./Reviews";
import Gallery from "./Gallery";
import ContactSection from "./ContactSection";
import InformationSection from "./InformationSection";

export default function HomeClient(): JSX.Element {
    return (
        <div className="w-screen min-h-screen flex flex-col overflow-y-auto bg-[#FAFCFC]">
            <Navbar />
            <LandingSection />
            <HeroSection />
            <Reviews />
            <Gallery />
            <LocalDirectory />
            <ContactSection />
            <InformationSection />
            <Footer />
        </div>
    );
}