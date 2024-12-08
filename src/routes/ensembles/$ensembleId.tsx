import { createFileRoute } from '@tanstack/react-router';
import EnsembleDetails from '../../components/EnsembleDetails';
import { useQuery } from '@tanstack/react-query';
import { fetchEnsembleById } from '../../utils/api';

export const Route = createFileRoute('/ensembles/$ensembleId')({
	component: EnsembleDetailsRoute,
});

function EnsembleDetailsRoute() {
	console.log('Rendering EnsembleDetailsRouteeeee');
	const { ensembleId } = Route.useParams<{ ensembleId: string }>();

	const ensemble = useQuery({
		queryKey: ['ensemble'], // Static query key
		queryFn: async () => fetchEnsembleById(ensembleId),
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
