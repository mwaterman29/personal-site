'use client';

import { useEffect, useState } from 'react';
import AnimatedNavLink from './AnimatedNavLink';

interface StickyNavProps {
  headerLinks: Record<string, string>;
}

export default function StickyNav({ headerLinks }: StickyNavProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 160);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm border-b border-gray-800 animate-in slide-in-from-top duration-300">
      <div className='flex flex-row justify-center w-full gap-2 max-w-[100dvw] overflow-x-auto py-2'>
        {Object.entries(headerLinks).map(([key, value]) => (
          <AnimatedNavLink key={`sticky-${key}`} href={value}>
            {key}
          </AnimatedNavLink>
        ))}
      </div> 
    </div>
  );
} 