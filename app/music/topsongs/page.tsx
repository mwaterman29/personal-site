import { prisma } from '@/prisma/client';
import TopSongsClient from './TopSongsClient';

async function getTopSongs()
{
	const songs = await prisma.song.findMany({
		where: {
			rating: {
				gte: 100
			}
		},
		include: {
			artist: true,
			album: {
				select: {
					reviewFile: true
				}
			}
		},
		orderBy: {
			rating: 'desc'
		}
	});

	// Group songs by rating (in increments of 5)
	const songsByRating = songs.reduce(
		(acc, song) =>
		{
			const rating = Math.floor(song.rating / 5) * 5;
			if (!acc[rating])
			{
				acc[rating] = [];
			}
			acc[rating].push(song);
			return acc;
		},
		{} as Record<number, typeof songs>
	);

	return songsByRating;
}

export default async function TopSongs()
{
	const songsByRating = await getTopSongs();

	return <TopSongsClient songsByRating={songsByRating} />;
}
