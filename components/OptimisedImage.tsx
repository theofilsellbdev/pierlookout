import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

// Component Props
interface OptimizedImageProps {
  path: string;          // Path for static images (/static/[name].webp)

  // Display options
  width?: number | string;      // Width in px or %
  height?: number | string;     // Height in px or %
  className?: string;           // Custom classes
  style?: React.CSSProperties;  // Inline styles
  alt?: string;                 // Alt text for accessibility
  title?: string;               // Title text (hover)

  // Loading behavior
  priority?: boolean;           // Load with priority (no lazy loading)
  quality?: number;             // Image quality (1-100)
  loading?: 'lazy' | 'eager';   // Loading strategy

  // Responsive options
  sizes?: string;               // Sizes attribute for responsive images
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

  // Advanced options
  unoptimized?: boolean;        // Skip Next.js image optimization (for SVGs, etc.)

  // Callbacks
  onLoad?: () => void;          // Called when image loads
  onError?: (error: Error) => void; // Called on error
}

// Loading states
type LoadingState = 'loading' | 'loaded' | 'error';

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  path,
  width,
  height,
  className = '',
  style = {},
  alt = '',
  title,
  priority = false,
  quality = 80,
  loading = 'lazy',
  sizes,
  objectFit = 'cover',
  onLoad,
  onError,
}) => {
  // States
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');

  // Refs
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Fetch image URL and metadata
  useEffect(() => {
    let isMounted = true;

    const fetchImage = async (): Promise<void> => {
      try {
        setLoadingState('loading');

        try {
          // Access static image from Firebase storage
          const staticRef = ref(storage, `/${path}.webp`);
          const staticUrl = await getDownloadURL(staticRef);
          if (isMounted) {
            setImageUrl(staticUrl);
            setLoadingState('loaded');
          }
        } catch (error) {
          console.error("Error loading static image:", error);
          if (isMounted) setLoadingState('error');
          if (onError) onError(error instanceof Error ? error : new Error(String(error)));
        }
        return;

      } catch (error) {
        console.error("Error in image loading:", error);
        if (isMounted) setLoadingState('error');
        if (onError) onError(error instanceof Error ? error : new Error(String(error)));
      }
    };

    void fetchImage();

    return () => {
      isMounted = false;
    };
  }, [path, onError]);

  // Setup intersection observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager' || !imgRef.current) {
      return;
    }

    // Only observe if in loading state and we have a URL
    if (loadingState === 'loading' && imageUrl) {
      // Store a reference to the current DOM node to use in cleanup
      const currentImgRef = imgRef.current;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = imageUrl;
              observer.unobserve(img);
            }
          });
        },
        { rootMargin: '200px' } // Start loading when within 200px of viewport
      );

      observer.observe(currentImgRef);
      observerRef.current = observer;

      return () => {
        if (observerRef.current) {
          // Use the captured reference instead of imgRef.current
          observerRef.current.unobserve(currentImgRef);
        }
      };
    }

    return undefined;
  }, [imageUrl, loadingState, priority, loading]);

  // Handle image loaded event
  const handleImageLoaded = (): void => {
    setLoadingState('loaded');
    if (onLoad) onLoad();
  };

  // Handle image error event
  const handleImageError = (): void => {
    setLoadingState('error');
    if (onError) onError(new Error('Image failed to load'));
  };

  // Render placeholder while loading
  if (loadingState === 'loading') {
    return (
      <div
        className={`optimized-image-placeholder ${className} h-full w-full flex items-center justify-center relative`}
        style={{
          ...style,
        }}
      >
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Render error state
  if (loadingState === 'error') {
    return (
      <div
        className={`optimized-image-error ${className}`}
        style={{
          width: width || '100%',
          height: height || '100%',
          backgroundColor: '#00000099',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5px',
          ...style,
        }}
      >
        <small className='italic text-white text-[clamp(.6rem,2vw,.8rem)]'>Image failed to load</small>
      </div>
    );
  }

  // Render the image
  return (
    <div className={`optimized-image-container ${className}`} style={style}>
      {imageUrl ? (objectFit == 'cover' ? (
        <Image
          src={imageUrl}
          alt={alt || ''}
          title={title || ''}
          onLoad={handleImageLoaded}
          onError={handleImageError}
          style={{
            objectFit,
          }}
          fill
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          quality={quality}
          priority={priority}
          loading={!priority ? loading : 'eager'}
        />
      )
        :
        (
          <Image
            src={imageUrl}
            alt={alt || ''}
            title={title || ''}
            width={typeof width === 'number' ? width : 1200}
            height={typeof height === 'number' ? height : 800}
            onLoad={handleImageLoaded}
            onError={handleImageError}
            style={{
              objectFit,
              width: width || '100%',
              height: height || 'auto',
            }}
            sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            quality={quality}
            priority={priority}
            loading={!priority ? loading : 'eager'}
            unoptimized
          />
        )
      ) : (
        <div className="image-placeholder" style={{ width: width || '100%', height: height || '300px' }}></div>
      )}
    </div>
  );
};

export default OptimizedImage;