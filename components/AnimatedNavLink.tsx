'use client';

import Link from 'next/link';

interface AnimatedNavLinkProps {
  href: string;
  children: string;
}

export default function AnimatedNavLink({ href, children }: AnimatedNavLinkProps) {
  return (
    <Link href={href} className='group transition-all flex flex-row w-full h-full'>
      <div className='flex flex-row items-center mx-2 my-1 w-full h-full'>
        <div className='flex w-full h-full justify-center'>
          <div className='transition-all'>
            <p className='text-sm md:text-md lg:text-lg 2xl:text-xl text-center py-2'>{children}</p> 
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gradient-to-r from-rating-green via-rating-cyan to-rating-purple bg-[length:200%_100%] group-hover:animate-gradient-shift-delayed"></span>
          </div>
        </div>
      </div>
    </Link>
  );
} 