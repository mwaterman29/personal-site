import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	const { artistName, isAlbum, title, rating, trackRatings, link, artistImageLink, imageLink, reviewFile } = await request.json();

	try {
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
					artistId: artist.id,
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
					artist: { connect: { id: artist.id } },
					imageLink: imageLink || null,
				},
			});
		}

		return NextResponse.json({ message: "Review submitted successfully" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Error submitting review" }, { status: 500 });
	}
}
