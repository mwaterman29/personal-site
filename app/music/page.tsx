import { Suspense } from "react";
import MusicHomePage from "@/components/Music/MusicHomePage";
import { prisma } from "@/prisma/client";

// MusicHomePage reads ?tab= / ?shelf= via useSearchParams. Without a boundary that deopts
// this whole route into client-side rendering, and leaves the params empty on the first
// client render - so a deeplinked tab visibly flashes the default before correcting.
const TabsSkeleton = () => (
    <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="w-full max-w-[1035px] p-4">
            <div className="h-[60px] w-full rounded-md bg-neutral-950 animate-pulse" />
        </div>
    </div>
);

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
            <Suspense fallback={<TabsSkeleton />}>
                <MusicHomePage albumReviews={albumReviews} allSongs={songs} singleReviews={singleReviews} essays={essays} />
            </Suspense>
        </div>
    )
}