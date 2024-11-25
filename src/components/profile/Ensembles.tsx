import { Link } from '@tanstack/react-router';
import { Ensemble } from '../../types/types';
import { Button } from '../elements/Button';
import { useAuth } from '../../auth/AuthContext';

export function Ensembles({ ensembles }: { ensembles: Ensemble[] }) {
	const { user } = useAuth();

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
						{ensemble.owner === user._id && <span className="text-yellow-500">⭐ Owner</span>}
						<div className="px-4 pb-4">
							<Link to={`/ensembles/${ensemble._id}`} className="text-blue-600 hover:underline font-body">
								View Details
							</Link>
						</div>
					</li>
				))}
			</ul>
			<Link to="/ensembles/create">
				<Button variant="primary">Create an Ensemble</Button>
			</Link>
		</div>
	);
}
