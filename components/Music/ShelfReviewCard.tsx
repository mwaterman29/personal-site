import { AlbumWithArtistAndSongs, SingleWithArtist } from "@/app/music/types";
import getRatingColor from "@/util/getRatingColor";
import { Album, Artist, Song } from "@prisma/client";
import Link from "next/link";
import ArtistAvatar from "./ArtistAvatar";
import { format } from 'date-fns'
import { useState } from "react";


const ShelfReviewCard = ({review}: {review: AlbumWithArtistAndSongs | SingleWithArtist}) => {

    const type = review.hasOwnProperty('songs') ? 'Album' : 'Single';
    const [selected, setSelected] = useState(false);

    return (
        <div>
            <div
            className={'flex items-center justify-center w-full max-w-full aspect-square cursor-pointer' + (selected ? ' animate-album-slide z-20 ' : ' z-0')}
            onClick={() => {
                setSelected(true);
            }}
            >
                <img
                    className='object-contain items-center justify-center'
                    alt='Preview Image'
                    src={review.imageLink!}
                />         
            </div>
            {selected && <div className="bg-black bg-opacity-50 absolute top-0 left-0 min-w-full min-h-full text-white z-10">
                asdfasd
            </div>}
        </div>
    )
}

export default ShelfReviewCard;

/*

    return (
        <Link
        key={review.id}
        href={`/music/${review.reviewFile}`} 
        className="flex flex-col p-2 border rounded-md gap-y-2 items-start w-full">
            <div className="flex flex-col gap-y-2 w-full min-h-[167px] justify-between">
                <p className="text-4xl line-clamp-2" title={review.title}>{review.title}</p>
                <ArtistAvatar artist={review.artist} />
                <div className="flex flex-row items-center justify-between">
                    <p>Reviewed on {format(review.createdAt, 'MMMM dd, yyyy')}</p>
                    <p className="p-1 bg-blue-400 rounded-md">{type}</p>
                </div>
            </div>

            <div className='flex items-center justify-center w-full max-w-full aspect-square pt-4'>
                <img
                    className='object-contain items-center justify-center'
                    alt='Preview Image'
                    src={review.imageLink!}
                />         
            </div>
            <p 
            className="text-2xl w-full text-center"
            style={{color: getRatingColor(review.rating)}}>
                {review.rating.toFixed(2)}
            </p>
        </Link>
    )

    */