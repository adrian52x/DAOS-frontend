import { createFileRoute } from '@tanstack/react-router';
import EnsembleDetails from '../../components/EnsembleDetails';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../auth/AuthContext';

export const Route = createFileRoute('/ensembles/$ensembleId')({
	component: EnsembleDetailsRoute,
});

function EnsembleDetailsRoute() {
	const { ensembleId } = Route.useParams<{ ensembleId: string }>();
	const { user, token } = useAuth();

	const ensemble = useQuery({
		queryKey: ['ensemble', user?._id], // Include userId in the query key
		queryFn: async () => {
			const response = await fetch(`http://localhost:3000/api/ensembles/one/${ensembleId}`, {
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();

			return data;
		},
		enabled: !!ensembleId, // Only run the query if ensembleId is available
	});

	if (ensemble.isError) {
		// need to figure this part out and fix it
		return <p>Error: idk</p>;
	}

	if (!ensemble.data) {
		return <p>No data available</p>;
	}

	// Pass the fetched ensemble data to the existing EnsembleDetails component
	return <EnsembleDetails ensemble={ensemble.data} />;
}

export default EnsembleDetailsRoute;
