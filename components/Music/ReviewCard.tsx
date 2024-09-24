import { AlbumWithArtistAndSongs, SingleWithArtist } from "@/app/music/types";
import getRatingColor from "@/util/getRatingColor";
import { Album, Artist, Song } from "@prisma/client";
import Link from "next/link";
import ArtistAvatar from "./ArtistAvatar";
import { format } from 'date-fns'
import fetchFavorites from "@/util/spotify/fetch_favorites";
import { favs } from "@/const/favs";
import { useEffect, useState } from "react";
import Star from '@material-symbols/svg-400/outlined/star-fill.svg';

function getBadges(review: AlbumWithArtistAndSongs | SingleWithArtist) 
{
    const songs = review.hasOwnProperty('songs') ? (review as AlbumWithArtistAndSongs).songs : [{title: (review as SingleWithArtist).title, link: (review as SingleWithArtist).link}];

    const badges = [];

    // If any of these urls are in my favorites, return the badge
    const fav = songs.some(song => 
    {   
        if(!song)
            return false;

        if(favs.some(fav => fav.link === song.link))
        {
            return true;
        }
        if(favs.some(fav => fav.name.toLowerCase().includes(song.title.toLowerCase()) && fav.artist.toLowerCase().includes(review.artist.name.toLowerCase())))
        {
            return true;
        }
        return false;
    })

    if(fav)
    {
        badges.push('favorite');
    }

    //If this is an album with an average rating of 85 or higher, return the badge
    if(review.hasOwnProperty('songs') && review.rating >= 8)
    {
        badges.push('peak');
    }

    //If this is a single with a rating of 100 or higher, return the badge
    if(!review.hasOwnProperty('songs') && review.rating >= 100)
    {
        badges.push('peak');
    }

    //console.log(badges, 'for', review.title, songs, favs);

    return badges;

}

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

            <div className='relative flex items-center justify-center w-full max-w-full aspect-square pt-4'>
                <img
                    className='object-contain items-center justify-center'
                    alt='Preview Image'
                    src={review.imageLink!}
                />    

                {badges.includes('peak') && 
                    <div className="absolute top-2 right-0">
                        <div className="relative w-0 h-0 border-b-[50px] border-r-[50px] border-b-transparent border-r-[#ff6f08] border-opacity-70">
                            <div className="absolute right-[-46px] top-[0px]">
                                <Star className="text-white text-[24px]" />
                            </div>
                        </div>
                    </div>
                }  

                {badges.includes('favorite') && <div className="absolute top-0 left-2">
                    <p>test</p>
                </div>}
            </div>
            <p 
            className="text-2xl w-full text-center"
            style={{color: getRatingColor(review.rating)}}>
                {review.rating.toFixed(2)}
            </p>
        </Link>
    )
}

export default ReviewCard;