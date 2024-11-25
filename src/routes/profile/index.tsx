import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { UserHeader } from '../../components/profile/UserHeader';
import { ProfileText } from '../../components/profile/ProfileText';
import { Instruments } from '../../components/profile/Instruments';
import { Ensembles } from '../../components/profile/Ensembles';
import { Posts } from '../../components/profile/Posts';
import { useQuery } from '@tanstack/react-query';

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
	const ensemblesUserOwn = useQuery({
		queryKey: ['ensembles', user?._id], // Include userId in the query key
		queryFn: async () => {
			const response = await fetch(`http://localhost:3000/api/ensembles/own`, {
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
			<div className="container mx-auto p-4 space-y-8">
				<UserHeader user={user} />
				<ProfileText text={user.profileText} />
				<Instruments instruments={user.instruments} />
				<Ensembles ensembles={ensemblesUserOwn.data} />
				<Posts posts={postQuery.data} />
			</div>
			<Outlet />
		</div>
	);
}
