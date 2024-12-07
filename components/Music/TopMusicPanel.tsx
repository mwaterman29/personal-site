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

interface TopMusicPanelProps {
	albums: AlbumWithArtistAndSongs[];
	songs: Song[];
	singles: SingleWithArtist[];
}

const TopMusicPanel = ({ albums, songs, singles }: TopMusicPanelProps) => {
	const [shelfMode, setShelfMode] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		// Set the initial shelf mode based on the URL query parameter
		const shelf = searchParams.get('shelf');
		if (shelf !== null) {
			setShelfMode(shelf === 'true');
		}
	}, [searchParams]);

	useEffect(() => {
		// Construct the query parameters
		const params = new URLSearchParams();
		params.set('tab', 'top'); // Always set tab to 'top'
		params.set('shelf', String(shelfMode));

		// Update the URL query parameters
		router.push(`?${params.toString()}`);
	}, [shelfMode, router]);

	return (
		<div className='flex flex-col w-full'>
			<div className='flex flex-row items-center justify-between p-2 gap-4'>
				<p className='text-2xl font-semibold'>Top Albums</p>
				<div className='flex flex-row items-center gap-x-2'>
					<p className={shelfMode ? '' : 'font-bold'}>Card Mode</p>
					<Switch checked={shelfMode} onCheckedChange={setShelfMode} />
					<p className={shelfMode ? 'font-bold' : ''}>Shelf Mode</p>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
				{albums
					.sort((a, b) => b.rating - a.rating)
					.map((album, index) => {
						if (shelfMode) {
							return <ShelfReviewCard review={album} key={index} />;
						} else {
							return <ReviewCard review={album} key={index} />;
						}
					})}
			</div>
		</div>
	);
};

export default TopMusicPanel;
