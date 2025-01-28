import Image from 'next/image';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import markdownToComponent from '@/util/ConvertMarkdown';
import Link from 'next/link';
import { prisma } from '@/prisma/client';
import ArtistAvatar from '@/components/Music/ArtistAvatar';
import getRatingColor from '@/util/getRatingColor';

import OpenInNew from '@material-symbols/svg-400/outlined/open_in_new.svg';
import AlbumCover from '@/components/Music/AlbumCover';
import getBadges from '@/util/music/getBadges';
import { SingleWithArtist } from '../types';
import isFavorite from '@/util/music/isFavorite';
import Favorite from '@material-symbols/svg-400/outlined/favorite-fill.svg';

export default async function PostPage({ params }: { params: { name: string } })
{
	const directoryPath = path.join(process.cwd(), 'content', 'reviews');
	const filenames = readdirSync(directoryPath);

	// Find the matching filename in a case-insensitive manner to make sure git doesn't mess up the casing
	const matchingFilename = filenames.find(filename => filename.toLowerCase() === decodeURIComponent(params.name).toLowerCase());

	if (!matchingFilename)
	{
		throw new Error(`File not found: ${params.name}`);
	}

	const data = readFileSync(path.join(directoryPath, matchingFilename), 'utf8');

	//Find the review for this album/song
	const album = await prisma.album.findFirst({
		where: {
			reviewFile: params.name
		},
		include: {
			artist: true,
			songs: true
		}
	});

	const song = await prisma.song.findFirst({
		where: {
			reviewFile: params.name
		}
	});

	//strip first three lines
	const startIndexOfContent = data.indexOf('\n', data.indexOf('\n', data.indexOf('\n') + 1) + 1);
	//remove from "Track Ratings:" to end
	const endIndexOfContent = data.indexOf('Track Ratings:');

	let extraRules: any[] = [];
	if (album)
	{
		extraRules = album.songs.map(song =>
		{
			const fixTitle = (title: string) =>
			{
				let result = title;
                
                //Escape HTML entities
				result = result.replace('&', '&#x26;');

                // Escape regex special characters
                result = result.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				return result;
			};

			const fixedTitle = fixTitle(song.title);

			return {
				pattern: new RegExp(`${fixedTitle} !SM`, 'gi'),
				replacement: `${song.title} <span style="color: ${getRatingColor(song.rating)}">(${song.rating})</span>`
			};
		});
	}

	const contentSlice = data.substring(startIndexOfContent, endIndexOfContent);

	let content = await markdownToComponent(contentSlice, extraRules);

	if (album)
	{
		return (
			<div className='flex flex-col w-full items-center justify-center px-2 xl:p-0'>
				<div className='flex flex-col max-w-[1200px]'>
					<div className='flex flex-col items-center md:flex-row pt-4'>
						<div className='flex items-center justify-center w-full max-w-[300px] aspect-square pt-4'>
							<AlbumCover link={album.imageLink} badges={getBadges(album)} type={'Album'} />
						</div>
						<div className='flex flex-col justify-between md:h-[300px] p-4 pt-2 pb-0 gap-y-2'>
							<div className='flex flex-col gap-2'>
								<p className='text-4xl'>{album.title}</p>
								<ArtistAvatar artist={album.artist} />
								<div className='flex h-full items-start'>
									<p className='text-4xl' style={{ color: getRatingColor(album.rating) }}>
										{album.rating.toFixed(2)}
									</p>
								</div>
							</div>
							{album.link && (
								<div>
									<a className='flex flex-row items-center gap-2 group' href={album.link} target='_blank'>
										<img className='object-contain items-center justify-center h-6 w-6' alt='Spotify Logo' src='/spotify_green.png' />
										<p className='text-white group-hover:underline'>Listen on Spotify</p>
										<p className='text-[24px]'>
											<OpenInNew />
										</p>
									</a>

									<p className='text-sm italic text-neutral-400'>Images and metadata provided by Spotify</p>
								</div>
							)}
						</div>
					</div>
					<hr className='my-8' />
					{content}
					<hr className='my-8' />
					<p className='text-2xl'>Track Ratings</p>
					<div className='flex flex-col gap-y-1 pt-6'>
						{album.songs.map(song =>
						{
							const isFavoriteSong = isFavorite(song, album.artist.name);

							return (
								<div key={song.id} className='flex flex-row items-center gap-2'>
									<div className=''>
										{song.title}
										&nbsp;-&nbsp;
										<span className='' style={{ color: getRatingColor(song.rating) }}>
											{song.rating}
										</span>
									</div>
									{isFavoriteSong && (
										<span className='text-xl text-favorite'>
											<Favorite />
										</span>
									)}
								</div>
							);
						})}
					</div>

					<div className='min-w-full min-h-[100px]'></div>
				</div>
			</div>
		);
	}
	else if (song)
	{
		const artist = await prisma.artist.findFirstOrThrow({
			where: {
				id: song.artistId
			}
		});

		const single: SingleWithArtist = {
			...song,
			artist
		};

		return (
			<div className='flex flex-col w-full items-center justify-center px-2 xl:p-0'>
				<div className='flex flex-col max-w-[1000px]'>
					<div className='flex flex-col items-center md:flex-row pt-4'>
						<div className='flex items-center justify-center w-full max-w-[300px] aspect-square pt-4'>
							<AlbumCover link={song.imageLink!} badges={getBadges(single)} type={'Single'} />
						</div>
						<div className='flex flex-col justify-between md:h-[300px] p-4 pt-2 pb-0 gap-y-2'>
							<div className='flex flex-col gap-2'>
								<p className='text-4xl'>{single.title}</p>
								<ArtistAvatar artist={single.artist} />
								<div className='flex h-full items-start'>
									<p className='text-4xl' style={{ color: getRatingColor(single.rating) }}>
										{single.rating}
									</p>
								</div>
							</div>
							{single.link && (
								<div>
									<a className='flex flex-row items-center gap-2 group' href={single.link} target='_blank'>
										<img className='object-contain items-center justify-center h-6 w-6' alt='Spotify Logo' src='/spotify_green.png' />
										<p className='text-white group-hover:underline'>Listen on Spotify</p>
										<p className='text-[24px]'>
											<OpenInNew />
										</p>
									</a>

									<p className='text-sm italic text-neutral-400'>Images and metadata provided by Spotify</p>
								</div>
							)}
						</div>
					</div>
					<hr className='my-8' />
					{content}
					<div className='min-w-full min-h-[100px]'></div>
				</div>
			</div>
		);
	}
	else
	{
		return (
			<div>
				<p className='text-lg'>Couldn't format this as an album or a song.</p>
				<p>Please let me know that this is broken! :)</p>
			</div>
		);
	}
}
