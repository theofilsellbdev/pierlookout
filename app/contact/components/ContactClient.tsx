'use client';

import React from 'react';
import { Navbar, Footer } from "@/components/Navigation";
import { Heading, Subheading, Lead, Body } from "@/components/Typography";
import OptimizedImage from "@/components/forms/OptimizedImage";
import Link from "next/link";
import ContactInfo from './ContactInfo';
import ContactForm from '@/components/forms/ContactForm';
import GoogleMap from '@/components/forms/GoogleMap';


export default function ContactPageClient() {
  // Button animation on hover - converted to Tailwind classes
  const buttonAnimation = "transform transition-transform duration-300 hover:scale-105 active:scale-95";

  // Address constants for reusability
  const propertyAddress = {
    line1: "Flat 5, 3 Grand Parade Eastbourne",
    line2: "East Sussex BN21 3EH",
    mapUrl: "https://maps.google.com/?q=3+Grand+Parade+Eastbourne+East+Sussex+BN21+3EH+United+Kingdom"
  };

  return (
    <div className="w-screen min-h-screen flex flex-col overflow-y-auto bg-[#FAFCFC]">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow">
        {/* Header Image */}
        <section className="w-[90vw] md:w-[80vw] h-[50vh] mx-auto bg-slate-300 relative mb-12">
          <OptimizedImage
            path="Window"
            alt="View from Pier Lookout"
            objectFit="cover"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Heading className="text-white font-[--font-shippori-serif] uppercase tracking-widest text-shadow">
              Contact Us
            </Heading>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-[90vw] md:w-[80vw] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 mb-16">
            {/* Contact Information */}
            <div className="w-full lg:w-2/5 space-y-8">
              <div>
                <Subheading className="font-[--font-shippori-serif] text-stone-800 mb-4">
                  Get In Touch
                </Subheading>
                <Body className="text-stone-700 font-medium leading-relaxed">
                  {`We'd love to hear from you. Please feel free to contact us with any questions about 
                  your stay at Pier Lookout, or for booking information.`}
                </Body>
              </div>

              <ContactInfo address={propertyAddress} />
              
              {/* Map */}
              <div className="pt-6">
                <Body className="text-stone-800 font-medium mb-4">Location</Body>
                <GoogleMap
                  address={propertyAddress.line1}
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full lg:w-3/5">
              <div className="bg-white p-8 border border-stone-200">
                <Subheading className="font-[--font-shippori-serif] text-stone-800 mb-6">
                  Send a Message
                </Subheading>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="w-[90vw] md:w-[80vw] mx-auto mb-20">
          <div className="bg-stone-100 border border-stone-200 p-8 md:p-12 flex flex-col items-center text-center">
            <Subheading className="font-[--font-shippori-serif] text-stone-800 mb-4">
              Ready to Book Your Stay?
            </Subheading>
            <Lead className="text-stone-700 font-medium max-w-2xl mx-auto mb-8">
              Experience the breathtaking views and luxurious comfort of Pier Lookout. 
              Book your stay now for an unforgettable experience on the Eastbourne seafront.
            </Lead>
            <Link 
              href="/" 
              className={`w-full max-w-md px-6 py-4 outline outline-offset-[-1px] outline-stone-600 flex justify-center items-center hover:bg-white transition-colors ${buttonAnimation}`}
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