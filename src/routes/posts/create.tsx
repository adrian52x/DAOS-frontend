import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { useState } from 'react';
import { instrumentsList, genresList } from '../../types/data';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createNewPost, fetchAllEnsemblesUserOwns } from '../../utils/api';
import { InputField } from '../../components/elements/InputField';
import { Button } from '../../components/elements/Button';
import { SmallButton } from '../../components/elements/SmallButton';
import { levels } from '../../types/data';
import { Dropdown } from '../../components/Dropdown';

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
	const handlePostTypeChange = (value: string) => {
		setPostType(value);
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

		if (postType === 'I am playing an instrument') {
			const selectedInstrumentFromUser = user.instruments.find((inst: any) => inst.name === instrumentName);
			post = {
				title,
				description,
				instrument: selectedInstrumentFromUser,
			};
			console.log(post);
		} else if (postType === 'I am looking for a musician for my band') {
			post = {
				title,
				description,
				instrument: {
					name: instrumentName,
					level: instrumentLevel,
					genre: instrumentGenres,
				},
				ensemble: ensembleId,
			};
		}

		// Create post
		createPost.mutateAsync(post);
	};

	const addGenre = (value: string) => {
		const genre = value;
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
		<div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] sm:bg-gray-200 py-6 md:px-6 px-4">
			<div className="col-start-2 col-end-3 p-6 px-10 border border-gray-200 shadow-lg bg-white">
				<SmallButton></SmallButton>
				<div className="max-w-3xl mx-auto p-10 min-h-[600px]">
					<h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">Create post</h1>
					<form onSubmit={handleSubmit} className="space-y-8">
						<Dropdown
							label="Choose Post Type"
							value={postType || ''}
							onChange={handlePostTypeChange}
							placeholder="Select post type"
							options={['I am playing an instrument', 'I am looking for a musician for my band']}
						/>

						{postType && (
							<>
								<InputField label="Title" name="title" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required />
								<InputField
									label="Description"
									name="description"
									placeholder="Enter description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									required
								/>

								{postType === 'I am playing an instrument' && (
									<Dropdown
										label="Instrument"
										value={instrumentName}
										onChange={(value) => setInstrumentName(value)}
										placeholder="Select an instrument"
										options={user.instruments.map((inst: any) => inst.name)}
									/>
								)}

								{postType === 'I am looking for a musician for my band' && (
									<>
										<Dropdown
											label="Instrument"
											value={instrumentName}
											onChange={(value) => setInstrumentName(value)}
											placeholder="Select an instrument"
											options={instrumentsList}
										/>
										<div className="space-y-4">
											<Dropdown
												label="Level"
												value={instrumentLevel.toString()}
												onChange={(value) => setInstrumentLevel(Number(value))}
												placeholder="Select level"
												options={levels.map((level) => level.value.toString())}
											/>
										</div>
										<Dropdown label="Genres" placeholder="Select a genre" value="" onChange={addGenre} options={genresList} />
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

										<Dropdown
											label="Ensemble"
											value={ensembleId}
											onChange={(value) => setEnsembleId(value)}
											placeholder="Select an ensemble"
											options={ensemblesUserOwn.data?.map((ensemble: any) => ensemble.name) || []}
										/>
									</>
								)}
							</>
						)}

						<div className="flex justify-center">
							<Button type="submit" variant="primary">
								Create Post
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
