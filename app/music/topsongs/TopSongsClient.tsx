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
					{/* More natural mountain shape */}
					<path
						d="M0,100 L30,70 Q40,60 50,65 T70,75 L100,100 Z"
						fill='#555' // Darker gray for the base
					/>
					{/* Smoother, more integrated peak */}
					<path
						d="M40,65 Q50,40 60,65 T70,70 L40,75 Z" // Adjusted coordinates to connect better
						fill='white' // Snowy peak
					/>
				</svg>
			</div>

			{/* Animated clouds - more natural looking */}
			<motion.div
				className='fixed left-10 top-32 opacity-15 pointer-events-none' // Adjusted position and opacity
				initial={{ x: -150, opacity: 0 }} // Start further off-screen
				animate={{ x: 0, opacity: 0.15 }} // Animate to final opacity
				transition={{ duration: 2.5, ease: "easeOut" }} // Smoother easing
			>
				{/* Fluffier cloud shape */}
				<svg width='180' height='90' viewBox='0 0 180 90' fill='white'>
					<path d="M30,70 Q10,70 10,50 Q10,30 30,30 Q40,10 60,30 Q80,30 90,40 Q110,35 120,50 Q140,50 140,70 L30,70 Z" />
				</svg>
			</motion.div>

			<motion.div
				className='fixed left-40 top-20 opacity-10 pointer-events-none' // Adjusted position and opacity
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 0.1 }} // Animate to final opacity
				transition={{ duration: 3, delay: 0.5, ease: "easeOut" }} // Longer duration, delay, smoother easing
			>
				{/* Another fluffy cloud */}
				<svg width='150' height='75' viewBox='0 0 150 75' fill='white'>
					<path d="M25,60 Q5,60 5,40 Q5,20 25,20 Q35,5 50,20 Q65,20 75,30 Q90,25 100,40 Q120,40 120,60 L25,60 Z" />
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
