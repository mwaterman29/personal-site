import Image from 'next/image'
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import markdownToComponent from '@/util/ConvertMarkdown';
import Link from 'next/link';

export default function Posts() {

    const directoryPath = path.join(process.cwd(), 'content', 'posts');
    const fileNames = readdirSync(directoryPath);
    fileNames.sort();

    const files = fileNames.map(fname => readFileSync(path.join(directoryPath, fname), 'utf8'));

    return (
    <main className="flex flex-col min-h-full">
        <p className='p-4 text-lg'>Through my work at VRtex, and personally, 
        I have worked through a number of problems with little to no online documentation. 
        For the sake of being able to reference these later, and to share with others, they&#39;re documented here.
        If you have any questions, or need help implementing the content here, please do so via <a className='text-blue-300 underline' href='/contact'>the contact page</a>.</p>
        
        <div className='grid grid-cols-3 gap-8 p-4'>
            {files.map((data, _index) => {
                /*
                For each post, extract 
                -Title
                -Image url
                -One sentence summary
                Typora adds an extra line break between each, so reference lines 0, 2, and 4.
                */
                const lines = data.split('\n');
                const projTitle = lines[0].replace(/^#\s+/g, '').trim();
                const imageMatch = lines[2].match(/!\[.*\]\(([^)]+)\)/);
                const imageUrl = imageMatch ? imageMatch[1] : '';
                const summary = lines[4].trim();

                return(
                    <Link 
                        href={`/posts/${fileNames[_index]}`}
                        key={projTitle} className='flex w-full h-full items-center justify-center'>
                        <div className='bg-neutral-700 rounded-md p-4 h-full'>                        
                            <p className='text-2xl'>{projTitle}</p>
                            <hr/>
                            <Image
                                className='m-2'
                                src={imageUrl}
                                alt={projTitle + " Image"}
                                width={500}
                                height={500}
                            />
                            <p>{summary}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    </main>
    )
}

export const revalidate = 86400;