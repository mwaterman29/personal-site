import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import getSpotifyAlbumData from "@/util/spotify/album";
import extractSpotifyAlbumId from "@/util/spotify/extractAlbumId";
import getSpotifyTrackData from "@/util/spotify/track";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) 
{
	// If this isn't local, return an error
	if(process.env.NODE_ENV !== "development")
	{
		return NextResponse.json({ error: "This endpoint is only available locally" }, { status: 400 });
	}
	

	let { artistName, isAlbum, title, rating, trackRatings, link, artistImageLink, imageLink, reviewFile } = await request.json();

	//From the passed link, if it's a spotify link, extract the ID and fetch some information
	if(link.includes("spotify"))
	{
		const id = extractSpotifyAlbumId(link);

		if(!id)
		{
			return NextResponse.json({ error: "Invalid Spotify link" }, { status: 400 });
		}

		if(link.includes("track"))
		{
			const data = await getSpotifyTrackData(id);
			artistImageLink = artistImageLink.length > 0 ? artistImageLink : data.artist_image;
			imageLink = imageLink.length > 0 ? imageLink : data.image;
			artistName = artistName.length > 0 ? artistName : data.artist_name;
			title = title.length > 0 ? title : data.title;
		}
		else if(link.includes("album"))
		{
			const data = await getSpotifyAlbumData(id);
			artistImageLink = artistImageLink.length > 0 ? artistImageLink : data.artist_image;
			imageLink = imageLink.length > 0 ? imageLink : data.image;
			artistName = artistName.length > 0 ? artistName : data.artist_name;
			title = title.length > 0 ? title : data.title;
		}
		else
		{
			return NextResponse.json({ error: "Invalid Spotify link (only support track/album)" }, { status: 400 });
		}
	}
	
	try 
	{
		// Find or create the artist
		let artist = await prisma.artist.findUnique({ where: { name: artistName } });
		if (!artist) 
    	{
			console.log("Creating artist", artistName);
			artist = await prisma.artist.create({ data: { name: artistName, link: link || undefined, imageLink: artistImageLink || undefined } });
		}

		if (isAlbum) 
		{

			// Create the album and its tracks
			console.log("Creating album", title);
				const album = await prisma.album.create({
					data: {
						title,
						rating,
						link,
						reviewFile: reviewFile,
						imageLink: imageLink,
						artist: { connect: { id: artist.id } },
					},
				});

			trackRatings.forEach((track: any) => {
				console.log("Creating track", track.name, track.rating);
			});

			await prisma.song.createMany({
				data: trackRatings.map((track: any) => ({
					title: track.name,
					rating: track.rating,
					albumId: album.id,
					artistId: artist?.id,
					imageLink: imageLink || undefined,
				})),
			});
		} 
		else 
		{
			// Create the individual song
			console.log("Creating song as a single review");
			await prisma.song.create({
				data: {
					title,
					rating,
					link,
					reviewFile: reviewFile,
					artist: { connect: { id: artist?.id } },
					imageLink: imageLink || null,
				},
			});
		}

		return NextResponse.json({ message: "Review submitted successfully" });
	} 
	catch (error) 
	{
		console.error(error);
		return NextResponse.json({ error: "Error submitting review" }, { status: 500 });
	}
}
