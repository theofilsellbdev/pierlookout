'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase';

type MetadataImagesProps = {
  imagePath?: string;
};

/**
 * Component to dynamically fetch and set metadata images from Firebase Storage
 */
export default function MetadataImages({
  imagePath = 'Window',
}: MetadataImagesProps) {
  // State for image URL
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Fetch image URL from Firebase
  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        // Fetch Window image
        const imageRef = ref(storage, `/${imagePath}.webp`);
        const fetchedImageUrl = await getDownloadURL(imageRef);
        if (isMounted) setImageUrl(fetchedImageUrl);
      } catch (error) {
        console.error('Failed to load metadata image:', error);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [imagePath]);

  return (
    <Head>
      {/* Use the same image for all metadata */}
      {imageUrl && (
        <>
          {/* Open Graph Image */}
          <meta property="og:image" content={imageUrl} />
          <meta property="og:image:alt" content="View from Pier Lookout apartment in Eastbourne" />
          <meta property="og:image:width" content="1024" />
          <meta property="og:image:height" content="767" />
          
          {/* Twitter Image */}
          <meta name="twitter:image" content={imageUrl} />
          <meta name="twitter:image:alt" content="View from Pier Lookout apartment in Eastbourne" />
          
          {/* Favicon and icons */}
          <link rel="icon" href={imageUrl} />
          <link rel="shortcut icon" href={imageUrl} />
          <link rel="apple-touch-icon" href={imageUrl} />
        </>
      )}
    </Head>
  );
}