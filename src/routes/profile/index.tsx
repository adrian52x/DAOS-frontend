import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { UserHeader } from '../../components/profile/UserHeader';
import { ProfileText } from '../../components/profile/ProfileText';
import { Instruments } from '../../components/profile/Instruments';
import { Ensembles } from '../../components/profile/Ensembles';
import { Posts } from '../../components/profile/Posts';
import { useQuery } from '@tanstack/react-query';
import styles from '/src/styles/globalStyles.module.css';

export const Route = createFileRoute('/profile/')({
	component: Profile,
});

function Profile() {
	const { user, loading, token } = useAuth();
	console.log('user', user);

	const postQuery = useQuery({
		queryKey: ['posts', user?._id], // Include userId in the query key
		queryFn: async () => {
			const response = await fetch(`http://localhost:3000/api/posts/author/${user._id}`);
			const data = await response.json();
			return data;
		},
		enabled: !!user, // Only run the query if user is available
	});

	// Query to get ensembles that the user owns
	const ensemblesUserMember = useQuery({
		queryKey: ['ensembles', user?._id], // Include userId in the query key
		queryFn: async () => {
			const response = await fetch(`http://localhost:3000/api/ensembles/member`, {
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			console.log('user', user);

			console.log('ensembles', data);

			return data;
		},
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
			<div className={styles.pageWrapper}>
				<UserHeader user={user} />
				<ProfileText text={user.profileText} />
				<Instruments instruments={user.instruments} />
				<Ensembles ensembles={ensemblesUserMember.data} />
				<Posts posts={postQuery.data} />
			</div>
			<Outlet />
		</div>
	);
}
