import { Essay } from '@prisma/client';
import Link from 'next/link';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const EssayCard = ({ essay }: { essay: Essay }) =>
{
	return (
		<Link key={essay.id} href={`/music/essays/${essay.fileLink}`} className='flex flex-col border rounded-md gap-y-2 items-start w-full justify-between group'>
			<div className='flex flex-col gap-y-2 w-full h-full justify-between'>
				<div className='flex flex-row gap-2 px-6 pt-4 items-start min-h-[px]'>
					<div className='flex flex-col'>
						<p className='text-xl font-bold line-clamp-2' title={essay.title}>
							{essay.title}
						</p>
					</div>
				</div>

				<div className='flex flex-row items-center justify-between text-sm px-6 pb-2'>
					<p>Published on {format(essay.createdAt, 'MMMM dd, yyyy')}</p>
					<p className='p-1 bg-purple-400 rounded-md'>Essay</p>
				</div>

				<div className='relative overflow-hidden w-full'>
					<img className={cn('w-full h-auto object-cover transition-all duration-300 group-hover:brightness-50')} alt='Preview Image' src={essay.imageLink} />
					{essay.description && (
						<div className='absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
							<p className='text-white text-sm text-center leading-relaxed'>{essay.description}</p>
						</div>
					)}
				</div>
			</div>
		</Link>
	);
};

export default EssayCard;
