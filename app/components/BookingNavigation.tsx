import React, { JSX, useState } from 'react';
import Link from 'next/link';
import { LinkElement } from '@/components/Navigation';
import { Body } from '@/components/Typography';

export default function BookingNavigation(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigationLinks = [
    { href: '/photographs', label: 'Photographs' },
    { href: '/local', label: 'Local Directory' },
    { href: '/contact', label: 'Contact Us' },
  ];
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Button animation on hover
  const buttonAnimation = "transform transition-transform duration-300 hover:scale-105 active:scale-95";
  
  return (
    <div className="w-[90vw] md:w-[80vw] mx-auto py-3 md:py-6">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 md:gap-8">
        {/* Book The Flat Button with animation */}
        <Link href="/booking" className={`w-full lg:w-auto ${buttonAnimation}`}>
          <div className="w-full lg:w-auto px-6 py-4 outline outline-offset-[-1px] outline-slate-600 flex justify-center items-center hover:bg-slate-50 transition-all">
            <Body className="text-slate-600 font-medium font-[--font-shippori-serif] uppercase tracking-[2.5px] text-center">
              Book The Flat
            </Body>
          </div>
        </Link>
        
        {/* Mobile Menu Button (visible on small screens only) */}
        <div className="sm:hidden w-full flex justify-end">
          <button 
            onClick={toggleMenu}
            className={`text-slate-600 font-medium font-[--font-shippori-serif] uppercase tracking-wider ${buttonAnimation}`}
          >
            Menu
            <span className={`ml-2 inline-block transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`}>
              {menuOpen ? '↑' : '↓'}
            </span>
          </button>
        </div>
        
        {/* Mobile Menu (dropdown) */}
        <div 
          className={`sm:hidden w-full overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col items-end gap-4 py-4">
            {navigationLinks.map((link) => (
              <LinkElement
                key={link.href}
                href={link.href}
                variant="body"
                className="uppercase tracking-widest font-[--font-shippori-serif] hover:text-slate-800"
              >
                {link.label}
              </LinkElement>
            ))}
          </div>
        </div>
        
        {/* Regular Navigation Links (visible on larger screens) */}
        <div className="hidden sm:flex justify-between w-full lg:w-auto lg:justify-end gap-3 sm:gap-6 md:gap-8 lg:gap-10">
          {navigationLinks.map((link) => (
            <LinkElement
              key={link.href}
              href={link.href}
              variant="body"
              className="uppercase tracking-widest font-[--font-shippori-serif] hover:text-slate-800 text-sm sm:text-base"
            >
              {link.label}
            </LinkElement>
          ))}
        </div>
      </div>
    </div>
  );
}