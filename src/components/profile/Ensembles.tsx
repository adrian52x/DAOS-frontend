import { Ensemble } from '../../types/types';

export function Ensembles({ ensembles }: { ensembles: Ensemble[] }) {
	if (!ensembles || ensembles.length === 0) {
		return (
			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-bold mb-4">My Ensembles</h2>
				<p>No ensembles available.</p>
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
