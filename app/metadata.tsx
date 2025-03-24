import { Metadata } from 'next';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase';

/**
 * Fetches image URLs from Firebase storage for metadata
 */
export async function fetchMetadataImages() {
  try {
    // Define single Window.webp path for all metadata images
    const windowImagePath = '/Window.webp';

    // Fetch the Window image
    const windowImageUrl = await getDownloadURL(ref(storage, windowImagePath));
    
    // Use the same image for all metadata
    return {
      openGraph: windowImageUrl,
      twitter: windowImageUrl,
      mainImage: windowImageUrl
    };
  } catch (error) {
    console.error('Error fetching metadata images:', error);
    return {
      openGraph: null,
      twitter: null,
      mainImage: null
    };
  }
}

/**
 * Generates metadata with Firebase image URLs
 */
export async function generateMetadata(): Promise<Metadata> {
  // Attempt to fetch images from Firebase
  const imageUrls = await fetchMetadataImages();
  
  // Fallback URLs for images that failed to load from Firebase
  const baseUrl = 'https://pierlookout.vercel.app';
  const defaultOpenGraph = `${baseUrl}/opengraph-image.jpg`;
  const defaultTwitter = `${baseUrl}/twitter-image.jpg`;
  
  return {
    title: "Pier Lookout | Luxury Seafront Accommodation in Eastbourne",
    description: "A top floor regency flat with breathtaking views of the Eastbourne pier and seafront. Enjoy luxury accommodation with perfect sea views.",
    keywords: ["Eastbourne accommodation", "seafront flat", "Eastbourne pier", "luxury accommodation", "holiday rental"],
    openGraph: {
      title: "Pier Lookout | Luxury Seafront Accommodation in Eastbourne",
      description: "A top floor regency flat with breathtaking views of the Eastbourne pier and seafront.",
      url: baseUrl,
      siteName: "Pier Lookout",
      images: [
        {
          url: imageUrls.openGraph || defaultOpenGraph,
          width: 1024,
          height: 767,
          alt: "View from Pier Lookout apartment in Eastbourne",
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Pier Lookout | Luxury Seafront Accommodation",
      description: "A top floor regency flat with breathtaking views of the Eastbourne pier and seafront.",
      images: [imageUrls.twitter || defaultTwitter],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: imageUrls.mainImage || "/favicon.ico",
      shortcut: imageUrls.mainImage || "/favicon-16x16.png",
      apple: imageUrls.mainImage || "/apple-touch-icon.png",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    verification: {
      google: "verification_token", 
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}