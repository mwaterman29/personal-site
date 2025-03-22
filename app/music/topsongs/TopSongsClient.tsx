'use client';

import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import getRatingColor from '@/util/getRatingColor';
import ArtistAvatar from '@/components/Music/ArtistAvatar';
import { Song, Artist } from '@prisma/client';

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
			{/* Mountain SVG - fixed position */}
			<div className='fixed left-0 bottom-0 w-2/5 h-full opacity-20 pointer-events-none'>
				<svg viewBox='0 0 100 100' preserveAspectRatio='none' className='h-full w-full'>
					{/* Mountain base - more natural shape */}
					<path 
						d="M0,100 L20,70 L40,85 L60,40 L80,60 L100,100 Z" 
						fill='#888'
					/>
					{/* Snowy peaks - more natural shape */}
					<path 
						d="M35,45 L50,25 L65,45 L60,50 L40,50 Z" 
						fill='white'
					/>
					<path 
						d="M45,35 L55,25 L65,35 L60,40 L50,40 Z" 
						fill='white'
					/>
				</svg>
			</div>

			{/* Animated clouds - more natural looking */}
			<motion.div
				className='fixed left-5 top-40 opacity-20 pointer-events-none'
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 0.2 }}
				transition={{ duration: 2 }}
			>
				<svg width='160' height='80' viewBox='0 0 160 80' fill='white'>
					<path d='M40,40 C30,25 10,25 10,40 C10,55 0,60 10,70 C20,80 50,80 60,70 C70,80 100,80 110,70 C120,60 110,55 110,40 C110,25 90,25 80,40 C70,25 50,25 40,40 Z' />
				</svg>
			</motion.div>

			<motion.div
				className='fixed left-60 top-20 opacity-20 pointer-events-none'
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 0.2 }}
				transition={{ duration: 2.5, delay: 0.3 }}
			>
				<svg width='140' height='70' viewBox='0 0 140 70' fill='white'>
					<path d='M30,30 C22,18 8,18 8,30 C8,42 0,46 8,54 C16,62 38,62 46,54 C54,62 76,62 84,54 C92,46 84,42 84,30 C84,18 70,18 62,30 C54,18 38,18 30,30 Z' />
				</svg>
			</motion.div>

			<div className='container mx-auto px-4 py-12 relative z-10'>
				{/* Right-justified header - smaller size */}
				<motion.div className='text-right mb-16' initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
					<h1 className='text-4xl md:text-5xl font-bold'>Top Songs</h1>
				</motion.div>

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
										{songs.map((song, songIndex) => {
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
															<TooltipTrigger asChild>
																{songElement}
															</TooltipTrigger>
															<TooltipContent className='bg-black border border-white border-opacity-30 p-3 max-w-xs'>
																<p className='font-semibold text-white'>{song.title}</p>
																<p className='text-sm text-gray-300 mt-1'>by {song.artist.name}</p>
																<p className='text-sm mt-2' style={{ color: getRatingColor(song.rating) }}>
																	Rating: {song.rating}
																</p>
																<p className='text-sm text-gray-400 mt-2'>
																	{description}
																</p>
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

function getSongDescription(song: SongWithArtist): string | null {
	// This is a placeholder - you'll want to replace this with actual descriptions
	// You could store these in your database or in a separate configuration file
	const descriptions: Record<string, string> = {
        // "Heaven Surrounds Us Like A Hood": "The best song of all time. The best guitar tone, the highest apex, and the most deeply enthralling song I have ever heard.",
        // "Jackie (Sewerslvt Remake)": "Absolutely ripping ",
        // "Operator": "",
	};

	return descriptions[song.title] || null;
}

function getSongLink(song: SongWithArtist): string {
	if (song.reviewFile) {
		// If it's a single with its own review
		return `/music/${song.reviewFile}`;
	} else if (song.albumId) {
		// If it's part of an album, link to the album with a deeplink
		return `/music/${song.album?.reviewFile}?deeplink=${encodeURIComponent(song.title)}`;
	}
	return '#';
}
