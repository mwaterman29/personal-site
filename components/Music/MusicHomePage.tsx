'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import TopMusicPanel from './TopMusicPanel';
import { Album, Essay, Song } from '@prisma/client';
import { AlbumWithArtist, AlbumWithArtistAndSongs, SingleWithArtist } from '@/app/music/types';
import LatestPanel from './LatestPanel';
import { useRouter, useSearchParams } from 'next/navigation';
import EssaysPanel from './EssaysPanel';

interface MusicHomePageProps {
	albumReviews: AlbumWithArtistAndSongs[];
	allSongs: Song[];
	singleReviews: SingleWithArtist[];
	essays: Essay[];
}

const MusicHomePage = ({ albumReviews, allSongs, singleReviews, essays }: MusicHomePageProps) => {
	const [tabSelected, setTabSelected] = useState('latest');

	const router = useRouter();
    const searchParams = useSearchParams();
  
    useEffect(() => {
      // Set the initial tab based on the URL query parameter
      const tab = searchParams.get('tab');
      if (tab) {
        setTabSelected(tab);
      }
    }, [searchParams]);
  
    useEffect(() => {
      // Update the URL query parameter whenever the tab changes
      router.push(`?tab=${tabSelected}`);
    }, [tabSelected, router]);

	return (
		<div className='flex flex-col w-full h-full items-center justify-center'>
			<Tabs className='w-full max-w-[1035px] p-4' value={tabSelected} onValueChange={setTabSelected}>
				<TabsList className='w-full bg-black mb-4'>
					<TabsTrigger className='group data-[state=active]:bg-neutral-800 bg-neutral-950 text-white data-[state=active]:text-white w-full text-xl ' value='top'>
						<div className='transition-all'>
							<p className='text-2xl '>Top</p>
							{tabSelected !== 'top' && (
								<span className='block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-gradient-to-r from-rating-green via-rating-cyan to-rating-purple bg-[length:200%_100%] group-hover:animate-gradient-shift-delayed'></span>
							)}
							{tabSelected === 'top' && (
								<span className='block w-full transition-all duration-400 h-0.5 bg-gradient-to-r from-rating-green via-rating-cyan to-rating-purple bg-[length:200%_100%] animate-gradient-shift'></span>
							)}
						</div>
					</TabsTrigger>
					<TabsTrigger className='group data-[state=active]:bg-neutral-800 bg-neutral-950 text-white data-[state=active]:text-white w-full text-xl ' value='latest'>
						<div className='transition-all'>
							<p className='text-2xl '>Latest</p>
							{tabSelected !== 'latest' && (
								<span className='block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-gradient-to-r from-rating-green via-rating-cyan to-rating-purple bg-[length:200%_100%] group-hover:animate-gradient-shift-delayed'></span>
							)}
							{tabSelected === 'latest' && (
								<span className='block w-full transition-all duration-400 h-0.5 bg-gradient-to-r from-rating-green via-rating-cyan to-rating-purple bg-[length:200%_100%] animate-gradient-shift'></span>
							)}
						</div>
					</TabsTrigger>
					<TabsTrigger className='group data-[state=active]:bg-neutral-800 bg-neutral-950 text-white data-[state=active]:text-white w-full text-xl ' value='essays'>
						<div className='transition-all'>
							<p className='text-2xl '>Essays</p>
							{tabSelected !== 'essays' && (
								<span className='block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-gradient-to-r from-rating-green via-rating-cyan to-rating-purple bg-[length:200%_100%] group-hover:animate-gradient-shift-delayed'></span>
							)}
							{tabSelected === 'essays' && (
								<span className='block w-full transition-all duration-400 h-0.5 bg-gradient-to-r from-rating-green via-rating-cyan to-rating-purple bg-[length:200%_100%] animate-gradient-shift'></span>
							)}
						</div>
					</TabsTrigger>
				</TabsList>
				<TabsContent value='top'>
					<TopMusicPanel albums={albumReviews} songs={allSongs} singles={singleReviews} />
				</TabsContent>
				<TabsContent value='latest'>
					<LatestPanel albums={albumReviews} songs={allSongs} singles={singleReviews} essays={essays} />
				</TabsContent>
				<TabsContent value='essays'>
					<EssaysPanel essays={essays} />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default MusicHomePage;
