import React, { ElementType } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TypographyProps<T extends ElementType> {
  children: React.ReactNode;
  as?: T;
  className?: string;
}


export const Display = <T extends ElementType = 'h1'>(
  { className, as, children, ...props }: TypographyProps<T>,
) => {
  const Component = as || 'h1';
  return (
    <Component
      className={cn(
        'text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-normal leading-none font-[--font-shippori-serif]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Title = <T extends ElementType = 'h2'>(
  { className, as, children, ...props }: TypographyProps<T>,
) => {
  const Component = as || 'h2';
  return (
    <Component
      className={cn(
        'text-4xl md:text-5xl lg:text-6xl tracking-normal leading-tight font-[--font-shippori-serif]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Heading = <T extends ElementType = 'h3'>(
  { className, as, children, ...props }: TypographyProps<T>,
) => {
  const Component = as || 'h3';
  return (
    <Component
      className={cn(
        'text-3xl md:text-4xl lg:text-5xl tracking-normal leading-tight font-[--font-shippori-serif]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Subheading = <T extends ElementType = 'h4'>(
  { className, as, children, ...props }: TypographyProps<T>,
) => {
  const Component = as || 'h4';
  return (
    <Component
      className={cn(
        'text-2xl md:text-3xl lg:text-4xl tracking-normal leading-snug font-[--font-shippori-serif]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Lead = <T extends ElementType = 'p'>(
  { className, as, children, ...props }: TypographyProps<T>,
) => {
  const Component = as || 'p';
  return (
    <Component
      className={cn(
        'text-lg md:text-xl leading-relaxed font-[--font-cormorant-serif]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}


export const Body = <T extends ElementType = 'p'>(
  { className, as, children, ...props }: TypographyProps<T>,
) => {
  const Component = as || 'p';
  return (
    <Component
      className={cn(
        'text-base md:text-lg leading-relaxed font-[--font-cormorant-serif]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export const Small = <T extends ElementType = 'p'>(
  { className, as, children, ...props }: TypographyProps<T>,
) => {
  const Component = as || 'p';
  return (
    <Component
      className={cn(
        'text-sm md:text-base leading-tight sm:leading-relaxed font-[--font-cormorant-serif]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Add display names
Display.displayName = 'Display';
Title.displayName = 'Title';
Heading.displayName = 'Heading';
Subheading.displayName = 'Subheading';
Lead.displayName = 'Lead';
Body.displayName = 'Body';
Small.displayName = 'Small';