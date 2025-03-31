'use client';

import React from 'react';
import { Body, Small } from "@/components/Typography";

interface ContactInfoProps {
  address: {
    line1: string;
    line2: string;
  };
}

export default function ContactInfo({ address }: ContactInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <Body className="text-stone-800 font-medium">Address</Body>
        <Body className="text-stone-700 font-medium">
          {address.line1} <br />
          {address.line2}
        </Body>
      </div>

      <div>
        <Body className="text-stone-800 font-medium">Email</Body>
        <a
          href="mailto:bookings@pierlookout.com"
          className="text-stone-700 font-medium hover:text-stone-900 transition-colors"
        >
          <Body>bookings@pierlookout.com</Body>
        </a>
      </div>

      <div>
        <Body className="text-stone-800 font-medium">Social Media</Body>
        <div className="flex gap-4 mt-2">
          <a
            href="https://instagram.com/pierlookout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-700 font-medium hover:text-stone-900 transition-colors"
          >
            <Small>Instagram</Small>
          </a>
          <a
            href="https://facebook.com/pierlookout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-700 font-medium hover:text-stone-900 transition-colors"
          >
            <Small>Facebook</Small>
          </a>
        </div>
      </div>
      
      <div>
        <Body className="text-stone-800 font-medium">Phone</Body>
        <a
          href="tel:+441323123456"
          className="text-stone-700 font-medium hover:text-stone-900 transition-colors"
        >
          <Body>+44 1323 123456</Body>
        </a>
      </div>
    </div>
  );
}