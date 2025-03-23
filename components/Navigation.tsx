import { Display, Title, Heading, Subheading, Lead, Body, Small } from "@/components/Typography";
import Link from "next/link";
import { JSX } from "react";

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