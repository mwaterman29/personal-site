import { AlbumWithArtist, AlbumWithArtistAndSongs, SingleWithArtist } from '@/app/music/types';
import getRatingColor from '@/util/getRatingColor';
import { Album, Artist, Song } from '@prisma/client';
import Link from 'next/link';
import ArtistAvatar from './ArtistAvatar';
import ReviewCard from './ReviewCard';
import { Switch } from '../ui/switch';
import { useEffect, useState } from 'react';
import ShelfReviewCard from './ShelfReviewCard';
import { useRouter, useSearchParams } from 'next/navigation';
import ApexBars from '@/components/ApexBars';

interface TopMusicPanelProps
{
	albums: AlbumWithArtistAndSongs[];
	songs: Song[];
	singles: SingleWithArtist[];
}

const TopMusicPanel = ({ albums, songs, singles }: TopMusicPanelProps) =>
{
	const [shelfMode, setShelfMode] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	// Check if screen is mobile size
	useEffect(() =>
	{
		const checkScreenSize = () =>
		{
			setIsMobile(window.innerWidth < 768);
		};

		// Check on mount
		checkScreenSize();

		// Add event listener for window resize
		window.addEventListener('resize', checkScreenSize);

		// Cleanup
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	// Set shelf mode based on screen size
	useEffect(() =>
	{
		if (isMobile)
		{
			setShelfMode(false); // Force card mode on mobile
		}
	}, [isMobile]);

	useEffect(() =>
	{
		// Set the initial shelf mode based on the URL query parameter
		const shelf = searchParams.get('shelf');
		if (shelf !== null && !isMobile)
		{
			setShelfMode(shelf === 'true');
		}
	}, [searchParams, isMobile]);

	useEffect(() =>
	{
		// Construct the query parameters
		const params = new URLSearchParams();
		params.set('tab', 'top'); // Always set tab to 'top'
		params.set('shelf', String(shelfMode));

		// Update the URL query parameters
		router.push(`?${params.toString()}`);
	}, [shelfMode, router]);

	return (
		<div className='flex flex-col w-full gap-8'>
			{/* Top Songs Section */}
			<Link href='/music/topsongs' className='flex flex-col w-full relative pt-6 pb-12 items-center'>
				{/* ApexBars decoration */}
				<ApexBars
					className='absolute bottom-0 md:top-0 md:left-0 opacity-80 z-0'
					width={300}
					height={200}
					baseColor={180}
					barCount={15}
					attenuation={12}
					noAnim
				/>

				<div className='relative z-10 md:pl-[25%] pb-[140px] md:pb-0'>
					<div className='flex flex-row items-center justify-between p-2 gap-4 '>
						<h2 className='text-2xl font-semibold'>Top Songs</h2>
						<div className='text-blue-400 hover:text-blue-300 hover:underline transition-colors'>View All →</div>
					</div>
					<p className='text-neutral-400 px-2 pb-4'>My all-time highest rated songs, stratified by rating.</p>
				</div>
			</Link>

			{/* Separator */}
			<hr className='border-neutral-700' />

			{/* Top Albums Section */}
			<div className='flex flex-col w-full items-center'>
				<div className='flex flex-row items-center justify-between p-2 gap-4 w-full'>
					<p className='text-2xl font-semibold'>Top Albums</p>
					{!isMobile && (
						<div className='flex flex-row items-center gap-x-2'>
							<p className={shelfMode ? '' : 'font-bold'}>Card Mode</p>
							<Switch checked={shelfMode} onCheckedChange={setShelfMode} />
							<p className={shelfMode ? 'font-bold' : ''}>Shelf Mode</p>
						</div>
					)}
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-[400px] md:max-w-[800px] xl:max-w-none'>
					{albums
						.sort((a, b) => b.rating - a.rating)
						.map((album, index) =>
						{
							if (shelfMode && !isMobile)
							{
								return <ShelfReviewCard review={album} key={index} />;
							}
							else
							{
								return <ReviewCard review={album} key={index} />;
							}
						})}
				</div>
			</div>
		</div>
	);
};

export default TopMusicPanel;
