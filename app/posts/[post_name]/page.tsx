import Image from 'next/image'
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import markdownToComponent from '@/util/ConvertMarkdown';
import Link from 'next/link';


export default async function PostPage({ params }: { params: { post_name: string } }) 
{
    const directoryPath = path.join(process.cwd(), 'content', 'posts');
    const data = readFileSync(path.join(directoryPath, decodeURI(params.post_name)), "utf8");
    const content = await markdownToComponent(data);

    return (
        <div className='p-16 gap-2'>
            {content}
        </div>
    )
}