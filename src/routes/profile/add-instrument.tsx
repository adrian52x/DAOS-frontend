import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { instrumentsList, genresList } from '../../types/data';
import { useState } from 'react';
import { updateUser } from '../../utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserDataUpdate } from '../../types/types';

export const Route = createFileRoute('/profile/add-instrument')({
	component: RouteComponent,
});

function RouteComponent() {
	const { user, loading, token } = useAuth();
	const [instrumentName, setInstrumentName] = useState('');
	const [level, setLevel] = useState(0);
	const [genre, setGenre] = useState('');

	const queryClient = useQueryClient();
	const navigate = Route.useNavigate();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	const updateUserData = useMutation({
		mutationFn: (data: UserDataUpdate) => updateUser(token, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['current-user'] });
			navigate({ to: '/profile' });
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const newInstrument = {
			name: instrumentName,
			level,
			genre,
		};

		const userData = {
			instruments: [...(user.instruments || []), newInstrument],
		};

		// Update user data
		updateUserData.mutateAsync(userData);
	};

	return (
		<div>
			<h1>Add Instrument</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Instrument Name:
						<select value={instrumentName} onChange={(e) => setInstrumentName(e.target.value)} required>
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
						<input type="number" min={1} max={5} value={level} onChange={(e) => setLevel(Number(e.target.value))} required />
					</label>
				</div>
				<div>
					<label>
						Genre:
						<select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required>
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
				<button type="submit">Add Instrument</button>
			</form>
		</div>
	);
}

export default RouteComponent;
