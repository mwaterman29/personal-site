import Image from 'next/image';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import markdownToComponent from '@/util/ConvertMarkdown';
import Link from 'next/link';

export default function Projects()
{
	const directoryPath = path.join(process.cwd(), 'content', 'projects');
	const fileNames = readdirSync(directoryPath);
	fileNames.sort();

	const files = fileNames.map(fname => readFileSync(path.join(directoryPath, fname), 'utf8'));

	return (
		<div className='flex flex-col min-h-full items-center justify-center gap-2'>
			<div className='flex flex-col items-center justify-center py-4 gap-2 max-w-[1000px]'>
				<p className='text-2xl font-bold'>What am I working on?</p>
				<p>
					The best way to see what I'm working on is to look at the{' '}
					<a href='https://mavenbio.com/changelog' className='text-blue-500 hover:text-blue-700 visited:text-purple-600'>
						changelog for my work (mavenbio.com)
					</a>
					. We post there biweekly, and as I have written practically 100% of the code on the front-end, it's the best place to see what I'm up to on
					a day-to-day basis.
				</p>
				<p>If you're a BioPharma professional, particularly in BD or CI, check us out!</p>
				<div className='h-[1px] w-full bg-neutral-700' />
				<p>Personally, I'm working on a variety of projects: </p>
				<ul className='list-disc list-inside'>
					<li>
						Improvements to this site as well as content for{' '}
						<a className='text-blue-500 hover:text-blue-700 visited:text-purple-600' href='/music'>
							the Music Page
						</a>
					</li>
					<li>
						<a
							className='text-blue-500 hover:text-blue-700 visited:text-purple-600'
							href='https://github.com/mwaterman29/against-the-storm-explorer-v2'
						>
							An all-in-one companion tool for Against the Storm.
						</a>
					</li>
					<li>Maintanence here and there for everything listed below.</li>
				</ul>
				<p>And of course, this stack of projects grows endlessly: I get new ideas much quicker than I can finish them.</p>
			</div>

			<p className='pt-6 text-2xl font-bold'>What have I worked on?</p>
			<hr />

			<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-4'>
				{files.map((data, _index) =>
				{
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

					return (
						<Link href={`/engineering/${fileNames[_index]}`} key={projTitle} className='flex flex-col w-full h-full items-start justify-start gap-2 border border-white rounded-md p-4'>
							<p className='text-2xl'>{projTitle}</p>
							<p>{summary}</p>

							<Image className='m-2' src={imageUrl} alt={projTitle + ' Image'} width={500} height={500} />
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export const revalidate = 86400;
