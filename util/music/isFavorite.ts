import { favs } from '@/const/favs';

const isFavorite = (song: { title: string; link?: string | null }, artistName: string) =>
{
	if (!song) return false;

	let result = favs.some(fav => fav.link === song.link);
	result = result || favs.some(fav => fav.name.toLowerCase().includes(song.title.toLowerCase()) && fav.artist.toLowerCase().includes(artistName.toLowerCase()))
	return result;
};

export default isFavorite;
