'use client';

import React from 'react';
import { Body } from "@/components/Typography"; // Assuming Typography components exist

interface GoogleMapProps {
  address: string; // The address to display on the map
  height?: string; // Optional height for the map container (e.g., "20rem", "400px")
  // mapUrl is no longer needed for embedding
}

/**
 * Renders an embedded Google Map using the Maps Embed API via an iframe.
 * Requires a Google Maps API Key stored in NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.
 */
export default function GoogleMap({
  address,
  height = "20rem" // Default height increased slightly
}: GoogleMapProps) {
  // --- Get API Key ---
  // IMPORTANT: Store your API key in .env.local as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // --- Construct Embed URL ---
  // URL-encode the address for the query parameter
  const encodedAddress = encodeURIComponent(address);
  // Base URL for the Maps Embed API 'place' mode
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`;

  // --- Render Logic ---
  if (!apiKey) {
    // Render a fallback/error message if the API key is missing (important for development)
    console.error("Google Maps API Key (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) is missing.");
    return (
      <div
        className="h-64 bg-red-100 border border-red-300 flex items-center justify-center text-center p-4"
        style={{ height }}
      >
        <Body className="text-red-700 font-medium">
          Map could not be loaded. <br />
          (Missing API Key configuration)
        </Body>
      </div>
    );
  }

  // Render the iframe if the API key exists
  return (
    <div
      className="relative border border-stone-300 overflow-hidden" // Added overflow-hidden
      style={{ height }} // Apply height to the container
    >
      <iframe
        title={`Google Map showing ${address}`} // Accessibility: Add a descriptive title
        width="100%"
        height="100%" // Make iframe fill the container
        style={{ border: 0 }} // Remove default iframe border
        loading="lazy" // Lazy load the map for performance
        allowFullScreen={false} // Usually false is fine for embeds, set to true if needed
        referrerPolicy="no-referrer-when-downgrade" // Recommended policy
        src={embedUrl}
      ></iframe>
    </div>
  );
}