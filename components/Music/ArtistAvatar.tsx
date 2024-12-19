import { Artist } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ArtistAvatar = ({artist, hideName}: {artist: Artist, hideName?: boolean}) => {

    const fallbackText = artist.name.split(' ').map((word) => word[0]).join('').slice(0, 2);

    return (
        <div className="flex flex-row items-center gap-x-2"> 
            <Avatar>
                <AvatarImage src={artist.imageLink ?? undefined} />
                <AvatarFallback>fallbackText</AvatarFallback>
            </Avatar>
            {!hideName && <p className="text-2xl">{artist.name}</p>}
        </div>

    )
};

export default ArtistAvatar;