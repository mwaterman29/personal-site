import { AlbumWithArtistAndSongs, SingleWithArtist } from "@/app/music/types";
import { Essay, Song } from "@prisma/client";
import ReviewCard from "./ReviewCard";
import EssayCard from "./EssayCard";

interface LatestPanelProps {
    albums: AlbumWithArtistAndSongs[];
    songs: Song[];  
    singles: SingleWithArtist[];
    essays: Essay[];
}

type LatestItem = (AlbumWithArtistAndSongs | SingleWithArtist | Essay) & {
    itemType: 'review' | 'essay';
};

const LatestPanel = ({
    albums,
    songs,
    singles,
    essays
}: LatestPanelProps) => 
{
    // Aggregate all albums, singles, and essays with type information
    const reviewItems: LatestItem[] = [...albums, ...singles].map(item => ({
        ...item,
        itemType: 'review' as const
    }));
    
    const essayItems: LatestItem[] = essays.map(item => ({
        ...item,
        itemType: 'essay' as const
    }));
    
    const allItems = [...reviewItems, ...essayItems];

    return (
        <div className="flex flex-col w-full items-center">
            <p className="w-full text-start text-2xl font-semibold pb-4">Latest Reviews & Essays</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                {allItems
                    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                    .map((item, index) => {
                        if (item.itemType === 'essay') {
                            return <EssayCard essay={item as Essay} key={`essay-${item.id}`} />;
                        } else {
                            return <ReviewCard review={item as AlbumWithArtistAndSongs | SingleWithArtist} key={`review-${item.id}`} />;
                        }
                    })
                }
            </div>
        </div>
    );
};

export default LatestPanel; 