async function getSpotifyArtist(id: string, token: string) {
    const artist_data_response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const artist_data = await artist_data_response.json();
    return artist_data;
}

export default getSpotifyArtist;