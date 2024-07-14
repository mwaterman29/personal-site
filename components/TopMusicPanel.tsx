import { AlbumWithArtist } from "@/app/music/types";
import getRatingColor from "@/util/getRatingColor";
import { Album, Artist, Song } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";



interface TopMusicPanelProps {
    albums: AlbumWithArtist[];
    songs: Song[];  
    singles: Song[];    
}

const ArtistAvatar = ({artist}: {artist: Artist}) => {

    const fallbackText = artist.name.split(' ').map((word) => word[0]).join('').slice(0, 2);

    return (
        <div className="flex flex-row items-center gap-x-2"> 
            <Avatar>
                <AvatarImage src={artist.imageLink ?? undefined} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-2xl">{artist.name}</p>
        </div>

    )
};


const TopMusicPanel = ({
    albums,
    songs,
    singles
}: TopMusicPanelProps) => {
    return (
        <div className="flex flex-col w-full">
            <p>Top Albums</p>
            <div className="grid grid-cols-3">
                {albums.map((album) => {
                    return (
                        <div className="flex flex-col p-2 border rounded-md gap-y-2 items-center">
                            <div className="flex flex-col gap-y-2">
                            <p className="text-4xl">{album.title}</p>
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
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default TopMusicPanel;