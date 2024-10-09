import getSpotifyArtist from "./artist";
import getSpotifyToken from "./token";

async function getSpotifyTrackDataRaw(track_id: string, token: string) 
{
    const track_data_response = await fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });

    const track_data = await track_data_response.json();
    return track_data;
}

async function getSpotifyTrackData(track_id: string) 
{
    const token = await getSpotifyToken();
    const track_data_raw = await getSpotifyTrackDataRaw(track_id, token);
    console.log(track_data_raw);

    const artist = await getSpotifyArtist(track_data_raw.artists[0].id, token);

    const structured = {
        title: track_data_raw.name,
        image: track_data_raw.album.images[0].url,
        artist_image: artist.images[0].url,
        artist_name: artist.name,
        album_name: track_data_raw.album.name,
        release_date: track_data_raw.album.release_date,
    }

    return structured;
}

export { getSpotifyTrackDataRaw };
export default getSpotifyTrackData;
