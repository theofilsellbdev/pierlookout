'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
// Import the type definition from Preline
// Adjust the path if necessary (e.g., 'preline/dist/types')
import type { IStaticMethods } from 'preline';

// Type augmentation using Preline's own type
declare global {
  interface Window {
    // Use the imported IStaticMethods type
    HSStaticMethods: IStaticMethods;

    // Keep these optional as they are likely custom additions or less commonly typed
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

  // Initialize the collections (needed for some Preline components)
  // Ensure this runs before the first autoInit call might need them
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.$hsOverlayCollection = window.$hsOverlayCollection || [];
      window.$hsDropdownCollection = window.$hsDropdownCollection || [];
      window.$hsTooltipCollection = window.$hsTooltipCollection || [];
      window.$hsAccordionCollection = window.$hsAccordionCollection || [];
      window.$hsTabsCollection = window.$hsTabsCollection || [];
      window.$hsSelectCollection = window.$hsSelectCollection || [];
    }
  }, []); // Run only once on mount

  // Effect for initializing Preline AFTER dynamic import
  useEffect(() => {
    const initPreline = async (): Promise<void> => {
      try {
        // Dynamic import of Preline JS
        await import('preline/dist/preline.js');

        // Use setTimeout to defer initialization slightly, ensuring DOM elements are ready
        // and the Preline script has fully executed and attached HSStaticMethods.
        setTimeout(() => {
           // Runtime check + Optional chaining is safest
           if (typeof window !== 'undefined') {
              window.HSStaticMethods?.autoInit?.();
              // console.log('Preline initialized on mount/load');
           }
        }, 100); // 100ms delay is usually sufficient

      } catch (error) {
        console.error('Error loading or initializing Preline:', error);
      }
    };

    // Call the async function
    initPreline().catch(err => console.error('Failed to run initPreline:', err));

    // This effect should only run once on mount to load the script.
    // Re-initialization is handled by the effect below that depends on `path`.
  }, []); // Empty dependency array: Run only once on initial mount


  // Effect for re-initializing Preline on route changes (path dependency)
  useEffect(() => {
    // No need to re-import 'preline/dist/preline.js' here, it's already loaded.
    // We just need to re-run autoInit.

    // Use setTimeout again for consistency and to ensure DOM updates from navigation are complete.
     if (typeof window !== 'undefined') {
       setTimeout(() => {
         window.HSStaticMethods?.autoInit?.();
         // console.log('Preline re-initialized on path change:', path);
       }, 100);
     }
  }, [path]); // Dependency array: Run when path changes

  // This component doesn't render anything itself
  return null;
}