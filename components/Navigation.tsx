import { Display, Title, Heading, Subheading, Lead, Body, Small } from "@/components/Typography";
import Link from "next/link";
import React, { JSX } from "react";

interface LinkProps {
  href: string;
  className?: string;
  variant?: 'small' | 'body' | 'lead' | 'subheading' | 'heading' | 'title' | 'display';
  children: React.ReactNode;
}

export function LinkElement({ 
  href, 
  className, 
  variant = 'small', 
  children 
}: LinkProps): JSX.Element {
  const linkClasses = `hover:underline transition-all ${className || ''}`;
  
  // Map variant to appropriate Typography component
  switch (variant) {
    case 'display':
      return (
        <Link href={href}>
          <Display className={linkClasses}>{children}</Display>
        </Link>
      );
    case 'title':
      return (
        <Link href={href}>
          <Title className={linkClasses}>{children}</Title>
        </Link>
      );
    case 'heading':
      return (
        <Link href={href}>
          <Heading className={linkClasses}>{children}</Heading>
        </Link>
      );
    case 'subheading':
      return (
        <Link href={href}>
          <Subheading className={linkClasses}>{children}</Subheading>
        </Link>
      );
    case 'lead':
      return (
        <Link href={href}>
          <Lead className={linkClasses}>{children}</Lead>
        </Link>
      );
    case 'body':
      return (
        <Link href={href}>
          <Body className={linkClasses}>{children}</Body>
        </Link>
      );
    case 'small':
    default:
      return (
        <Link href={href}>
          <Small className={linkClasses}>{children}</Small>
        </Link>
      );
  }
};

export function Navbar(): JSX.Element {
  return (
    <div className="w-[90vw] md:w-[80vw] mx-auto flex flex-row justify-between items-center h-fit py-5">
      <div>
        <LinkElement href="/menu">Menu</LinkElement>
      </div>
      
      <Lead className="font-[--font-shippori-serif] uppercase tracking-widest hidden md:block">
        PIER LOOKOUT
      </Lead>
      
      <div>
        <LinkElement href="/">Book</LinkElement>
      </div>
      
      {/* Title for mobile - full width and centered */}
      <Lead className="font-[--font-shippori-serif] uppercase tracking-widest absolute left-1/2 transform -translate-x-1/2 md:hidden">
        PIER LOOKOUT
      </Lead>
    </div>
  );
}

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  
  // Footer navigation links
  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Book Now', href: '/booking' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Local Directory', href: '/local' },
    { name: 'Contact', href: '/contact' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <footer className="w-full border-t border-slate-200 pt-12 pb-6">
      <div className="w-[90vw] md:w-[80vw] mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Column 1: About */}
          <div className="flex flex-col gap-4">
            <Lead className="font-[--font-shippori-serif] uppercase tracking-widest text-slate-700">
              Pier Lookout
            </Lead>
            <Small className="text-slate-600 leading-relaxed">
              {`A top floor regency flat with breathtaking views of the Eastbourne pier and seafront.
              The perfect place to relax and enjoy the beauty of the East Sussex coast.`}
            </Small>
          </div>
          
          {/* Column 2: Contact Information */}
          <div className="flex flex-col gap-4">
            <Small className="text-slate-700 font-medium uppercase tracking-wide">
              Contact Information
            </Small>
            <div className="flex flex-col gap-2">
              <Small className="text-slate-600">
                Flat 5, 3 Grand Parade
              </Small>
              <Small className="text-slate-600">
                Eastbourne, East Sussex BN21 3EH
              </Small>
              <Small className="text-slate-600">
                United Kingdom
              </Small>
              <a href="mailto:bookings@pierlookout.com" className="text-slate-600 hover:text-slate-900 transition-colors">
                <Small>bookings@pierlookout.com</Small>
              </a>
            </div>
          </div>
          
          {/* Column 3: Links */}
          <div className="flex flex-col gap-4">
            <Small className="text-slate-700 font-medium uppercase tracking-wide">
              Quick Links
            </Small>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map((link) => (
                <LinkElement
                  key={link.name}
                  href={link.href}
                  variant="small"
                  className="text-slate-600 hover:text-slate-900"
                >
                  {link.name}
                </LinkElement>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright line */}
        <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <Small className="text-slate-500 text-center md:text-left">
            © {currentYear} Pier Lookout. All rights reserved.
          </Small>
          <Small className="text-slate-500 mt-2 md:mt-0 text-center md:text-right">
            Website designed by <a href="https://humphreysstudio.com" className="hover:text-slate-700 transition-colors">{`Humphrey's Studio`}</a>
          </Small>
        </div>
      </div>
    </footer>
  );
}