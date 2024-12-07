import { AlbumWithArtistAndSongs, SingleWithArtist } from '@/app/music/types';
import getRatingColor from '@/util/getRatingColor';
import { Album, Artist, Song } from '@prisma/client';
import Link from 'next/link';
import ArtistAvatar from './ArtistAvatar';
import { format } from 'date-fns';
import { useState, useEffect, useRef } from 'react';

import Star from '@material-symbols/svg-400/outlined/star-fill.svg';
import Favorite from '@material-symbols/svg-400/outlined/favorite-fill.svg';
import OpenInNew from '@material-symbols/svg-400/outlined/open_in_new.svg';

import getBadges from '@/util/music/getBadges';

const ShelfReviewCard = ({ review }: { review: AlbumWithArtistAndSongs | SingleWithArtist }) => {
	const type = review.hasOwnProperty('songs') ? 'Album' : 'Single';
	const badges = getBadges(review);

	const [selected, setSelected] = useState(false);
	const [contentVisible, setContentVisible] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);
	const visibleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if(!cardRef.current) return;

		if (selected) 
		{
			const rect = cardRef.current.getBoundingClientRect();
			cardRef.current.style.position = 'fixed';
			cardRef.current.style.top = `${rect.top}px`;
			cardRef.current.style.left = `${rect.left}px`;
			cardRef.current.style.width = `${rect.width}px`;
			cardRef.current.style.height = `${rect.height}px`;

			// Set the initial position to animate from
			cardRef.current.style.setProperty('--initial-left', `${rect.left}px`);

			// Trigger reflow to apply the absolute positioning before animation
			cardRef.current.offsetHeight;

			cardRef.current.classList.add('animate-album-slide');
		}
		else
		{
			cardRef.current.style.position = '';
			cardRef.current.style.top = '';
			cardRef.current.style.left = '';
			cardRef.current.style.width = '';
			cardRef.current.style.height = '';
			cardRef.current.classList.remove('animate-album-slide');

			// Clear the timeout if the card is closed before the content is visible
			if (visibleTimeoutRef.current) clearTimeout(visibleTimeoutRef.current);
			
		}
	}, [selected, cardRef]);

	return (
		<div>
			<div
				ref={cardRef}
				className={'flex items-center justify-center w-full max-w-full aspect-square cursor-pointer' + (selected ? ' z-20' : ' z-0')}
				onClick={() => {
					setSelected(true);
					visibleTimeoutRef.current = setTimeout(() => {
						setContentVisible(true);
					}, 2500);
				}}
			>
				<img className='object-contain items-center justify-center' alt='Preview Image' src={review.imageLink!} />
			</div>
			{selected && (
				<div
					className='bg-black bg-opacity-50 fixed top-0 left-0 min-w-full min-h-full text-white z-10'
					onClick={() => {
						setSelected(false);
						setContentVisible(false);
						if (visibleTimeoutRef.current) 
							clearTimeout(visibleTimeoutRef.current);
					}}
				></div>
			)}
			{contentVisible && (
				<div className='fixed top-[calc(20%+126px)] left-[calc(5vw+348px)] w-[40dvw] z-20 h-[372px] bg-neutral-900 bg-opacity-80 p-4 animate-slideOpen overflow-hidden'>
					<div className='flex flex-col gap-2 h-full min-w-[40dvw]'>
						<div className='flex flex-col gap-2 h-full'>
							<p className='text-4xl line-clamp-2' title={review.title}>
								{review.title}
							</p>
							<ArtistAvatar artist={review.artist} />
							<div className='flex flex-row items-center justify-start gap-x-2'>
								<p>Reviewed on {format(review.createdAt, 'MMMM dd, yyyy')}</p>
								<p className='p-1 bg-blue-400 rounded-md'>{type}</p>
							</div>
							<div className='flex flex-col items-start gap-2'>
								{badges.includes('favorite') && (
									<div className='p-2 flex flex-row items-center gap-2 rounded-md border-2 border-favorite bg-black/90'>
										<Favorite className='text-white text-[24px]' />
										{type === 'Album' ? (
											<p>
												This album has one of my <span className='text-favorite'>favorite songs</span> on it!
											</p>
										) : (
											<p>
												This is one of my <span className='text-favorite'>favorite songs</span>!
											</p>
										)}
									</div>
								)}
								{badges.includes('peak') && (
									<div className='p-2 flex flex-row items-center gap-2 rounded-md border-2 border-peak bg-black/90'>
										<Star className='text-white text-[24px]' />
										<p>
											This {type === 'Album' ? 'album' : 'song'} is <span className='text-peak'>peak</span>!
										</p>
									</div>
								)}
							</div>
						</div>

						<div className='flex flex-row gap-1 items-end text-lg '>
							This {type === 'Album' ? 'album' : 'song'} recieved a rating of
							<p className='text-2xl px-0.5' style={{ color: getRatingColor(review.rating) }}>
								{type === 'Album' ? review.rating.toFixed(2) : review.rating}
								<span className='text-white'>.</span>
							</p>
							<a href={`/music/${review.reviewFile}`} className='flex flex-row items-center gap-2 group'>
								<span className='group-hover:underline'>Read the full review</span> <OpenInNew className='text-[24px]' />
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShelfReviewCard;

/*

    return (
        <Link
        key={review.id}
        href={`/music/${review.reviewFile}`} 
        className="flex flex-col p-2 border rounded-md gap-y-2 items-start w-full">
            <div className="flex flex-col gap-y-2 w-full min-h-[167px] justify-between">
                <p className="text-4xl line-clamp-2" title={review.title}>{review.title}</p>
                <ArtistAvatar artist={review.artist} />
                <div className="flex flex-row items-center justify-between">
                    <p>Reviewed on {format(review.createdAt, 'MMMM dd, yyyy')}</p>
                    <p className="p-1 bg-blue-400 rounded-md">{type}</p>
                </div>
            </div>

            <div className='flex items-center justify-center w-full max-w-full aspect-square pt-4'>
                <img
                    className='object-contain items-center justify-center'
                    alt='Preview Image'
                    src={review.imageLink!}
                />         
            </div>
            <p 
            className="text-2xl w-full text-center"
            style={{color: getRatingColor(review.rating)}}>
                {review.rating.toFixed(2)}
            </p>
        </Link>
    )

    */
