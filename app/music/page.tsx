import MusicHomePage from "@/components/Music/MusicHomePage";
import { prisma } from "@/prisma/client";

export default async function MusicPage()
{
    const albumReviews = await prisma.album.findMany({
        include: {
            artist: true,
            songs: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const singleReviews = await prisma.song.findMany({
        where: {
            reviewFile: {
                not: null
            }
        },
        include: {
            artist: true,
            album: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const songs = await prisma.song.findMany({});

    const essays = await prisma.essay.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="flex flex-col w-full h-full">
            <MusicHomePage albumReviews={albumReviews} allSongs={songs} singleReviews={singleReviews} essays={essays} />
        </div>
    )
}