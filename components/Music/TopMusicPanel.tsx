import { AlbumWithArtist, AlbumWithArtistAndSongs, SingleWithArtist } from "@/app/music/types";
import getRatingColor from "@/util/getRatingColor";
import { Album, Artist, Song } from "@prisma/client";
import Link from "next/link";
import ArtistAvatar from "./ArtistAvatar";
import ReviewCard from "./ReviewCard";

interface TopMusicPanelProps {
    albums: AlbumWithArtistAndSongs[];
    songs: Song[];  
    singles: SingleWithArtist[];    
}

const TopMusicPanel = ({
    albums,
    songs,
    singles
}: TopMusicPanelProps) => {
    return (
        <div className="flex flex-col w-full">
            <p>Top Albums</p>
            <div className="grid grid-cols-3 gap-4">
                {albums.sort((a,b) => b.rating - a.rating).map((album) => {
                    return (
                        <ReviewCard review={album} />
                    )
                })}
            </div>

        </div>
    )
}

export default TopMusicPanel;