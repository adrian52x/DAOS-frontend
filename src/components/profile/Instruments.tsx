import { Link } from '@tanstack/react-router';
import { Button } from '../elements/Button';

type Instrument = {
	name: string;
	level: number;
	genre: string;
};

export function Instruments({ instruments }: { instruments: Instrument[] }) {
	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex flex-row justify-between items-center mb-4">
				<h2 className="font-header text-2xl text-blue-800 font-bold ">My Instruments</h2>
				<Link to="/ensembles/create">
					<Button variant="secondary">Add an instrument</Button>
				</Link>
			</div>
			{!instruments || instruments.length === 0 ? (
				<div className="text-center">
					<p className="mb-4">You haven't added any instruments yet.</p>
					<Link to="/profile/add-instrument">
						<Button variant="primary">Add an instrument</Button>
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{instruments.map((instrument, index) => (
						<div key={index} className="bg-gray-100 rounded-lg p-4">
							<div className="flex justify-between items-center mb-2">
								<h3 className="font-bold">{instrument.name}</h3>
								<span className="text-gray-600">Level: {instrument.level}</span>
							</div>
							<p>Genre: {instrument.genre}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
