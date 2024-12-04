import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUserData } from '../utils/api';


export function useCurrentUserData(token: string) {
	return useQuery({
		queryKey: ['current-user'],
		queryFn: () => fetchCurrentUserData(token),
		enabled: !!token,
	});
}