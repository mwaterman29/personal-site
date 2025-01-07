import { Essay } from '@prisma/client';
import Link from 'next/link';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const EssayCard = ({ essay }: { essay: Essay }) =>
{
	return (
		<Link key={essay.id} href={`/music/essays/${essay.fileLink}`} className='flex flex-col border rounded-md gap-y-2 items-start w-full justify-between'>
			<div className='flex flex-col gap-y-2 w-full h-full justify-between'>
				<div className='flex flex-row gap-2 px-6 pt-4 items-start min-h-[px]'>
					<div className='flex flex-col'>
						<p className='text-xl font-bold line-clamp-2' title={essay.title}>
							{essay.title}
						</p>
						<p className='text-sm pb-2'>Published on {format(essay.createdAt, 'MMMM dd, yyyy')}</p>
					</div>
				</div>

				<img className={cn('object-contain items-center justify-center ')} alt='Preview Image' src={essay.imageLink} />
                <div className='p-2'>
				    {essay.description && <p className='text-sm'>{essay.description}</p>}
                </div>
			</div>
		</Link>
	);
};

export default EssayCard;
