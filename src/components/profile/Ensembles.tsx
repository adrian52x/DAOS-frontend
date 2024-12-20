import { Link } from '@tanstack/react-router';
import { Ensemble } from '../../types/types';
import { Button } from '../elements/Button';
import { EnsembleCard } from '../EnsembleCard';
import { useAuth } from '../../auth/AuthContext';

export function Ensembles({ ensembles }: { ensembles: Ensemble[] }) {
	const { user } = useAuth();

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex flex-row justify-between items-center mb-4">
				<h2 className="font-header text-2xl text-blue-800 font-bold ">My Ensembles</h2>
				<Link to="/ensembles/create">
					<Button variant="secondary">Create an Ensemble</Button>
				</Link>
			</div>

			{!ensembles || ensembles.length === 0 ? (
				<div className="text-center">
					<p className="mb-4">You don't have any Ensembles yet.</p>
				</div>
			) : (
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
					{ensembles.map((ensemble, index) => (
						<Link key={index} to={`/ensembles/${ensemble._id}`} className="block relative group">
							<li className="relative">
								<EnsembleCard key={index} ensemble={ensemble} user={user} />
							</li>
						</Link>
					))}
				</ul>
			)}
		</div>
	);
}
