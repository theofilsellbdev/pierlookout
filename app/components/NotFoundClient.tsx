'use client';

import React from 'react';
import { Navbar, Footer } from "@/components/Navigation";
import OptimizedImage from "@/components/OptimisedImage";
import Link from "next/link";

export default function NotFoundClient() {
  // Button animation on hover
  const buttonAnimation = "transform transition-transform duration-300 hover:scale-105 active:scale-95";

  return (
    <div className="w-screen min-h-screen flex flex-col overflow-y-auto bg-[#FAFCFC]"
      style={{fontFamily: "--var-shippori-serif"}}
    >
      <header>
        <Navbar />
      </header>

      <main className="flex-grow">
        {/* 404 Content */}
        <section className="w-[90vw] md:w-[80vw] h-[40vh] mx-auto bg-gray-200 relative mb-12">
          <OptimizedImage
            path="LandingFF"
            alt="Clouds"
            objectFit="cover"
            quality={100}
          />

          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/40">
            <h1 className="text-white font-[--font-shippori-serif] uppercase tracking-widest text-shadow text-[clamp(.9rem,2vw,1.5rem)]">
              Page Not Found
            </h1>
          </div>
        </section>

        {/* 404 Message */}
        <section className="w-[90vw] md:w-[80vw] max-w-2xl mx-auto text-center mb-20">
          <h2 className="font-[--font-shippori-serif] text-stone-800 mb-[clamp(.4rem,2vw,.8rem)] text-[clamp(.8rem,2vw,1.2rem)] font-light">
            {`We couldn't find that page`}
          </h2>
          
          <h3 className="text-stone-700 font-medium mb-[clamp(.4rem,2vw,.8rem)] text-[clamp(.75rem,2vw,1rem)] leading-relaxed">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/"
              className={`px-6 py-4 outline outline-offset-[-1px] outline-stone-600 flex justify-center items-center transition-colors ${buttonAnimation}`}
            >
              <p className="text-stone-700 font-medium font-[--font-shippori-serif] uppercase tracking-widest text-center text-[clamp(.8rem,2vw,1rem)]">
                Return Home
              </p>
            </Link>
            
            <Link 
              href="https://via.eviivo.com/PierLookoutBN21" 
              className={`px-6 py-4 outline outline-offset-[-1px] outline-stone-600 flex justify-center items-center transition-colors ${buttonAnimation}`}
            >
              <p className="text-stone-700 font-medium font-[--font-shippori-serif] uppercase tracking-widest text-center text-[clamp(.8rem,2vw,1rem)]">
                Book The Flat
              </p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}