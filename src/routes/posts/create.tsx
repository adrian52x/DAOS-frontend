import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { useState } from 'react';
import { instrumentsList, genresList } from '../../types/data';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/posts/create')({
	component: RouteComponent,
});

function RouteComponent() {
	const { user, loading, token } = useAuth();
	const [postType, setPostType] = useState<string | null>(null);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [instrumentName, setInstrumentName] = useState('');
	const [instrumentLevel, setInstrumentLevel] = useState(0);
	const [instrumentGenre, setInstrumentGenre] = useState('');
	const [ensembleId, setEnsembleId] = useState('');

	// Reset form fields when post type changes
	const handlePostTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPostType(e.target.value);
		setTitle('');
		setDescription('');
		setInstrumentName('');
		setInstrumentLevel(0);
		setInstrumentGenre('');
		setEnsembleId('');
	};

	// Query to get ensembles that the user owns
	const ensemblesUserOwn = useQuery({
		queryKey: ['ensembles', user?._id], // Include userId in the query key
		queryFn: async () => {
			const response = await fetch(`http://localhost:3000/api/ensembles/own`, {
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			console.log('ensemblesUserOwn', data);

			return data;
		},
		enabled: !!user, // Only run the query if user is available
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const post = {
			title,
			description,
			instrument: {
				name: instrumentName,
				level: instrumentLevel,
				genre: instrumentGenre,
			},
			ensemble: postType === 'looking' ? ensembleId : undefined,
		};

		try {
			const response = await fetch('http://localhost:3000/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(post),
				credentials: 'include',
			});
			const data = await response.json();
			if (response.ok) {
				alert('Post created successfully');
				console.log('Post created:', data);
			} else {
				alert(`Error: ${data.message}`);
			}
		} catch (error) {
			console.error('Error creating post:', error);
			alert('Error creating post');
		}
	};

	return (
		<div>
			<h1>Create Post</h1> <br />
			<div>
				<label>
					Choose Post Type:
					<select value={postType || ''} onChange={handlePostTypeChange}>
						<option value="" disabled>
							Select post type
						</option>
						<option value="play">I play on…</option>
						<option value="looking" disabled={!ensemblesUserOwn.data || ensemblesUserOwn.data.length === 0}>
							I am looking for someone who plays on…
						</option>
					</select>
				</label>
			</div>{' '}
			<br />
			{postType && (
				<form onSubmit={handleSubmit}>
					<div>
						<label>
							Title:
							<input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
						</label>
					</div>
					<div>
						<label>
							Description:
							<input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
						</label>
					</div>
					<div>
						<label>
							Instrument:
							<select name="instrument" value={instrumentName} onChange={(e) => setInstrumentName(e.target.value)} required>
								<option value="" disabled>
									Select an instrument
								</option>
								{instrumentsList.map((instrument) => (
									<option key={instrument} value={instrument}>
										{instrument}
									</option>
								))}
							</select>
						</label>
					</div>
					<div>
						<label>
							Level:
							<input type="number" name="level" value={instrumentLevel} min="1" max="5" onChange={(e) => setInstrumentLevel(Number(e.target.value))} required />
						</label>
					</div>
					<div>
						<label>
							Genre:
							<select name="genre" value={instrumentGenre} onChange={(e) => setInstrumentGenre(e.target.value)} required>
								<option value="" disabled>
									Select a genre
								</option>
								{genresList.map((genre) => (
									<option key={genre} value={genre}>
										{genre}
									</option>
								))}
							</select>{' '}
						</label>
					</div>
					{postType === 'looking' && (
						<div>
							<label>
								Ensemble:
								<select name="ensemble" value={ensembleId} onChange={(e) => setEnsembleId(e.target.value)} required>
									<option value="" disabled>
										Select an ensemble
									</option>
									{ensemblesUserOwn.data?.map((ensemble: any) => (
										<option key={ensemble._id} value={ensemble._id}>
											{ensemble.name}
										</option>
									))}
								</select>
							</label>
						</div>
					)}
					<br />
					<button type="submit">Submit</button>
				</form>
			)}
		</div>
	);
}
