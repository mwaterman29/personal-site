import Image from 'next/image'
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import markdownToComponent from '@/util/ConvertMarkdown';

export default function Projects() {

    const directoryPath = path.join(process.cwd(), 'content', 'projects');
    const fileNames = readdirSync(directoryPath);

    const files = fileNames.map(fname => readFileSync(path.join(directoryPath, fname), 'utf8'));

    return (
    <main className="flex flex-col min-h-full">
        <p className=''>Projects</p>
        <div className='grid grids-cols-2'>
            {files.map((data, _index) => {
                /*
                For each project, extract 
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
                    <div key={projTitle}>
                        <p>{projTitle}</p>
                        <Image
                            src={imageUrl}
                            alt={projTitle + "Image"}
                            width={400}
                            height={400}
                        />
                        <p>{summary}</p>
                    </div>
                )
            })}
        </div>
    </main>
    )
}

export const revalidate = 86400;