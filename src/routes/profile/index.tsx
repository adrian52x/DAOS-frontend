import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { UserHeader } from '../../components/profile/UserHeader';
import { ProfileText } from '../../components/profile/ProfileText';
import { Instruments } from '../../components/profile/Instruments';
import { Ensembles } from '../../components/profile/Ensembles';
import { Posts } from '../../components/profile/Posts';
import { useQuery } from '@tanstack/react-query';
import styles from '/src/styles/globalStyles.module.css';
import { fetchAllEnsemblesByUser, fetchAllPostsByUser } from '../../utils/api';

export const Route = createFileRoute('/profile/')({
	component: Profile,
});

function Profile() {
	const { user, loading } = useAuth();
	console.log('user', user);

	// Query to get all user's posts by user ID
	const userPosts = useQuery({
		queryKey: ['user-posts', user?._id], 
		queryFn: () => fetchAllPostsByUser(user._id),
		enabled: !!user, 
	});

	// Query to get all user's ensembles by user ID (member of)
	const userEnsembles = useQuery({
		queryKey: ['user-ensembles', user?._id], 
		queryFn: () => fetchAllEnsemblesByUser(user._id),
		enabled: !!user, // Only run the query if user is available
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	return (
		<div>
			<div className={styles.sectionWrapper}>
				<UserHeader user={user} />
				<ProfileText text={user.profileText} />
				<Instruments instruments={user.instruments} />
				<Ensembles ensembles={userEnsembles.data} />
				<Posts posts={userPosts.data} />
			</div>
			<Outlet />
		</div>
	);
}
