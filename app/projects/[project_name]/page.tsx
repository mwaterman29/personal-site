import Image from 'next/image'
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import markdownToComponent from '@/util/ConvertMarkdown';
import Link from 'next/link';


export default function ProjectPage({ params }: { params: { project_name: string } }) 
{
    const directoryPath = path.join(process.cwd(), 'content', 'projects');
    const data = readFileSync(path.join(directoryPath, decodeURI(params.project_name)), "utf8");

    return (
        <div className='p-16 gap-2'>
            {markdownToComponent(data)}
        </div>
    )
}