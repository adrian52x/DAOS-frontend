import { Link } from '@tanstack/react-router';
import { Button } from '../elements/Button';
import { SmallButton } from '../elements/SmallButton';
import { updateOrDeleteInstrument } from '../../utils/api';
import { useAuth } from '../../auth/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

type Instrument = {
	name: string;
	level: number;
	genre: string;
};

export function Instruments({ instruments }: { instruments: Instrument[] }) {
	const { token } = useAuth();
	const queryClient = useQueryClient();
	const [editingInstrument, setEditingInstrument] = useState<Instrument | null>(null);
	const [level, setLevel] = useState(1);
	const [genre, setGenre] = useState('');

	const handleDelete = async (instrument: Instrument) => {
		if (confirm(`Are you sure you want to delete "${instrument.name}"?`)) {
			try {
				await updateOrDeleteInstrument(token, 'delete', instrument);
				alert(`Instrument "${instrument.name}" deleted successfully.`);
				queryClient.invalidateQueries({ queryKey: ['current-user'] });
			} catch (error: any) {
				alert(`Error: ${error.response?.data?.message || error.message}`);
			}
		}
	};

	const handleEdit = (instrument: Instrument) => {
		setEditingInstrument(instrument);
		setLevel(instrument.level);
		setGenre(instrument.genre);
	};

	const handleUpdate = async () => {
		if (!editingInstrument) return;

		const updatedInstrument = { ...editingInstrument, level, genre };

		try {
			await updateOrDeleteInstrument(token, 'update', updatedInstrument);
			alert(`Instrument "${editingInstrument.name}" updated successfully.`);
			queryClient.invalidateQueries({ queryKey: ['current-user'] });
			setEditingInstrument(null);
		} catch (error: any) {
			alert(`Error: ${error.response?.data?.message || error.message}`);
		}
	};

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold text-blue-800">My Instruments</h2>
				<Link to="/profile/add-instrument">
					<Button variant="secondary">Add Instrument</Button>
				</Link>
			</div>
			{!instruments || instruments.length === 0 ? (
				<p>You haven't added any instruments yet.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{instruments.map((instrument) => (
						<div key={instrument.name} className="bg-gray-100 rounded-lg p-4">
							{editingInstrument?.name === instrument.name ? (
								<div>
									<label>
										Level:
										<input type="number" value={level} min="1" max="5" onChange={(e) => setLevel(Number(e.target.value))} />
									</label>
									<label>
										Genre:
										<input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
									</label>
									<div>
										<Button onClick={handleUpdate}>Save</Button>
										<Button onClick={() => setEditingInstrument(null)}>Cancel</Button>
									</div>
								</div>
							) : (
								<>
									<h3>{instrument.name}</h3>
									<p>Level: {instrument.level}</p>
									<p>Genre: {instrument.genre}</p>
									<SmallButton onClick={() => handleEdit(instrument)}>Edit</SmallButton>
									<SmallButton onClick={() => handleDelete(instrument)}>Delete</SmallButton>
								</>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
