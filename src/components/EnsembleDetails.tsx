import { Link } from '@tanstack/react-router';
import { EnsembleById, Post } from '../types/types';
import { Button } from './elements/Button';
import { fetchPostsByEnsembleId } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { PostCard } from './PostCard';
import { useAuth } from '../auth/AuthContext';
import EnsemblePortrait from '../assets/ensemble-portrait.jpeg';
import styles from '/src/styles/globalStyles.module.css';

const EnsembleDetails = ({ ensemble }: { ensemble: EnsembleById }) => {
	const { user } = useAuth();
	console.log('Logged-in user:', user);

	// Fetching the posts associated with this ensemble
	const {
		data: posts,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['ensemble-posts', ensemble._id],
		queryFn: () => fetchPostsByEnsembleId(ensemble._id),
		enabled: !!ensemble._id, // ensures the query only runs if the ensemble ID exists
	});

	return (
		<div className={styles.sectionWrapper}>
			{/* header section */}
			<div>
				<div className="flex items-center space-x-6 pb-4">
					<img src={user.img ? user.img : EnsemblePortrait} alt={user.img} className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-4 border-white shadow-lg" />
					<div>
						<h1 className="text-3xl font-header text-blue-800 mb-2">{ensemble.name}</h1>
						<h2 className="text-gray-800 font-body">Owner: {ensemble.owner.name}</h2>
					</div>
				</div>

				{user && ensemble.owner._id === user._id && (
					<Link to="/ensembles/update">
						<div className="block sm:hidden">
							<Button variant="tertiary">Edit ensemble details</Button>
						</div>
						<div className="hidden sm:block">
							<Button variant="secondary">Edit ensemble details</Button>
						</div>
					</Link>
				)}
			</div>

			{/* address and active members */}
			<div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
				<div className="flex-1 bg-white border border-gray-600 rounded-lg p-4 shadow-sm">
					<h3 className="text-xl font-header text-blue-800 mb-2">Address</h3>
					<p className="text-lg text-black font-body mb-1">
						{' '}
						{ensemble.address}, {ensemble.zipCode}
					</p>
				</div>

				<div className="flex-1 bg-white border border-gray-600 rounded-lg p-4 shadow-sm">
					<h3 className="text-xl font-header text-blue-800 mb-2">Active Members</h3>
					<p className="text-lg text-black font-body mb-1">{ensemble.activeMembers}</p>
				</div>
			</div>

			{/* members list */}
			<div className="bg-white border border-gray-600 rounded-lg p-4 shadow-sm">
				<h3 className="text-xl font-header text-blue-800 mb-2">Members</h3>
				{ensemble.members?.length > 0 ? (
					<ul>
						{ensemble.members.map((member, index) => (
							<li key={index} className="text-base text-gray-800 font-body leading-relaxed">
								{member.name}
							</li>
						))}
					</ul>
				) : (
					<p className="text-base text-gray-800 font-body leading-relaxed">No members yet</p>
				)}
			</div>

			{/* show posts for this ensemble */}
			<div className="bg-white border border-gray-600 rounded-lg p-4 shadow-sm">
				<h3 className="text-xl font-header text-blue-800 mb-2">Posts</h3>
				{isLoading ? (
					<p>Loading posts...</p>
				) : error ? (
					<p>Error loading posts: {error.message}</p>
				) : posts?.length > 0 ? (
					posts.map((post: Post) => <PostCard key={post._id} post={post} />)
				) : (
					<p>No posts found for this ensemble.</p>
				)}
			</div>
		</div>
	);
};

export default EnsembleDetails;
