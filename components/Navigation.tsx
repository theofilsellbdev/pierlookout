// Import OptimizedImage at the top
import Link from "next/link";
import React, { JSX, useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Navbar Component (Updated navigationLinks) ---
export function Navbar(): JSX.Element {
  const [navHeight, setNavHeight] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [finishedAnimation, setFinishedAnimation] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      }
      else if (window.scrollY < 10) {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      const navElement = document.querySelector('nav');
      if (navElement) {
        setNavHeight(navElement.clientHeight);
      }
    };

    handleResize(); // Initial height set
    handleScroll(); // Initial scroll check

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-fit">
      {/*  Height adjuster to reposition other elements */}
      <motion.div
        initial={{ height: "1rem" }}
        animate={{ height: navHeight }}
        transition={{ delay: 1, duration: 2 }}
        className={`block bg-[#FAFCFC]`}
      />

      <motion.nav className="fixed top-0 left-0 z-100 flex flex-row justify-between items-center w-full h-fit py-[clamp(0.5rem,2vw,1rem)] px-[1rem]"
        initial={{ backgroundColor: "rgba(250, 252, 252, 0)" }}
        animate={{ backgroundColor: scrolled && finishedAnimation ? "rgba(250, 252, 252, 1)" : "rgba(250, 252, 252, 0)" }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="w-fit h-fit text-black tracking-widest"
          style={{ fontFamily: "var(--font-shippori-serif)", fontSize: "clamp(.5rem, 2vw, .8rem)" }}
        >
          {"PIER LOOKOUT".split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (index * 0.1) + 7, duration: 0 }}
              style={{ display: 'inline-block' }}
              // Set finished animation when this animation begins
              onAnimationStart={() => {
                if (index === 0) {
                  setTimeout(() => setFinishedAnimation(true), 7000);
                }
              }}


            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
        <Link
          href="https://via.eviivo.com/PierLookoutBN21"
          className="w-fit h-fit text-black tracking-widest text-right relative group"
          style={{ fontFamily: "var(--font-shippori-serif)", fontSize: "clamp(.5rem, 2vw, .8rem)" }}
        >
          {"BOOK NOW".split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .8 - (index * 0.1) + 7, duration: 0 }}
              style={{ display: 'inline-block' }}

            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          <div
            className="absolute left-0 -bottom-1 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform"
          />
        </Link>

      </motion.nav>
    </div>
  )
}



export function Footer(): JSX.Element {
  return (
    <footer
      className="w-full h-fit bg-gray-100 flex items-center justify-center py-4 px-[2rem]"
      style={{ fontFamily: "--var-shippori-serif" }}
    >
      <p className="text-[clamp(.6rem,2vw,.8rem)] text-center">
        Pier Lookout, {new Date().getFullYear()}
      </p>
    </footer>
  );
}