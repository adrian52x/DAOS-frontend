import { useEffect, useState } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { UserHeader } from '../../components/user/UserHeader';
import { ProfileText } from '../../components/user/ProfileText';
import { Instruments } from '../../components/user/Instruments';
import { Ensembles } from '../../components/user/Ensembles';
import { Posts } from '../../components/user/Posts';
import { useQuery } from '@tanstack/react-query';
import { fetchUserById } from '../../utils/api';
import styles from '/src/styles/globalStyles.module.css';

export const Route = createFileRoute('/user/$userId')({
	component: Profile,
});

function Profile() {
	const { userId } = Route.useParams<{ userId: string }>();
	const [postData, setPostData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const user = postData;

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null); // Reset error before fetching

				const data = await fetchUserById(userId); //check api.ts
				console.log('Fetched data:', data); // Debug the fetched data
				setPostData(data);
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : String(err);
				console.error('Error:', errorMessage);
				setError(errorMessage);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [userId]);

	// Query to get ensembles by user ID
	const ensemblesByUserId = useQuery({
		queryKey: ['ensembles', user?._id], // Include userId in the query key
		queryFn: async () => {
			const response = await fetch(`http://localhost:3000/api/ensembles/member/${userId}`, {
				credentials: 'include',
			});
			const data = await response.json();
			console.log('user', user);

			console.log('ensembles', data);

			return data;
		},
		enabled: !!user, // Only run the query if user is available
	});

	const postQuery = useQuery({
		queryKey: ['posts', user?._id], // Include userId in the query key
		queryFn: async () => {
			const response = await fetch(`http://localhost:3000/api/posts/author/${userId}`);
			const data = await response.json();
			return data;
		},
		enabled: !!user, // Only run the query if user is available
	});

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!postData) {
		return <p>No data available</p>;
	}

	return (
		<div>
			<div className={styles.sectionWrapper}>
				<UserHeader user={user} />
				<ProfileText text={user.profileText} />
				<Instruments instruments={user.instruments} user={user} />
				<Ensembles ensembles={ensemblesByUserId.data} user={user} />
				<Posts posts={postQuery.data} user={user} />
			</div>
			<Outlet />
		</div>
	);
}
