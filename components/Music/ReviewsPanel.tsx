import { AlbumWithArtistAndSongs, SingleWithArtist } from "@/app/music/types";
import getRatingColor from "@/util/getRatingColor";
import { Album, Artist, Song } from "@prisma/client";
import Link from "next/link";
import ArtistAvatar from "./ArtistAvatar";
import { format } from 'date-fns'
import ReviewCard from "./ReviewCard";

interface ReviewsPanelProps {
    albums: AlbumWithArtistAndSongs[];
    songs: Song[];  
    singles: SingleWithArtist[];    
}

const ReviewsPanel = ({
    albums,
    songs,
    singles
}: ReviewsPanelProps) => 
{
    //Aggregate all albums and singles
    const all = [...albums, ...singles];

    return (
        <div className="flex flex-col w-full items-center">
            <p className="w-full text-start">Recent Reviews</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            {all.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()).map((review, index) => {
                return (
                    <ReviewCard review={review} key={index}/>
                )
            })}
            </div>

        </div>
    )
}

export default ReviewsPanel;

/*
{albums.sort((a,b) => b.rating - a.rating).map((album) => {
                    return (
                        <Link
                        key={album.id}
                        href={`/music/${album.reviewFile}`} 
                        className="flex flex-col p-2 border rounded-md gap-y-2 items-center">
                            <div className="flex flex-col gap-y-2">
                            <p className="text-4xl line-clamp-2" title={album.title}>{album.title}</p>
                            <ArtistAvatar artist={album.artist} />
                            </div>

                            <div className='flex items-center justify-center w-full max-w-full aspect-square pt-4'>
                                <img
                                    className='object-contain items-center justify-center'
                                    alt='Preview Image'
                                    src={album.imageLink}
                                />         
                            </div>
                            <p 
                            className="text-2xl"
                            style={{color: getRatingColor(album.rating)}}>
                                {album.rating.toFixed(2)}
                            </p>
                        </Link>
                    )
                })}

*/