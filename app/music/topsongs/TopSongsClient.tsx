'use client';

import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import getRatingColor from '@/util/getRatingColor';
import ArtistAvatar from '@/components/Music/ArtistAvatar';
import { Song, Artist } from '@prisma/client';
import ApexBars from '@/components/ApexBars';

type SongWithArtist = Song & {
	artist: Artist;
	album?: {
		reviewFile: string;
	} | null;
};

type SongsByRating = Record<number, SongWithArtist[]>;

interface TopSongsClientProps
{
	songsByRating: SongsByRating;
}

export default function TopSongsClient({ songsByRating }: TopSongsClientProps)
{
	return (
		<div className='min-h-screen bg-black text-white overflow-hidden relative'>
			<ApexBars 
				className='absolute top-0 left-0 opacity-20 z-0' 
				width={600} 
				height={400} 
				baseColor={150} 
				barCount={30} 
				attenuation={20} 
			/>
			
			<motion.div className='w-[500px] text-center items-center justify-center fixed h-[188px] flex flex-col gap-4' initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
				<h1 className='text-4xl md:text-5xl font-bold'>Top Songs</h1>
				<p className='text-xl text-gray-400'>My all-time top rated songs, stratified by rating.</p>
			</motion.div>

			<div className='container mx-auto px-4 py-12 relative z-10'>
				{/* Score brackets */}
				<div className='space-y-16 md:ml-[25%]'>
					{Object.entries(songsByRating)
						.sort(([scoreA], [scoreB]) => Number(scoreB) - Number(scoreA))
						.map(([score, songs], index) => (
							<motion.div
								key={score}
								className='relative'
								initial={{ x: 100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
							>
								{/* Score header above line */}
								<div className='mb-4'>
									<div className='flex items-center gap-4'>
										<h2 className='text-4xl font-bold'>{score}</h2>
										<div className='text-xl text-gray-400'>Rating</div>
									</div>
									<div className='h-px bg-white bg-opacity-30 w-full mt-2'></div>
								</div>

								{/* Songs in rows with hover cards */}
								<div className='space-y-3'>
									<TooltipProvider>
										{songs.map((song, songIndex) =>
										{
											const description = getSongDescription(song);
											const songElement = (
												<Link href={getSongLink(song)}>
													<div className='p-3 border border-white border-opacity-10 rounded cursor-pointer hover:bg-white hover:bg-opacity-5 transition-colors flex items-center gap-4'>
														<ArtistAvatar artist={song.artist} hideName />
														<div className='flex flex-col'>
															<p className='font-semibold'>{song.title}</p>
															<p className='text-sm text-gray-400'>{song.artist.name}</p>
														</div>
														<div className='ml-auto' style={{ color: getRatingColor(song.rating) }}>
															{song.rating}
														</div>
													</div>
												</Link>
											);

											return (
												<motion.div
													key={song.id}
													initial={{ y: 20, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ duration: 0.4, delay: index * 0.2 + songIndex * 0.1 }}
												>
													{description ? (
														<Tooltip>
															<TooltipTrigger asChild>{songElement}</TooltipTrigger>
															<TooltipContent className='bg-black border border-white border-opacity-30 p-3 max-w-xs'>
																<p className='font-semibold text-white'>{song.title}</p>
																<p className='text-sm text-gray-300 mt-1'>by {song.artist.name}</p>
																<p className='text-sm mt-2' style={{ color: getRatingColor(song.rating) }}>
																	Rating: {song.rating}
																</p>
																<p className='text-sm text-gray-400 mt-2'>{description}</p>
															</TooltipContent>
														</Tooltip>
													) : (
														songElement
													)}
												</motion.div>
											);
										})}
									</TooltipProvider>
								</div>
							</motion.div>
						))}
				</div>
			</div>
		</div>
	);
}

function getSongDescription(song: SongWithArtist): string | null
{
	// This is a placeholder - you'll want to replace this with actual descriptions
	// You could store these in your database or in a separate configuration file
	const descriptions: Record<string, string> = {
		// "Heaven Surrounds Us Like A Hood": "The best song of all time. The best guitar tone, the highest apex, and the most deeply enthralling song I have ever heard.",
		// "Jackie (Sewerslvt Remake)": "Absolutely ripping ",
		// "Operator": "",
	};

	return descriptions[song.title] || null;
}

function getSongLink(song: SongWithArtist): string
{
	if (song.reviewFile)
	{
		// If it's a single with its own review
		return `/music/${song.reviewFile}`;
	}
	else if (song.albumId)
	{
		// If it's part of an album, link to the album with a deeplink
		return `/music/${song.album?.reviewFile}?deeplink=${encodeURIComponent(song.title)}`;
	}
	return '#';
}
