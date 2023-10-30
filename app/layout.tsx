import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Matt Waterman',
  description: 'Personal site, resume, and software engineering posts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const headerLinks = {
    'Home': '/',
    'Resume' : '/resume',
    'Projects' : '/projects',
    'CV' : '/cv',
    '\'Blog\'' : '/posts',
  }

  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen bg-black text-white"}>
        <div className='z-20 top-0 sticky bg-black'>
          <p className='p-4 w-full text-center items-center text-4xl'>Matt Waterman</p>
          <hr className=''/>
          <div className='flex flex-row justify-evenly w-full gap-4'>
            {Object.entries(headerLinks).map(([key, value]) => (
              <Link key={key} href={value} className='group transition-all flex flex-row w-full h-full'>
                <div className='flex flex-row items-center m-2 w-full h-full'>
                  <div className='flex w-full h-full justify-center'>
                    <div className='transition-all'>
                      <p className='text-2xl text-center'>{key}</p> 
                      <span className="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-white"></span>
                    </div>
                  </div>
                </div>
            </Link>
            ))}
          </div> 
        </div>
        {children}
      </body>
    </html>
  )
}
