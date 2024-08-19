import getSpotifyArtist from "./artist";
import getSpotifyToken from "./token";

async function getSpotifyAlbumDataRaw(album_id: string, token: string) 
{
    const album_data_response = await fetch(`https://api.spotify.com/v1/albums/${album_id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const album_data = await album_data_response.json();
    return album_data;
}

async function getSpotifyAlbumData(album_id: string)
{
    const token = await getSpotifyToken();
    const album_data_raw = await getSpotifyAlbumDataRaw(album_id, token);

    const artist = await getSpotifyArtist(album_data_raw.artists[0].id, token);

    const structured = {
        title: album_data_raw.name,
        image: album_data_raw.images[0].url,
        artist_image: artist.images[0].url,
        artist_name: artist.name,
        album_name: album_data_raw.name,
        release_date: album_data_raw.release_date,
    }

    return structured;
}

export { getSpotifyAlbumDataRaw };
export default getSpotifyAlbumData;
