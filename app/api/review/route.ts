import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/prisma/client';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { artistName, isAlbum, title, rating, trackRatings, link, artistImageLink, albumImageLink, songImageLink } = req.body;

    try {
      // Find or create the artist
      let artist = await prisma.artist.findFirst({
        where: {
            name: artistName,
        }
      })
      if (!artist) {
        artist = await prisma.artist.create({ data: { name: artistName, link: link || undefined, imageLink: artistImageLink || undefined } });
      }

      if (isAlbum) {
        // Create the album and its tracks
        const album = await prisma.album.create({
          data: {
            title,
            rating,
            link,
            reviewFile: '',
            imageLink: albumImageLink,
            artist: { connect: { id: artist.id } },
          },
        });

        await prisma.song.createMany({
          data: trackRatings.map((track) => ({
            title: track.name,
            rating: track.rating,
            albumId: album.id,
            artistId: artist.id,
            imageLink: songImageLink || undefined,
          })),
        });
      } else {
        // Create the individual song
        await prisma.song.create({
          data: {
            title,
            rating,
            link,
            artist: { connect: { id: artist.id } },
            imageLink: songImageLink || undefined,
          },
        });
      }

      res.status(200).json({ message: 'Review submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
