import { AlbumWithArtistAndSongs, SingleWithArtist } from "@/app/music/types";
import { favs } from "@/const/favs";


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

    //If this is an album with an average rating of 88 or higher, return the badge
    if(review.hasOwnProperty('songs') && review.rating >= 88)
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

export default getBadges;