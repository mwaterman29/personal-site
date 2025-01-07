import Image from 'next/image'
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import markdownToComponent from '@/util/ConvertMarkdown';
import Link from 'next/link';
import { prisma } from '@/prisma/client';
import ArtistAvatar from '@/components/Music/ArtistAvatar';
import getRatingColor from '@/util/getRatingColor';

import OpenInNew from '@material-symbols/svg-400/outlined/open_in_new.svg';
import AlbumCover from '@/components/Music/AlbumCover';
import getBadges from '@/util/music/getBadges';

export default async function PostPage({ params }: { params: { name: string } }) 
{
    const directoryPath = path.join(process.cwd(), 'content', 'essays');
    const filenames = readdirSync(directoryPath);
  
    // Find the matching filename in a case-insensitive manner to make sure git doesn't mess up the casing
    const matchingFilename = filenames.find(
      filename => filename.toLowerCase() === decodeURIComponent(params.name).toLowerCase()
    );

    //Find this essay with prisma
    const essay = await prisma.essay.findFirst({
        where: {
            fileLink: params.name
        }
    });
  


    if (!matchingFilename)
    {
      throw new Error(`File not found: ${params.name}`);
    }

    if(!essay)
    {
        throw new Error(`Essay not found: ${params.name}`);
    }

    const data = readFileSync(path.join(directoryPath, matchingFilename), 'utf8');

    //Content is everything after the first three lines
    const contentSlice = data.substring(data.indexOf('\n', data.indexOf('\n', data.indexOf('\n') + 1) + 1) + 1);
    
    let content = await markdownToComponent(contentSlice);

    try
    {
        return (
            <div className='flex flex-col w-full items-center justify-center px-2 py-8'>
                <div className='flex flex-col max-w-[1000px]'>
                    <h1 className='text-3xl font-semibold'>{essay.title}</h1>
                    <p className='text text-neutral-400 pt-1.5'>{essay.description}</p>

                    <hr className='my-8'/>
                    {content}
                    <div className='min-w-full min-h-[100px]'></div>
                </div>
            </div>
        )
    }
    catch (error)
    {
        return (
            <div>
                <p className='text-lg'>Couldn't format this essay.</p>
                <p>Please let me know that this is broken! :)</p>
            </div>
        )
    }
}