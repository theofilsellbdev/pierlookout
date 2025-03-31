// Import OptimizedImage at the top
import OptimizedImage from "@/components/forms/OptimizedImage";
import { Display, Title, Heading, Subheading, Lead, Body, Small } from "@/components/Typography";
import Link from "next/link";
import React, { JSX, useState, useEffect } from "react";
import ReviewsSlider from "@/components/ReviewsSlider"; // Assuming this component exists

// --- LinkElement Component (No changes needed) ---
interface LinkProps {
  href: string;
  className?: string;
  variant?: 'small' | 'body' | 'lead' | 'subheading' | 'heading' | 'title' | 'display';
  children: React.ReactNode;
  onClick?: () => void;
}

export function LinkElement({
  href,
  className,
  variant = 'small',
  children,
  onClick
}: LinkProps): JSX.Element {
  const linkClasses = `hover:underline transition-all ${className || ''}`;

  // Map variant to appropriate Typography component
  switch (variant) {
    case 'display':
      return (
        <Link href={href} onClick={onClick}>
          <Display className={linkClasses}>{children}</Display>
        </Link>
      );
    case 'title':
      return (
        <Link href={href} onClick={onClick}>
          <Title className={linkClasses}>{children}</Title>
        </Link>
      );
    case 'heading':
      return (
        <Link href={href} onClick={onClick}>
          <Heading className={linkClasses}>{children}</Heading>
        </Link>
      );
    case 'subheading':
      return (
        <Link href={href} onClick={onClick}>
          <Subheading className={linkClasses}>{children}</Subheading>
        </Link>
      );
    case 'lead':
      return (
        <Link href={href} onClick={onClick}>
          <Lead className={linkClasses}>{children}</Lead>
        </Link>
      );
    case 'body':
      return (
        <Link href={href} onClick={onClick}>
          <Body className={linkClasses}>{children}</Body>
        </Link>
      );
    case 'small':
    default:
      return (
        <Link href={href} onClick={onClick}>
          <Small className={linkClasses}>{children}</Small>
        </Link>
      );
  }
}

