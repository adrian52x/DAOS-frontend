import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { useState } from 'react';
import { instrumentsList, genresList } from '../../types/data';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createNewPost, fetchAllEnsemblesUserOwns } from '../../utils/api';

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
	const [instrumentGenres, setInstrumentGenres] = useState<string[]>([]); // Updated to handle multiple genres
	const [ensembleId, setEnsembleId] = useState('');

	const navigate = Route.useNavigate();

	// Reset form fields when post type changes
	const handlePostTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPostType(e.target.value);
		setTitle('');
		setDescription('');
		setInstrumentName('');
		setInstrumentLevel(0);
		setInstrumentGenres([]);
		setEnsembleId('');
	};

	// Query to get ensembles that the user owns
	const ensemblesUserOwn = useQuery({
		queryKey: ['user-ensembles-own', user?._id],
		queryFn: () => fetchAllEnsemblesUserOwns(token),
		enabled: !!user, // Only run the query if user is available
	});

	const createPost = useMutation({
		mutationFn: (post: any) => createNewPost(token, post),
		onSuccess: () => {
			navigate({ to: '/posts' });
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		let post;

		if (postType === 'play') {
			const selectedInstrumentFromUser = user.instruments.find((inst: any) => inst.name === instrumentName);
			post = {
				title,
				description,
				instrument: selectedInstrumentFromUser,
			};
		} else if (postType === 'looking') {
			post = {
				title,
				description,
				instrument: {
					name: instrumentName,
					level: instrumentLevel,
					genre: instrumentGenres, // Updated to handle multiple genres
				},
				ensemble: ensembleId,
			};
		}

		// Create post
		createPost.mutateAsync(post);
	};

	const addGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const genre = e.target.value;
		if (!instrumentGenres.includes(genre)) {
			setInstrumentGenres([...instrumentGenres, genre]);
		}
	};

	const removeGenre = (genreToRemove: string) => {
		setInstrumentGenres(instrumentGenres.filter((genre) => genre !== genreToRemove));
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

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
					{postType === 'play' && (
						<div>
							<label>
								Instrument:
								<select value={instrumentName} onChange={(e) => setInstrumentName(e.target.value)} required>
									<option value="" disabled>
										Select an instrument
									</option>
									{user.instruments.map((instrument: any, index: number) => (
										<option key={index} value={instrument.name}>
											{instrument.name} - Level {instrument.level} - {instrument.genre.join(', ')}
										</option>
									))}
								</select>
							</label>
						</div>
					)}

					{postType === 'looking' && (
						<>
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
									<input
										type="number"
										name="level"
										value={instrumentLevel}
										min="1"
										max="5"
										onChange={(e) => setInstrumentLevel(Number(e.target.value))}
										required
									/>
								</label>
							</div>
							<div>
								<label>
									Genres:
									<select name="genre" value="" onChange={addGenre}>
										<option value="" disabled>
											Select a genre
										</option>
										{genresList.map((genre) => (
											<option key={genre} value={genre}>
												{genre}
											</option>
										))}
									</select>
								</label>
								<div className="flex flex-wrap gap-2 mt-2">
									{instrumentGenres.map((genre, index) => (
										<span
											key={index}
											className="bg-gray-400 text-blue-800 text-sm font-bold px-3 py-1 rounded-md shadow-sm cursor-pointer"
											onClick={() => removeGenre(genre)}
										>
											{genre} ×
										</span>
									))}
								</div>
							</div>
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
						</>
					)}
					<br />
					<button type="submit">Submit</button>
				</form>
			)}
		</div>
	);
}
