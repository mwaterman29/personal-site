//https://open.spotify.com/album/2cwwBz019F7hQwggBShXCv?si=3Q92S4C1TnOb7F6eFUuYeA
//https://open.spotify.com/album/58iEeJbYd6OBGRM0TiwltL?si=v-8zOk43SvaA1sQyF9eIZw

import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/prisma/client'
import getSpotifyAlbumData from "@/util/spotify/album";
import extractSpotifyAlbumId from "@/util/spotify/extractAlbumId";

//ex for testing secret of us
//http://localhost:3000/api/spotify?album_id=56bdWeO40o3WfAD2Lja4dl

export async function GET(request: NextRequest) 
{
    const params = request.nextUrl.searchParams

    const albumId = params.get('album_id');
    if(albumId)
    {
        const data = await getSpotifyAlbumData(albumId);

        console.log("Spotify data extracted", data);

        return NextResponse.json(data);

    }

		return NextResponse.json({ error: "No supported options provided" }, { status: 400 });


    const id = '58iEeJbYd6OBGRM0TiwltL';

    const data = await getSpotifyAlbumData(id);

    return NextResponse.json(data);

}


/*

	if(link.includes("spotify"))
	{
		const id = extractSpotifyAlbumId(link);
		if(id)
		{
			const data = await getSpotifyAlbumData(id);
			artistImageLink = artistImageLink.length > 0 ? artistImageLink : data.artist_image;
			imageLink = imageLink.length > 0 ? imageLink : data.image;
			artistName = artistName.length > 0 ? artistName : data.artist_name;
			title = title.length > 0 ? title : data.title;

			const structured = {
				artistName,
				title,
				rating,
				link,
				artistImageLink,
				imageLink,
				reviewFile
			};

			console.log("Spotify data extracted", structured);

			return NextResponse.json(structured);
		}

		return NextResponse.json({ error: "Invalid Spotify link" }, { status: 400 });

	}
	

*/