import Image from 'next/image'
import { readdirSync, readFileSync } from 'fs';
import path from 'path';

export default function Projects() {

    const directoryPath = path.join(process.cwd(), 'content', 'projects');
    const fileNames = readdirSync(directoryPath);

    const files = fileNames.map(fname => readFileSync(path.join(directoryPath, fname), 'utf8'));

    return (
    <main className="flex flex-col min-h-full">
        <p className=''>intro goes here</p>
        {files.map(data => {
            return (
                <p>{data}</p>
            )
        })}
    </main>
    )
}

export const revalidate = 86400;