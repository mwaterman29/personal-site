import { AlbumWithArtistAndSongs, SingleWithArtist } from "@/app/music/types";
import getRatingColor from "@/util/getRatingColor";
import { Album, Artist, Song } from "@prisma/client";
import Link from "next/link";
import ArtistAvatar from "./ArtistAvatar";
import { format } from 'date-fns'
import fetchFavorites from "@/util/spotify/fetch_favorites";
import { favs } from "@/const/favs";
import { useEffect, useState } from "react";

//Icons
import Star from '@material-symbols/svg-400/outlined/star-fill.svg';
import Favorite from '@material-symbols/svg-400/outlined/favorite-fill.svg';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

import AlbumCover from "./AlbumCover";
import getBadges from "@/util/music/getBadges";


const ReviewCard = ({review}: {review: AlbumWithArtistAndSongs | SingleWithArtist}) => {

    const type = review.hasOwnProperty('songs') ? 'Album' : 'Single';
    const badges = getBadges(review);

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

            <AlbumCover link={review.imageLink!} badges={badges} />

            <p 
            className="text-2xl w-full text-center"
            style={{color: getRatingColor(review.rating)}}>
                {type === 'Album' ? review.rating.toFixed(2) : review.rating}
            </p>
        </Link>
    )
}

export default ReviewCard;