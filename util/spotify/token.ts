async function getSpotifyToken() 
{
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    //@ts-ignore
    const tokenBuffer = new Buffer.from(client_id + ':' + client_secret)
    const token = tokenBuffer.toString('base64');

    const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }),
    };

    console.log(options);

    const resp = await fetch('https://accounts.spotify.com/api/token', options);
    const data = await resp.json();

    return data.access_token;
}

export default getSpotifyToken;