'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Add type augmentation for Preline objects
declare global {
  interface Window {
    // *** REMOVE the '?' to match the likely existing required declaration ***
    HSStaticMethods: {
      autoInit: (collection?: string | string[] | null | undefined) => void; // Match expected signature if known, otherwise keep simple
      // You might need to add other methods here if you use them directly,
      // or ideally, find Preline's own type definition (e.g., IStaticMethods)
      // and use that if it's exported.
    };

    // Keep these optional as they might be specific additions
    $hsOverlayCollection?: unknown[];
    $hsDropdownCollection?: unknown[];
    $hsTooltipCollection?: unknown[];
    $hsAccordionCollection?: unknown[];
    $hsTabsCollection?: unknown[];
    $hsSelectCollection?: unknown[];
  }
}

export default function PrelineScript() {
  const path = usePathname();

  // --- Option 1: Keep Explicit Checks (Recommended for Clarity) ---
  // useEffect(() => {
  //   // Initialize collections (no change)
  //   if (typeof window !== 'undefined') {
  //     window.$hsOverlayCollection = window.$hsOverlayCollection || [];
  //     // ... other collections
  //     window.$hsSelectCollection = window.$hsSelectCollection || [];
  //   }

  //   const initPreline = async (): Promise<void> => {
  //     try {
  //       await import('preline/dist/preline.js');
  //       setTimeout(() => {
  //         // Runtime check remains crucial!
  //         if (typeof window !== 'undefined' &&
  //             window.HSStaticMethods && // Check existence
  //             typeof window.HSStaticMethods.autoInit === 'function') {
  //           window.HSStaticMethods.autoInit();
  //         }
  //       }, 100);
  //     } catch (error) {
  //       console.error('Error loading Preline:', error);
  //     }
  //   };
  //   initPreline().catch(err => console.error('Failed to initialize Preline:', err));
  // }, []);

  // useEffect(() => {
  //   // Runtime check remains crucial!
  //   if (typeof window !== 'undefined' &&
  //       window.HSStaticMethods && // Check existence
  //       typeof window.HSStaticMethods.autoInit === 'function') {
  //     setTimeout(() => {
  //       // Re-check inside timeout is safest
  //       if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
  //           window.HSStaticMethods.autoInit();
  //       }
  //     }, 100);
  //   }
  // }, [path]);


  // --- Option 2: Use Optional Chaining (Concise) ---
  useEffect(() => {
    // Initialize collections (no change)
    if (typeof window !== 'undefined') {
      window.$hsOverlayCollection = window.$hsOverlayCollection || [];
      window.$hsDropdownCollection = window.$hsDropdownCollection || [];
      window.$hsTooltipCollection = window.$hsTooltipCollection || [];
      window.$hsAccordionCollection = window.$hsAccordionCollection || [];
      window.$hsTabsCollection = window.$hsTabsCollection || [];
      window.$hsSelectCollection = window.$hsSelectCollection || [];
    }

    const initPreline = async (): Promise<void> => {
      try {
        // Dynamic import of Preline
        await import('preline/dist/preline.js');
        setTimeout(() => {
          // Optional chaining handles potential undefinedness at runtime
           if (typeof window !== 'undefined') { // Still need window check
              window.HSStaticMethods?.autoInit?.();
           }
        }, 100);
      } catch (error) {
        console.error('Error loading Preline:', error);
      }
    };

    initPreline().catch(err => console.error('Failed to initialize Preline:', err));
  }, []); // Empty dependency array: Run only once on mount

  useEffect(() => {
    // Re-initialize on path change using optional chaining
     if (typeof window !== 'undefined') { // Still need window check
       setTimeout(() => {
         window.HSStaticMethods?.autoInit?.();
       }, 100);
     }
  }, [path]); // Dependency array: Run when path changes


  return (<></>); // Return null or fragment, component must return something renderable
}