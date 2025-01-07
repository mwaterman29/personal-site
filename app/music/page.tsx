import MusicHomePage from "@/components/Music/MusicHomePage";
import { prisma } from "@/prisma/client";

export default async function MusicPage()
{
    const albumReviews = await prisma.album.findMany({
        include: {
            artist: true,
            songs: true
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
        } 
    });

    const songs = await prisma.song.findMany({});

    return (
        <div className="flex flex-col w-full h-full">
            <MusicHomePage albumReviews={albumReviews} allSongs={songs} singleReviews={singleReviews} posts={[]} />
        </div>
    )
}