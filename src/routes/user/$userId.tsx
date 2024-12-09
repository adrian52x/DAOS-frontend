import { useEffect, useState } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { UserHeader } from '../../components/user/UserHeader';
import { ProfileText } from '../../components/user/ProfileText';
import { Instruments } from '../../components/user/Instruments';
import { Ensembles } from '../../components/user/Ensembles';
import { Posts } from '../../components/user/Posts';
import { useQuery } from '@tanstack/react-query';
import { fetchAllEnsemblesByUser, fetchAllPostsByUser, fetchUserById } from '../../utils/api';
import styles from '/src/styles/globalStyles.module.css';

export const Route = createFileRoute('/user/$userId')({
	component: Profile,
});

function Profile() {
	const { userId } = Route.useParams<{ userId: string }>();
	const [userData, setUserData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				setLoading(true);
				setError(null); // Reset error before fetching

				const data = await fetchUserById(userId); //check api.ts

				setUserData(data);
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : String(err);
				console.error('Error:', errorMessage);
				setError(errorMessage);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [userId]);

	// Query to get all user's posts by user ID
	const userPosts = useQuery({
		queryKey: ['user-posts', userData?._id],
		queryFn: () => fetchAllPostsByUser(userData._id),
		enabled: !!userData,
	});

	// Query to get all user's ensembles by user ID (member of)
	const userEnsembles = useQuery({
		queryKey: ['user-ensembles', userData?._id],
		queryFn: () => fetchAllEnsemblesByUser(userData._id),
		enabled: !!userData, // Only run the query if user is available
	});

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!userData) {
		return <p>No data available</p>;
	}

	return (
		<div>
			<div className={styles.sectionWrapper}>
				<UserHeader user={userData} />
				<ProfileText text={userData.profileText} />
				<Instruments instruments={userData.instruments} user={userData} />
				<Ensembles ensembles={userEnsembles.data} user={userData} />
				<Posts posts={userPosts.data} user={userData} />
			</div>
			<Outlet />
		</div>
	);
}
