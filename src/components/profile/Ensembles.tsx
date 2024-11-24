import { Link } from '@tanstack/react-router';
import { Ensemble } from '../../types/types';
import { Button } from '../Button';

export function Ensembles({ ensembles }: { ensembles: Ensemble[] }) {
	if (!ensembles || ensembles.length === 0) {
		return (
			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-bold mb-4">My Ensembles</h2>
				<div className="text-center">
					<p className="mb-4">You don't have any Ensembles yet.</p>
					<Link to="/ensembles/create">
						<Button variant="primary">Create an Ensemble</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-xl font-bold mb-4">My Ensembles</h2>
			<ul>
				{ensembles.map((ensemble) => (
					<li key={ensemble._id}>
						{ensemble.name} | {ensemble.activeMembers} | {ensemble.address} | {ensemble.zipCode}{' '}
					</li>
				))}
			</ul>
		</div>
	);
}
