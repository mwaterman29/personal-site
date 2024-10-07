function extractSpotifyAlbumId(url: string) 
{
	// URL format is https://open.spotify.com/album | track/[id]/some stuff - pull id w/ regex
	const regex = /(?:album|track)\/([a-zA-Z0-9]+)/;
	const match = url.match(regex);
	return match ? match[1] : null;
}

export default extractSpotifyAlbumId;