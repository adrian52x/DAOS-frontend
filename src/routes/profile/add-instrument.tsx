import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { instrumentsList, genresList } from '../../types/data';
import { useState } from 'react';
import { updateUser } from '../../utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserDataUpdate } from '../../types/types';
import { Button } from '../../components/elements/Button';
import { SmallButton } from '../../components/elements/SmallButton';
import { levels } from '../../types/data';
import { Dropdown } from '../../components/Dropdown';

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
		onError: (error) => {
			alert(error.message);
		},
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	const handleAddGenre = (genre: string) => {
		if (genre && !selectedGenres.includes(genre)) {
			setSelectedGenres((prev) => [...prev, genre]);
		}
	};

	const handleRemoveGenre = (genre: string) => {
		setSelectedGenres((prev) => prev.filter((g) => g !== genre));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!instrumentName || selectedGenres.length === 0) return;

		const newInstrument = { name: instrumentName, level, genre: selectedGenres };
		updateUserData.mutateAsync({
			instruments: [...(user.instruments || []), newInstrument],
		});
	};

	const isAddInstrumentBtnDisabled = !instrumentName || selectedGenres.length === 0;
	return (
		<div className="p-6">
			<div className="mb-4">
				<SmallButton></SmallButton>
			</div>
			<div className="bg-white shadow rounded-lg max-w-md mx-auto p-6">
				<h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Add Instrument</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Dropdown
							label="Instrument Name"
							value={instrumentName}
							onChange={(value) => setInstrumentName(value)}
							placeholder="Select an instrument"
							options={instrumentsList}
						/>
					</div>
					<div className="space-y-2">
						<label className="block font-body text-gray-800 mb-1">Skill Level</label>
						<div className="w-full border rounded-lg px-4 py-3 bg-white shadow-sm">
							<div className="flex justify-between items-center">
								<div className="flex-1">
									<p className="text-sm font-semibold text-gray-800">Level {level}</p>
									<p className="text-sm font-body text-gray-800">{levels.find((lvl) => lvl.value === level)?.description}</p>
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
					<div className="space-y-2">
						<Dropdown label="Genre" placeholder="Select a genre" value="" onChange={handleAddGenre} options={genresList} />
					</div>
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
						<Button type="submit" variant="primary" disabled={isAddInstrumentBtnDisabled}>
							Add Instrument
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default RouteComponent;
