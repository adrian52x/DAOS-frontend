import { Link } from '@tanstack/react-router';
import { Ensemble } from '../../types/types';
import { EnsembleCard } from '../EnsembleCard';

export function Ensembles({ ensembles, user }: { ensembles: Ensemble[]; user: any }) {
	if (!ensembles || ensembles.length === 0) {
		return (
			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="font-header text-2xl text-blue-800 font-bold mb-4">{user.name}'s Ensembles</h2>
				<div className="text-center">
					<p className="mb-4">This user doesn't have any Ensembles yet.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="font-header text-2xl text-blue-800 font-bold mb-4">{user.name}'s Ensembles</h2>
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
				{ensembles.map((ensemble, index) => (
					<Link key={index} to={`/ensembles/${ensemble._id}`} className="block relative group">
						<li className="relative">
							<EnsembleCard key={ensemble._id} ensemble={ensemble} user={user} />
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
}
