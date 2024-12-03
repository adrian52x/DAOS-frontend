import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { instrumentsList, genresList } from '../../types/data';
import { useState } from 'react';
import { fetchUserData } from '../../auth/utils';
import { InputField } from '../../components/elements/InputField';

export const Route = createFileRoute('/profile/add-instrument')({
	component: RouteComponent,
});

const levelDescriptions: Record<number, string> = {
	1: 'Suitable for a musician who has been playing for less than 1 year and can read simple or simplified sheet music.',
	2: 'Suitable for a musician who has been playing for 1-2 years and can read simple or simplified sheet music.',
	3: 'Suitable for a musician who has been playing for 2-4 years and can read moderately complex sheet music.',
	4: 'Suitable for a musician who has been playing for 4-6 years and can read more complex sheet music.',
	5: 'Suitable for a musician who has been playing for 6-10 years and can read advanced sheet music.',
};

function RouteComponent() {
	const { user, setUser, loading, token } = useAuth();
	const [instrumentName, setInstrumentName] = useState('');
	const [level, setLevel] = useState(1); // Default to level 1
	const [genre, setGenre] = useState('');

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const newInstrument = {
			name: instrumentName,
			level,
			genre,
		};

		const updatedUser = {
			instruments: [...(user.instruments || []), newInstrument],
		};

		try {
			const response = await fetch('http://localhost:3000/api/users', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updatedUser),
				credentials: 'include',
			});
			const data = await response.json();
			if (response.ok) {
				alert('Instrument added successfully');
				if (token) {
					setUser(await fetchUserData(token));
				}
			} else {
				alert(`Error: ${data.message}`);
			}
		} catch (error) {
			console.error('Error adding instrument:', error);
			alert('Error adding instrument');
		}
	};

	return (
		<div className="max-w-xl mx-auto mt-8 p-6 bg-gray-200 rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-6 text-center text-blue-800">Add Instrument</h1>
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Dropdown for Instrument Name */}
				<InputField
					label="Instrument Name"
					placeholder="Select an instrument"
					value={instrumentName}
					onChange={(e) => setInstrumentName(e.target.value)}
					name="instrumentName"
					options={instrumentsList} // Dropdown options
					required
				/>

				{/* Level Selector */}
				<div>
					<label className="block text-sm font-medium text-blue-800 mb-2">Skill Level</label>
					<div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
						<div className="flex justify-between items-center mb-2">
							<h3 className="text-lg font-bold text-blue-800">Level {level}</h3>
							<div className="flex space-x-2">
								<button
									type="button"
									onClick={() => setLevel((prev) => Math.max(1, prev - 1))}
									className="px-2 py-1 bg-gray-200 text-gray-700 border border-gray-300 rounded hover:bg-gray-300"
								>
									-
								</button>
								<button
									type="button"
									onClick={() => setLevel((prev) => Math.min(5, prev + 1))}
									className="px-2 py-1 bg-gray-200 text-gray-700 border border-gray-300 rounded hover:bg-gray-300"
								>
									+
								</button>
							</div>
						</div>
						<p className="text-sm text-gray-500">{levelDescriptions[level]}</p>
					</div>
				</div>

				{/* Dropdown for Genre */}
				<InputField
					label="Genre"
					placeholder="Select a genre"
					value={genre}
					onChange={(e) => setGenre(e.target.value)}
					name="genre"
					options={genresList} // Dropdown options
					required
				/>

				{/* Submit Button */}
				<button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
					Add Instrument
				</button>
			</form>
		</div>
	);
}

export default RouteComponent;
