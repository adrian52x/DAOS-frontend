import { Link } from '@tanstack/react-router';
import { Post } from '../../types/types';
import { Button } from '../elements/Button';
import { PostCard } from '../PostCardMine';

export function Posts({ posts }: { posts: Post[] }) {
	console.log('posts', posts);

	if (!posts || posts.length === 0) {
		return (
			<div className="bg-white shadow rounded-lg p-6">
				<div className="flex flex-row justify-between items-center mb-4">
					<h2 className="font-header text-2xl text-blue-800 font-bold ">My Posts</h2>
					<Link to="/posts/create">
						<Button variant="secondary">Create post</Button>
					</Link>
				</div>
				<div className="text-center">
					<p className="text-gray-500">You don't have any Ensembles yet.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<div className="flex flex-row justify-between items-center mb-4">
				<h2 className="font-header text-2xl text-blue-800 font-bold ">My Posts</h2>
				<Link to="/posts/create">
					<Button variant="secondary">Create post</Button>
				</Link>
			</div>

			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
				{posts.map((post) => (
					<li key={post._id} className="relative group">
						{/* Post Card */}
						<PostCard key={post._id} post={post} />

						{/* Animated Incoming Requests Badge */}
						{post.ensemble && post.pendingRequests?.length > 0 && (
							<span className="absolute top-[-8px] right-[-8px] bg-red text-white text-xs font-bold rounded-full h-10 flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out group-hover:w-auto group-hover:px-4 w-10">
								<span className="whitespace-nowrap overflow-hidden group-hover:overflow-visible">
									+{post.pendingRequests.length} <span className="hidden group-hover:inline">incoming request{post.pendingRequests.length > 1 ? 's' : ''}</span>
								</span>
							</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
