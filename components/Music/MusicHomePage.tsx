'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import TopMusicPanel from './TopMusicPanel';
import { Essay, Song } from '@prisma/client';
import { AlbumWithArtistAndSongs, SingleWithArtist } from '@/app/music/types';
import LatestPanel from './LatestPanel';
import { useRouter, useSearchParams } from 'next/navigation';
import EssaysPanel from './EssaysPanel';

const TABS = [
	{ value: 'top', label: 'Top' },
	{ value: 'latest', label: 'Latest' },
	{ value: 'essays', label: 'Essays' }
] as const;

type Tab = (typeof TABS)[number]['value'];

const DEFAULT_TAB: Tab = 'latest';

const isTab = (value: string | null): value is Tab => TABS.some(tab => tab.value === value);

interface MusicHomePageProps {
	albumReviews: AlbumWithArtistAndSongs[];
	allSongs: Song[];
	singleReviews: SingleWithArtist[];
	essays: Essay[];
}

const MusicHomePage = ({ albumReviews, allSongs, singleReviews, essays }: MusicHomePageProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const tabFromUrl = searchParams.get('tab');

	const [tabSelected, setTabSelected] = useState<Tab>(() => (isTab(tabFromUrl) ? tabFromUrl : DEFAULT_TAB));

	// Follow the URL when it changes underneath us (back/forward). The URL is only ever
	// *written* from selectTab - writing it from an effect is what used to race this read
	// and clobber the incoming ?tab= on first load.
	useEffect(() => {
		setTabSelected(isTab(tabFromUrl) ? tabFromUrl : DEFAULT_TAB);
	}, [tabFromUrl]);

	const selectTab = (value: string) => {
		// Radix hands back a plain string; ignore anything that isn't a real tab.
		if (!isTab(value)) {
			return;
		}

		// State drives the render so the switch is instant; the URL just follows.
		setTabSelected(value);

		const params = new URLSearchParams(searchParams.toString());
		params.set('tab', value);

		// replace, not push - the tab is a view preference, not a place in history.
		router.replace(`?${params.toString()}`, { scroll: false });
	};

	return (
		<div className='flex flex-col w-full h-full items-center justify-center'>
			<Tabs className='w-full max-w-[1035px] p-4' value={tabSelected} onValueChange={selectTab}>
				<TabsList className='w-full bg-black mb-4'>
					{TABS.map(({ value, label }) => (
						<TabsTrigger
							key={value}
							className='group data-[state=active]:bg-neutral-800 bg-neutral-950 text-white data-[state=active]:text-white w-full text-xl '
							value={value}
						>
							<div className='transition-all'>
								<p className='text-2xl '>{label}</p>
								{tabSelected !== value && (
									<span className='block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-gradient-to-r from-rating-green via-rating-cyan to-rating-purple bg-[length:200%_100%] group-hover:animate-gradient-shift-delayed'></span>
								)}
								{tabSelected === value && (
									<span className='block w-full transition-all duration-400 h-0.5 bg-gradient-to-r from-rating-green via-rating-cyan to-rating-purple bg-[length:200%_100%] animate-gradient-shift'></span>
								)}
							</div>
						</TabsTrigger>
					))}
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
