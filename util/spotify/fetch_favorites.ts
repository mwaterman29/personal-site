import { fav_urls, favs } from "@/const/favs";
import getSpotifyToken from "./token"

const generateFavorites = async () => 
{
    const token = await getSpotifyToken();
    console.log('fetching favorites', token);

    const spotifyIds = fav_urls.filter(url => url.includes('/track/')).map(url => url.split('/').pop());
    const idString = spotifyIds.join(',');

    const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${idString}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await response.json();

    //Format the data to be more readable
    const tracks = data.tracks.map((track: any) => {
        return {
            id: track.id,
            name: track.name,
            artist: track.artists.map((artist: any) => artist.name).join(', '),
            album: track.album.name,
            image: track.album.images[0].url,
            link: track.external_urls.spotify
        }
    });

    return tracks;
}

export default generateFavorites;