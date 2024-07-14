import MusicHomePage from "@/components/MusicHomePage";
import { prisma } from "@/prisma/client";

export default async function MusicPage()
{
    const albumReviews = await prisma.album.findMany({

    });

    const singleReviews = await prisma.song.findMany({
        where: {
            reviewFile: {
                not: null
            }
        }     
    });

    return (
        <div className="flex flex-col w-full h-full">
            <MusicHomePage albumReviews={albumReviews} singleReviews={singleReviews} philosophyArticles={[]} />
        </div>
    )
}