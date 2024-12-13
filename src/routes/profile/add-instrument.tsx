import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { instrumentsList, genresList } from '../../types/data';
import { useState } from 'react';
import { updateUser } from '../../utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserDataUpdate } from '../../types/types';
import { InputField } from '../../components/elements/InputField';
import { Button } from '../../components/elements/Button';
import { SmallButton } from '../../components/elements/SmallButton';

export const Route = createFileRoute('/profile/add-instrument')({
	component: RouteComponent,
});

function RouteComponent() {
	const { user, loading, token } = useAuth();
	const [instrumentName, setInstrumentName] = useState('');
	const [level, setLevel] = useState(1); // Default level set to 1
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const queryClient = useQueryClient();
	const navigate = Route.useNavigate();

	const updateUserData = useMutation({
		mutationFn: (data: UserDataUpdate) => updateUser(token, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['current-user'] });
			navigate({ to: '/profile' });
		},
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	const levels = [
		{
			value: 1,
			description: 'Suitable for a musician with less than 1 year of experience, able to play simple or simplified scores.',
		},
		{
			value: 2,
			description: 'Suitable for a musician with 1-2 years of experience, able to play simple or simplified scores.',
		},
		{
			value: 3,
			description: 'Suitable for a musician with 2-4 years of experience, able to play moderately complex scores.',
		},
		{
			value: 4,
			description: 'Suitable for a musician with 4-6 years of experience, able to play moderately complex scores.',
		},
		{
			value: 5,
			description: 'Suitable for a musician with 6-10 years of experience, able to play complex scores.',
		},
	];

	const handleAddGenre = (genre: string) => {
		if (!selectedGenres.includes(genre)) {
			setSelectedGenres([...selectedGenres, genre]);
		}
	};

	const handleRemoveGenre = (genre: string) => {
		setSelectedGenres(selectedGenres.filter((g) => g !== genre));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newInstrument = { name: instrumentName, level, genre: selectedGenres };
		updateUserData.mutateAsync({
			instruments: [...(user.instruments || []), newInstrument],
		});
	};

	return (
		<div className="p-6">
			<div className="mb-4">
				<SmallButton onClick={() => navigate({ to: '/profile' })}>Go Back</SmallButton>
			</div>
			<div className="bg-white shadow rounded-lg max-w-md mx-auto p-6">
				<h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Add Instrument</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					<InputField
						label="Instrument Name"
						placeholder="Select an instrument"
						value={instrumentName}
						onChange={(e) => setInstrumentName(e.target.value)}
						name="instrumentName"
						required
						options={instrumentsList}
					/>
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-800">Skill Level</label>
						<div className="w-full border rounded-lg px-4 py-3 bg-white shadow-sm">
							<div className="flex justify-between items-center">
								<div className="flex-1">
									<p className="text-sm font-semibold text-gray-800">Level {level}</p>
									<p className="text-sm text-gray-700">{levels.find((lvl) => lvl.value === level)?.description}</p>
								</div>
								<div className="flex items-center space-x-2">
									<button
										type="button"
										onClick={() => setLevel(Math.max(1, level - 1))}
										disabled={level === 1}
										className="bg-gray-200 text-gray-800 font-medium py-1 px-3 rounded hover:bg-gray-300 disabled:opacity-50"
									>
										-
									</button>
									<button
										type="button"
										onClick={() => setLevel(Math.min(5, level + 1))}
										disabled={level === 5}
										className="bg-gray-200 text-gray-800 font-medium py-1 px-3 rounded hover:bg-gray-300 disabled:opacity-50"
									>
										+
									</button>
								</div>
							</div>
						</div>
					</div>
					<InputField label="Genre" placeholder="Select a genre" value="" onChange={(e) => handleAddGenre(e.target.value)} name="genre" required options={genresList} />
					<div className="mt-4">
						<div className="mt-2 flex flex-wrap gap-2">
							{selectedGenres.map((genre, index) => (
								<span key={index} className="bg-blue-800 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
									{genre}
									<button onClick={() => handleRemoveGenre(genre)} className="text-white ml-2">
										&times;
									</button>
								</span>
							))}
						</div>
					</div>
					<div className="text-center">
						<Button type="submit" variant="primary">
							Add Instrument
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default RouteComponent;
