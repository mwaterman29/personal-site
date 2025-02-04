'use client';

import markdownToComponent from '@/util/ConvertMarkdown';
import { extractEssayDetails } from '@/util/extractEssayDetails';
import { useEffect, useState } from 'react';

export default function EssayPage()
{
	const [essayText, setEssayText] = useState('');
	const [imageLink, setImageLink] = useState('');
	const [fileLink, setFileLink] = useState<string>('');
	const [pinned, setPinned] = useState(false);
	const [extractionResult, setExtractionResult] = useState<{ title: string; description: string } | null>(null);
	const [mdStaging, setMdStaging] = useState<any>(<></>);

	const handleSubmit = async () =>
	{
		const result = extractEssayDetails(essayText);
		setExtractionResult(result);

		const md = await markdownToComponent(essayText ?? '');
		setMdStaging(md);
	};

	const handleConfirm = async () =>
	{
		const response = await fetch('/api/essay', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...extractionResult,
				imageLink,
				fileLink,
				pinned
			})
		});

		if (response.ok)
		{
			alert('Essay submitted successfully');
			setEssayText('');
			setImageLink('');
			setFileLink('');
			setPinned(false);
			setExtractionResult(null);
		}
		else
		{
			alert('Error submitting essay');
		}
	};

	useEffect(() =>
	{
		if (!extractionResult) return;

		const fnameString = `${extractionResult.title}.md`;
		const urlEncoded = encodeURIComponent(fnameString);

		setFileLink(urlEncoded);
	}, [extractionResult]);

	return (
		<div className='flex items-center justify-center'>
			<div className='flex flex-col w-full p-4 max-w-[175ch]'>
				<p>Essay Content in formatted md</p>
				<textarea
					className='w-full p-2 border border-gray-300 rounded mb-4 text-black'
					value={essayText}
					onChange={e => setEssayText(e.target.value)}
					placeholder='Enter your essay text here'
					rows={10}
				/>

				<p>File Link</p>
				<input
					className='w-full p-2 border border-gray-300 rounded mb-4 text-black'
					value={fileLink}
					onChange={e => setFileLink(e.target.value)}
					placeholder='File link'
				/>

				<p>Image link</p>
				<input
					className='w-full p-2 border border-gray-300 rounded mb-4 text-black'
					type='text'
					value={imageLink}
					onChange={e => setImageLink(e.target.value)}
					placeholder='Optional image link'
				/>

				<label className='flex items-center mb-4'>
					<input type='checkbox' checked={pinned} onChange={e => setPinned(e.target.checked)} className='mr-2' />
					Pinned
				</label>

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

				<p>Staging:</p>

				<div className='flex flex-col items-center justify-center'>
					<div className='max-w-[1000px]'>
						{mdStaging}
					</div>
				</div>
			</div>
		</div>
	);
}
