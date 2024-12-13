import { Link } from '@tanstack/react-router';
import { Button } from '../elements/Button';
import { updateOrDeleteInstrument } from '../../utils/api';
import { useAuth } from '../../auth/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { Instrument } from '../../types/types';

export function Instruments({ instruments }: { instruments: Instrument[] }) {
	const { token } = useAuth();
	const queryClient = useQueryClient();

	const handleDelete = async (instrument: Instrument) => {
		if (confirm(`Are you sure you want to delete \"${instrument.name}\"?`)) {
			try {
				await updateOrDeleteInstrument(token, 'delete', instrument);
				alert(`Instrument \"${instrument.name}\" deleted successfully.`);
				queryClient.invalidateQueries({ queryKey: ['current-user'] });
			} catch (error: any) {
				alert(`Error: ${error.response?.data?.message || error.message}`);
			}
		}
	};

	return (
		<div className="bg-white shadow rounded-lg p-4">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-bold text-blue-800">My Instruments</h2>
				<Link to="/profile/add-instrument">
					<Button variant="secondary">Add Instrument</Button>
				</Link>
			</div>
			{!instruments || instruments.length === 0 ? (
				<p>You haven't added any instruments yet.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{instruments.map((instrument) => (
						<div key={instrument.name} className="bg-white rounded-lg p-3 shadow relative flex flex-col">
							<button onClick={() => handleDelete(instrument)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none">
								&times;
							</button>
							<div className="flex justify-between items-center mb-2">
								<h3 className="text-md font-bold text-blue-900 truncate">{instrument.name}</h3>
								<span className="bg-blue-100 text-blue-800 font-bold rounded-full px-3 py-1 text-xs mr-6">{instrument.level}</span>
							</div>
							<div className="mt-1 flex flex-wrap gap-2">
								{instrument.genre.split(', ').map((tag) => (
									<span key={tag} className="bg-gray-200 text-gray-800 font-medium px-3 py-1 rounded-full text-xs">
										{tag}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
