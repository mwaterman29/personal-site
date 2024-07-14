'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import TopMusicPanel from "./TopMusicPanel";
import { Album, Song } from "@prisma/client";
import { AlbumWithArtist } from "@/app/music/types";

interface MusicHomePageProps {
    albumReviews: AlbumWithArtist[];
    allSongs: Song[];
    singleReviews: Song[];
    philosophyArticles: any[];   
}

const MusicHomePage = ({
    albumReviews,
    allSongs,
    singleReviews,
    philosophyArticles,
}: MusicHomePageProps) => {

    const [tabSelected, setTabSelected] = useState('reviews');

    const testAlbums = Array.from({length: 27}, (_, i) => ({
        id: i,
        title: `Album ${i}`,
        rating: i * 5,
    })) as any[];

    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <Tabs className="w-full max-w-[120ch] p-4" value={tabSelected} onValueChange={setTabSelected}>
                <TabsList className="w-full bg-black">
                    <TabsTrigger 
                    className="group data-[state=active]:bg-neutral-800 bg-neutral-950 text-white data-[state=active]:text-white w-full text-xl " 
                    value="top"
                    >
                        <div className='transition-all'>
                            <p className='text-2xl '>Top</p> 
                            {tabSelected !== 'top' && <span className="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-white"></span>}
                            {tabSelected === 'top' && <span className="block w-full transition-all duration-400 h-0.5 bg-white"></span>}
                        </div>
                    </TabsTrigger>
                    <TabsTrigger 
                    className="group data-[state=active]:bg-neutral-800 bg-neutral-950 text-white data-[state=active]:text-white w-full text-xl " 
                    value="reviews"
                    >
                        <div className='transition-all'>
                            <p className='text-2xl '>Reviews</p> 
                            {tabSelected !== 'reviews' && <span className="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-white"></span>}
                            {tabSelected === 'reviews' && <span className="block w-full transition-all duration-400 h-0.5 bg-white"></span>}
                        </div>
                    </TabsTrigger>
                    <TabsTrigger 
                    className="group data-[state=active]:bg-neutral-800 bg-neutral-950 text-white data-[state=active]:text-white w-full text-xl " 
                    value="philosophy"
                    >
                        <div className='transition-all'>
                            <p className='text-2xl '>Philosophy</p> 
                            {tabSelected !== 'philosophy' && <span className="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-white"></span>}
                            {tabSelected === 'philosophy' && <span className="block w-full transition-all duration-400 h-0.5 bg-white"></span>}
                        </div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="top">
                    <TopMusicPanel albums={albumReviews} songs={allSongs} singles={singleReviews} />
                </TabsContent>
                <TabsContent value="reviews">
                    <p>reviews here</p>
                </TabsContent>
                <TabsContent value="philosophy">
                    <p>philosophy here</p>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default MusicHomePage;