'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AlbumType = {
	id: number;
	title: string;
	rating: number;
	songs: SongType[];
};

type SongType = {
	id: number;
	title: string;
	rating: number;
};

type SingleType = {
	id: number;
	title: string;
	rating: number;
};

export default function RevisePage()
{
	const [isLocal, setIsLocal] = useState(false);
	const [type, setType] = useState<'album' | 'single'>('album');
	const [albums, setAlbums] = useState<AlbumType[]>([]);
	const [singles, setSingles] = useState<SingleType[]>([]);
	const [selectedId, setSelectedId] = useState<string>('');
	const [selectedItem, setSelectedItem] = useState<AlbumType | SingleType | null>(null);
	const [albumRating, setAlbumRating] = useState<number>(0);
	const [songRatings, setSongRatings] = useState<{ id: number; rating: number; title: string }[]>([]);
	const [singleRating, setSingleRating] = useState<number>(0);
	const [revisionNotes, setRevisionNotes] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success' | 'info' | null, message: string }>({ type: null, message: '' });

	useEffect(() =>
	{
		// Check if the application is running locally
		if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
		{
			setIsLocal(true);
			fetchData();
		}
	}, []);

	const fetchData = async () =>
	{
		setLoading(true);
		try
		{
			// Fetch albums with their songs
			const albumsResponse = await fetch('/api/revise/albums');
			const albumsData = await albumsResponse.json();
			setAlbums(albumsData);

			// Fetch singles
			const singlesResponse = await fetch('/api/revise/singles');
			const singlesData = await singlesResponse.json();
			setSingles(singlesData);
		}
		catch (error)
		{
			console.error('Error fetching data:', error);
			setStatusMessage({ type: 'error', message: 'Failed to load data' });
		}
		finally
		{
			setLoading(false);
		}
	};

	const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
	{
		const id = e.target.value;
		setSelectedId(id);

		if (id)
		{
			if (type === 'album')
			{
				const album = albums.find(a => a.id.toString() === id);
				if (album)
				{
					setSelectedItem(album);
					setAlbumRating(album.rating);
					setSongRatings(
						album.songs.map(song => ({
							id: song.id,
							rating: song.rating,
							title: song.title
						}))
					);
				}
			}
			else
			{
				const single = singles.find(s => s.id.toString() === id);
				if (single)
				{
					setSelectedItem(single);
					setSingleRating(single.rating);
				}
			}
		}
		else
		{
			setSelectedItem(null);
			setAlbumRating(0);
			setSongRatings([]);
			setSingleRating(0);
		}

		setRevisionNotes('');
		setStatusMessage({ type: null, message: '' });
	};

	const handleSongRatingChange = (id: number, rating: number) =>
	{
		setSongRatings(prev => prev.map(song => (song.id === id ? { ...song, rating } : song)));
	};
	
	const calculateAverageRating = () => {
		if (songRatings.length === 0) return 0;
		
		const sum = songRatings.reduce((total, song) => total + song.rating, 0);
		const average = sum / songRatings.length;
		
		// Round to 1 decimal place
		const roundedAverage = Math.round(average * 10) / 10;
		setAlbumRating(roundedAverage);
		setStatusMessage({ type: 'info', message: 'Album rating recalculated from track averages' });
	};

	const handleSubmit = async (e: React.FormEvent) =>
	{
		e.preventDefault();

		if (!selectedId)
		{
			setStatusMessage({ type: 'error', message: 'Please select an item to revise' });
			return;
		}

		setSubmitting(true);
		setStatusMessage({ type: 'info', message: 'Submitting revision...' });

		try
		{
			const response = await fetch('/api/review/revise', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					type,
					id: selectedId,
					rating: type === 'album' ? albumRating : singleRating,
					songRatings: type === 'album' ? songRatings : undefined,
					revisionNotes
				})
			});

			if (!response.ok)
			{
				throw new Error('Failed to submit revision');
			}

			setStatusMessage({ type: 'success', message: 'Revision submitted successfully' });

			// Reset form
			setSelectedId('');
			setSelectedItem(null);
			setAlbumRating(0);
			setSongRatings([]);
			setSingleRating(0);
			setRevisionNotes('');
		}
		catch (error)
		{
			console.error('Error submitting revision:', error);
			setStatusMessage({ type: 'error', message: 'Failed to submit revision' });
		}
		finally
		{
			setSubmitting(false);
		}
	};

	if (!isLocal)
	{
		return (
			<div className='container mx-auto p-8'>
				<h1 className='text-3xl font-bold mb-6'>Revision Tool</h1>
				<div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6'>
					<p>This tool is only available in a local development environment.</p>
				</div>
			</div>
		);
	}

	return (
		<div className='container mx-auto p-8'>
			<h1 className='text-3xl font-bold mb-6'>Revision Tool</h1>
			
			{statusMessage.type && (
				<div className={`mb-6 p-4 border-l-4 rounded ${
					statusMessage.type === 'error' ? 'bg-red-100 border-red-500 text-red-700' :
					statusMessage.type === 'success' ? 'bg-green-100 border-green-500 text-green-700' :
					'bg-blue-100 border-blue-500 text-blue-700'
				}`}>
					<p>{statusMessage.message}</p>
				</div>
			)}

			<Tabs defaultValue='album' onValueChange={value => setType(value as 'album' | 'single')}>
				<TabsList className='mb-6'>
					<TabsTrigger value='album'>Albums</TabsTrigger>
					<TabsTrigger value='single'>Singles</TabsTrigger>
				</TabsList>

				<form onSubmit={handleSubmit}>
					<TabsContent value='album'>
						<div className='mb-6'>
							<label htmlFor='album' className='block text-sm font-medium mb-2'>
								Select Album
							</label>
							<select
								id='album'
								value={selectedId}
								onChange={handleItemSelect}
								className='w-full p-2 border border-gray-300 rounded-md text-black'
								disabled={loading}
							>
								<option value=''>Select an album...</option>
								{albums.map(album => (
									<option key={album.id} value={album.id.toString()} className='text-black'>
										{album.title} ({album.rating})
									</option>
								))}
							</select>
						</div>

						{selectedItem && (
							<>
								<div className='mb-6'>
									<label htmlFor='albumRating' className='block text-sm font-medium mb-2'>
										Album Rating
									</label>
									<div className='flex items-center gap-2'>
										<input
											id='albumRating'
											type='number'
											value={albumRating}
											onChange={e => setAlbumRating(parseFloat(e.target.value))}
											className='flex-1 p-2 border border-gray-300 rounded-md text-black'
										/>
										<button
											type='button'
											onClick={calculateAverageRating}
											className='bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300'
											title='Calculate average from tracks'
										>
											Recalculate
										</button>
									</div>
								</div>

								<div className='mb-6'>
									<h3 className='text-lg font-medium mb-4'>Song Ratings</h3>
									<div className='space-y-3'>
										{songRatings.map(song => (
											<div key={song.id} className='flex items-center'>
												<span className='flex-1'>{song.title}</span>
												<input
													type='number'
													step='5'
													min='-20'
													max='140'
													value={song.rating}
													onChange={e => handleSongRatingChange(song.id, parseFloat(e.target.value))}
													className='w-24 p-2 border border-gray-300 rounded-md ml-4 text-black'
												/>
											</div>
										))}
									</div>
								</div>
							</>
						)}
					</TabsContent>

					<TabsContent value='single'>
						<div className='mb-6'>
							<label htmlFor='single' className='block text-sm font-medium mb-2'>
								Select Single
							</label>
							<select
								id='single'
								value={selectedId}
								onChange={handleItemSelect}
								className='w-full p-2 border border-gray-300 rounded-md text-black'
								disabled={loading}
							>
								<option value=''>Select a single...</option>
								{singles.map(single => (
									<option key={single.id} value={single.id.toString()} className='text-black'>
										{single.title} ({single.rating})
									</option>
								))}
							</select>
						</div>

						{selectedItem && (
							<div className='mb-6'>
								<label htmlFor='singleRating' className='block text-sm font-medium mb-2'>
									Rating
								</label>
								<input
									id='singleRating'
									type='number'
									step='0.1'
									min='0'
									max='10'
									value={singleRating}
									onChange={e => setSingleRating(parseFloat(e.target.value))}
									className='w-full p-2 border border-gray-300 rounded-md text-black'
								/>
							</div>
						)}
					</TabsContent>

					{selectedItem && (
						<>
							<div className='mb-6'>
								<label htmlFor='revisionNotes' className='block text-sm font-medium mb-2'>
									Revision Notes
								</label>
								<textarea
									id='revisionNotes'
									value={revisionNotes}
									onChange={e => setRevisionNotes(e.target.value)}
									className='w-full p-2 border border-gray-300 rounded-md h-32 text-black'
									placeholder='Enter your revision notes here...'
								/>
							</div>

							<button
								type='submit'
								disabled={submitting}
								className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300'
							>
								{submitting ? 'Submitting...' : 'Submit Revision'}
							</button>
						</>
					)}
				</form>
			</Tabs>
		</div>
	);
}
