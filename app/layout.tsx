import './globals.css';
import type { Metadata } from 'next';
import { Inter, Nunito, Mulish, Quicksand, Montserrat } from 'next/font/google';
import AnimatedNavLink from '@/components/AnimatedNavLink';
import StickyNav from '@/components/StickyNav';
import Logo from '@/components/logo';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter'
});

export const metadata: Metadata = {
	title: 'Matt Waterman',
	description: 'Personal site, resume, and software engineering posts',
	icons: {
		icon: [
			{
				media: '(prefers-color-scheme: light)',
				url: '/icon-dark.svg',
				type: 'image/svg+xml',
			},
			{
				media: '(prefers-color-scheme: dark)',
				url: '/icon.svg',
				type: 'image/svg+xml',
			},
		],
	},
};

export default function RootLayout({ children }: { children: React.ReactNode })
{
	const headerLinks = {
		Home: '/',
		Resume: '/resume',
		Engineering: '/engineering',
		//'Posts' : '/posts',
		Music: '/music',
		Contact: '/contact'
	};

	return (
		<html lang='en' className={inter.variable}>
			<body className='font-inter min-h-screen bg-black text-white'>
				{/* Main header - scrolls away */}
				<div className='bg-black border-b border-gray-800'>
					<div className='p-4 xl:p-3 w-full text-center items-center hidden [@media(min-height:600px)]:block'>
						<div className='flex flex-row items-center justify-center gap-6'>
							<Logo className='text-[64px] stroke-[14px]' />
							<div className='flex flex-col items-start justify-center'>
								<h1 className='text-3xl xl:text-4xl font-bold'>Matt Waterman</h1>
								<p
									className='text-sm text-gray-400 hover:text-white transition-colors'
									// href='https://mwaterman.dev'
									// target='_blank'
									// rel='noopener noreferrer'
								>
									mwaterman.dev
								</p>
							</div>
						</div>
					</div>

					{/* Main navigation */}
					<div className='bg-black'>
						<div className='flex flex-row justify-center w-full gap-2 max-w-[100dvw] overflow-x-auto py-3'>
							{Object.entries(headerLinks).map(([key, value]) => (
								<AnimatedNavLink key={key} href={value}>
									{key}
								</AnimatedNavLink>
							))}
						</div>
					</div>
				</div>

				{/* Sticky navigation - appears when scrolled down 160px */}
				<StickyNav headerLinks={headerLinks} />

				{children}
			</body>
		</html>
	);
}
