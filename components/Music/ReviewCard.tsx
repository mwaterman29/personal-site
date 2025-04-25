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
import InfoIcon from '@material-symbols/svg-400/outlined/info.svg';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

import AlbumCover from "./AlbumCover";
import getBadges from "@/util/music/getBadges";


const ReviewCard = ({review}: {review: AlbumWithArtistAndSongs | SingleWithArtist}) => {

    const type = review.hasOwnProperty('songs') ? 'Album' : 'Single';
    const badges = getBadges(review);

    const hasRevision = review.revision_date !== null && review.revision_date !== undefined;

    return (
        <Link
        key={review.id}
        href={`/music/${review.reviewFile}`} 
        className="flex flex-col border rounded-md gap-y-2 items-start w-full justify-between">
            <div className="flex flex-col gap-y-2 w-full h-full justify-between">

                <div className="flex flex-row gap-2 px-4 pt-4 items-start min-h-[px]">
                    <ArtistAvatar artist={review.artist} hideName />
                    <div className="flex flex-col">
                       <p className="text-xl font-bold line-clamp-2" title={review.title}>{review.title}</p>
                       <p>{review.artist.name}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between text-sm p-2 pb-0">
                    <div className="flex items-center gap-1">
                        <p>Reviewed on {format(review.createdAt, 'MMMM dd, yyyy')}</p>
                        {hasRevision && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="cursor-help">
                                            <InfoIcon className="h-4 w-4 text-blue-500" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs">
                                        <p>Revised on {format(new Date(review.revision_date!), 'MMMM dd, yyyy')}</p>
                                        {review.revision_notes && (
                                            <p className="mt-1 text-xs">{review.revision_notes}</p>
                                        )}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    <p className="p-1 bg-blue-400 rounded-md">{type}</p>
                </div>
            </div>

            <AlbumCover link={review.imageLink!} badges={badges} type={type} rating={review.rating} card/>

            <p 
            className="text-2xl w-full text-center hidden"
            style={{color: getRatingColor(review.rating)}}>
                {type === 'Album' ? review.rating.toFixed(2) : review.rating}
            </p>
        </Link>
    )
}

export default ReviewCard;