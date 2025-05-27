import { Essay } from '@prisma/client';
import Link from 'next/link';
import { format } from 'date-fns';

const EssayListItem = ({ essay }: { essay: Essay }) => {
    return (
        <Link 
            href={`/music/essays/${essay.fileLink}`} 
            className='flex flex-col py-6 border-b border-neutral-800 hover:bg-neutral-950 transition-colors group'
        >
            <div className='flex flex-col gap-2'>
                <h3 className='text-xl font-semibold group-hover:text-blue-400 transition-colors'>
                    {essay.title}
                </h3>
                <p className='text-sm text-neutral-400'>
                    {format(essay.createdAt, 'MMMM dd, yyyy')}
                </p>
                {essay.description && (
                    <p className='text-neutral-300 line-clamp-2'>
                        {essay.description}
                    </p>
                )}
            </div>
        </Link>
    );
};

export default EssayListItem; 