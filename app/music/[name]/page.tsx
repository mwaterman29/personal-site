import Image from 'next/image'
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import markdownToComponent from '@/util/ConvertMarkdown';
import Link from 'next/link';
import { prisma } from '@/prisma/client';
import ArtistAvatar from '@/components/ArtistAvatar';
import getRatingColor from '@/util/getRatingColor';


export default async function PostPage({ params }: { params: { name: string } }) 
{
    const directoryPath = path.join(process.cwd(), 'content', 'reviews');
    const data = readFileSync(path.join(directoryPath, decodeURIComponent(params.name)), "utf8");

    //Find the review for this album/song
    const album = await prisma.album.findFirst({
        where: {
            reviewFile: params.name
        },
        include: {
            artist: true,
            songs: true
        }
    });

    const song = await prisma.song.findFirst({
        where: {
            reviewFile: params.name
        },
        include: {
            album: {
                include: {
                    artist: true
                }
            }
        }
    });

    /*
        const content = await markdownToComponent(data);

    console.log(data);
    */
    if(album)
    {
        //strip first three lines
        const startIndexOfContent = data.indexOf('\n', data.indexOf('\n', data.indexOf('\n') + 1) + 1);
        //remove from "Track Ratings:" to end
        const endIndexOfContent = data.indexOf('Track Ratings:');

        const contentSlice = data.substring(startIndexOfContent, endIndexOfContent);
        const content = await markdownToComponent(contentSlice);

        return (
            <div className='flex flex-col w-full items-center justify-center'>
                <div className='flex flex-col max-w-[120ch]'>
                    <div className='flex flex-row'>
                        <div className='flex items-center justify-center w-full max-w-[300px] aspect-square pt-4'>
                            <img
                                className='object-contain items-center justify-center'
                                alt='Preview Image'
                                src={album.imageLink}
                            />
                        </div>
                        <div className='flex flex-col max-h-[300px] p-4 gap-y-2'>
                            <p className='text-4xl'>{album.title}</p>
                            <ArtistAvatar artist={album.artist} />
                            <div className='flex h-full items-start'>
                                <p
                                className='text-4xl'
                                style={{color: getRatingColor(album.rating)}}
                                >
                                    {album.rating.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr className='my-8'/>
                    {content}
                    <hr className='my-8'/>
                    <p className='text-2xl'>Track Ratings</p>
                    <div className='flex flex-col gap-y-1 pt-6'>
                        {album.songs.map((song) => {
                            return (
                                <div key={song.id} className=''>
                                    <p className=''>
                                            {song.title}
                                            &nbsp;-&nbsp;
                                            <span
                                            className=''
                                            style={{color: getRatingColor(song.rating)}}
                                            >
                                                {song.rating}
                                            </span>
                                        </p>
                                </div>
                            )
                        })}
                    </div>

                    <div className='min-w-full min-h-[100px]'></div>

                </div>

            </div>
        )
    }
    else
    {
        return (
            <div>

            </div>
        )
    }


}