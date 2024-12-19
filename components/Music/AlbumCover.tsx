'use client'

import Star from '@material-symbols/svg-400/outlined/star-fill.svg';
import Favorite from '@material-symbols/svg-400/outlined/favorite-fill.svg';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import getRatingColor from '@/util/getRatingColor';

interface AlbumCoverProps 
{
    link: string;
    badges: string[];
    type: 'Album' | 'Single';
    rating?: number;
}

const AlbumCover = ({link, badges, type, rating}: AlbumCoverProps) => {
    return (
        <div className='relative flex items-center justify-center w-full max-w-full aspect-square'>
            <img
                className='object-contain items-center justify-center'
                alt='Preview Image'
                src={link}
            />    

            {badges.includes('peak') && 
                <div className="absolute top-0 right-0">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="relative w-0 h-0 border-b-[50px] border-r-[50px] border-b-transparent border-r-peak border-opacity-70">
                                    <div className="absolute right-[-46px] top-[0px]">
                                        <Star className="text-white text-[24px]" />
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-neutral-400">
                                <p>This {type === 'Album' ? 'album' : 'song'} is <span className="text-peak">peak</span>!</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            }  

            {badges.includes('favorite') && 
                <div className="absolute top-0 left-0">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="relative w-0 h-0 border-b-[50px] border-l-[50px] border-b-transparent border-l-favorite border-opacity-70">
                                    <div className="absolute left-[-46px] top-[4px]">
                                        <Favorite className="text-white text-[24px]" />
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-neutral-400">
                                {
                                    type === 'Album' ? 
                                    <p>This album has one of my <span className="text-favorite">favorite songs</span> on it!</p> :
                                    <p>This is one of my <span className="text-favorite">favorite songs</span>!</p>
                                }
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            }  

            {rating && <div className='flex flex-row absolute bottom-0 right-0 min-w-8 min-h-2 '>
                <div className='border-b-[50px] border-l-[50px] border-l-transparent border-b-black' />
                <p 
                className="text-2xl w-full text-center bg-black"
                style={{color: getRatingColor(rating)}}>
                    {type === 'Album' ? rating.toFixed(2) : rating}
                </p>
            </div>}
        </div>
    )
}

export default AlbumCover;