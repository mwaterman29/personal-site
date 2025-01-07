'use client';

import { useEffect, useState } from 'react';
import { ReviewExtractionResult, extractReviewDetails } from '@/util/extractReviewDetails';

export default function ReviewPage()
{
	const [reviewText, setReviewText] = useState('');
	const [link, setLink] = useState('');
	const [imageLink, setImageLink] = useState('');
	const [artistImageLink, setArtistImageLink] = useState('');
	const [reviewFile, setReviewFile] = useState<string>('');
	const [extractionResult, setExtractionResult] = useState<ReviewExtractionResult | null>(null);

	const handleSubmit = async () =>
	{
		const result = extractReviewDetails(reviewText);
		setExtractionResult(result);
	};

	const handleConfirm = async () =>
	{
		const response = await fetch('/api/review', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...extractionResult,
				link,
				imageLink,
				artistImageLink,
				reviewFile
			})
		});

		if (response.ok)
		{
			alert('Review submitted successfully');
			setReviewText('');
			setLink('');
			setExtractionResult(null);
		}
		else
		{
			alert('Error submitting review');
		}
	};

	useEffect(() =>
	{
		if (!extractionResult) return;

		const fnameString = `${extractionResult.artistName} - ${extractionResult.title}.md`;
		const urlEncoded = encodeURIComponent(fnameString);

		setReviewFile(urlEncoded);
	}, [extractionResult]);

	return (
		<div className='flex items-center justify-center'>
			<div className='flex flex-col w-full p-4 max-w-[175ch]'>
				<p>Review Content in formatted md</p>
				<textarea
					className='w-full p-2 border border-gray-300 rounded mb-4 text-black'
					value={reviewText}
					onChange={e => setReviewText(e.target.value)}
					placeholder='Enter your review text here'
					rows={10}
				/>

				<p>Review File</p>
				<input
					className='w-full p-2 border border-gray-300 rounded mb-4 text-black'
					value={reviewFile}
					onChange={e => setReviewFile(e.target.value)}
					placeholder='Review filename'
				/>

				<p>Spotify Link</p>
				<input
					className='w-full p-2 border border-gray-300 rounded mb-4 text-black'
					type='text'
					value={link}
					onChange={e => setLink(e.target.value)}
					placeholder='Optional link'
				/>

				<p>Overload Image link</p>
				<input
					className='w-full p-2 border border-gray-300 rounded mb-4 text-black'
					type='text'
					value={imageLink}
					onChange={e => setImageLink(e.target.value)}
					placeholder='Optional image link'
				/>

				<p>Overload Artist image link</p>
				<input
					className='w-full p-2 border border-gray-300 rounded mb-4 text-black'
					type='text'
					value={artistImageLink}
					onChange={e => setArtistImageLink(e.target.value)}
					placeholder='Optional artist image link'
				/>

				<button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={handleSubmit}>
					Submit
				</button>
				{extractionResult && (
					<div className='mt-4'>
						<h2>Extraction Result</h2>
						<pre>{JSON.stringify(extractionResult, null, 2)}</pre>
						<button className='bg-green-500 text-white px-4 py-2 rounded mt-4' onClick={handleConfirm}>
							Confirm
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
