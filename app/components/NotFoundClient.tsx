'use client';

import React from 'react';
import { Navbar, Footer } from "@/components/Navigation";
import { Heading, Subheading, Lead, Body } from "@/components/Typography";
import OptimizedImage from "@/components/forms/OptimizedImage";
import Link from "next/link";

export default function NotFoundClient() {
  // Button animation on hover
  const buttonAnimation = "transform transition-transform duration-300 hover:scale-105 active:scale-95";

  return (
    <div className="w-screen min-h-screen flex flex-col overflow-y-auto bg-[#FAFCFC]">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow">
        {/* 404 Content */}
        <section className="w-[90vw] md:w-[80vw] h-[40vh] mx-auto bg-slate-300 relative mb-12">
          <OptimizedImage
            path="Window"
            alt="View from Pier Lookout"
            objectFit="cover"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Heading className="text-white font-[--font-shippori-serif] uppercase tracking-widest text-shadow">
              Page Not Found
            </Heading>
          </div>
        </section>

        {/* 404 Message */}
        <section className="w-[90vw] md:w-[80vw] max-w-2xl mx-auto text-center mb-20">
          <Subheading className="font-[--font-shippori-serif] text-stone-800 mb-6">
            {`We couldn't find that page`}
          </Subheading>
          
          <Lead className="text-stone-700 font-medium mb-10">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </Lead>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/"
              className={`px-6 py-4 outline outline-offset-[-1px] outline-stone-600 flex justify-center items-center hover:bg-stone-50 transition-colors ${buttonAnimation}`}
            >
              <Body className="text-stone-700 font-medium font-[--font-shippori-serif] uppercase tracking-widest text-center">
                Return Home
              </Body>
            </Link>
            
            <Link 
              href="/booking" 
              className={`px-6 py-4 outline outline-offset-[-1px] outline-stone-600 flex justify-center items-center hover:bg-stone-50 transition-colors ${buttonAnimation}`}
            >
              <Body className="text-stone-700 font-medium font-[--font-shippori-serif] uppercase tracking-widest text-center">
                Book The Flat
              </Body>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}