// --- Navbar Component (Updated navigationLinks) ---
export function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Menu navigation links - REMOVED Local Directory, Terms, Privacy
  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Book Now', href: '/booking' },
    { name: 'Gallery', href: '/gallery' },
    // { name: 'Local Directory', href: '/local' }, // Removed
    { name: 'Contact', href: '/contact' },
    // { name: 'Terms & Conditions', href: '/terms' }, // Removed
    // { name: 'Privacy Policy', href: '/privacy' }, // Removed
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scrolling when menu is open
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'visible';
  };

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      // Reset overflow when component unmounts
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="w-[90vw] md:w-[80vw] mx-auto flex flex-row justify-between items-center h-fit py-5 relative">
        <div>
          <button
            onClick={toggleMenu}
            className="text-stone-700 hover:text-stone-900 transition-all focus:outline-none"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
          >
            <Small className="text-stone-700 font-medium">Menu</Small>
          </button>
        </div>

        <Lead className="font-[--font-shippori-serif] uppercase tracking-widest hidden md:block text-stone-800">
          PIER LOOKOUT
        </Lead>

        <div>
          <LinkElement href="/booking" className="text-stone-700 font-medium">
            Book
          </LinkElement>
        </div>

        {/* Title for mobile - full width and centered */}
        <Lead className="font-[--font-shippori-serif] uppercase tracking-widest absolute left-1/2 transform -translate-x-1/2 md:hidden text-stone-800">
          PIER LOOKOUT
        </Lead>
      </div>

      {/* Side Menu Overlay */}
      {mounted && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
              menuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeMenu}
            aria-hidden="true"
          ></div>

          {/* Full Screen Menu */}
          <div
            className={`fixed inset-0 bg-white z-50 transform transition-transform duration-500 ease-out ${
              menuOpen ? 'translate-x-0' : '-translate-x-full'
            } flex flex-col md:flex-row overflow-y-auto overflow-x-hidden`}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            {/* Menu Content Container */}
            <div className="flex flex-col w-full md:w-1/2 lg:w-3/5 h-full relative">
              {/* Close Button */}
              <button
                onClick={closeMenu}
                className="absolute top-6 right-6 text-stone-500 hover:text-stone-900 transition-all focus:outline-none z-10"
                aria-label="Close menu"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Menu Header */}
              <div className="p-6 md:p-10 border-b border-stone-200">
                <Lead className="font-[--font-shippori-serif] uppercase tracking-widest text-stone-700">
                  Pier Lookout
                </Lead>
              </div>

              {/* Menu Links */}
              <nav className="flex-1 p-6 md:p-10">
                <ul className="space-y-6">
                  {/* Mapped links reflect the updated navigationLinks array */}
                  {navigationLinks.map((link) => (
                    <li key={link.name}>
                      <LinkElement
                        href={link.href}
                        variant="body"
                        className="text-stone-600 font-medium uppercase tracking-wider font-[--font-shippori-serif] hover:text-stone-900 hover:no-underline"
                        onClick={closeMenu}
                      >
                        {link.name}
                      </LinkElement>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Contact Information */}
              <div className="p-6 md:p-10 border-t border-stone-200">
                <Small className="text-stone-700 font-medium uppercase tracking-wide mb-4 block">
                  Contact Information
                </Small>
                <div className="flex flex-col gap-2 mb-4">
                  <Small className="text-stone-600">
                    Flat 5, 3 Grand Parade
                  </Small>
                  <Small className="text-stone-600">
                    Eastbourne, East Sussex BN21 3EH
                  </Small>
                  <Small className="text-stone-600">
                    United Kingdom
                  </Small>
                  <a href="mailto:bookings@pierlookout.com" className="text-stone-600 hover:text-stone-900 transition-colors group">
                    <Small className="group-hover:underline">bookings@pierlookout.com</Small>
                  </a>
                </div>

                <Small className="text-stone-500">
                  © {new Date().getFullYear()} Pier Lookout
                </Small>
              </div>
            </div>

            {/* Right Image Panel */}
            <div className="hidden md:block md:w-1/2 lg:w-2/5 h-full relative bg-stone-900 overflow-hidden">
              <div className="absolute inset-0">
                <OptimizedImage
                  path="Pier"
                  alt="View from Pier Lookout apartment"
                  objectFit="cover"
                  className="w-full h-full opacity-60"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                 <ReviewsSlider />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// --- Footer Component (Updated footerLinks) ---
export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  // Footer navigation links - REMOVED Local Directory, Terms, Privacy
  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Book Now', href: '/booking' },
    { name: 'Gallery', href: '/gallery' },
    // { name: 'Local Directory', href: '/local' }, // Removed
    { name: 'Contact', href: '/contact' },
    // { name: 'Terms & Conditions', href: '/terms' }, // Removed
    // { name: 'Privacy Policy', href: '/privacy' }, // Removed
  ];

  return (
    <footer className="w-full border-t border-slate-200 pt-12 pb-6 bg-[#FAFCFC]">
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
              <a href="mailto:bookings@pierlookout.com" className="text-slate-600 hover:text-slate-900 transition-colors group">
                <Small className="group-hover:underline">bookings@pierlookout.com</Small>
              </a>
            </div>
          </div>

          {/* Column 3: Links */}
          <div className="flex flex-col gap-4">
            <Small className="text-slate-700 font-medium uppercase tracking-wide">
              Quick Links
            </Small>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {/* Mapped links reflect the updated footerLinks array */}
              {footerLinks.map((link) => (
                <LinkElement
                  key={link.name}
                  href={link.href}
                  variant="small"
                  className="text-slate-600 hover:text-slate-900 hover:no-underline"
                >
                  {link.name}
                </LinkElement>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright line */}
        <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <Small className="text-slate-500 text-center md:text-left mb-2 md:mb-0">
            © {currentYear} Pier Lookout. All rights reserved.
          </Small>
          <Small className="text-slate-500 text-center md:text-right">
            Website designed by <a href="https://humphreysstudio.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors underline hover:no-underline">{`Humphrey's Studio`}</a>
          </Small>
        </div>
      </div>
    </footer>
  );
}