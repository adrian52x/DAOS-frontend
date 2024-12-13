import { Link } from '@tanstack/react-router';
import { Post } from '../../types/types';
import { Button } from '../elements/Button';
import { PostCard } from '../PostCardMine';

export function Posts({ posts, user }: { posts: Post[]; user: any }) {
	console.log('posts', posts);

	if (!posts || posts.length === 0) {
		return (
			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-bold mb-4">My Posts</h2>
				<div className="text-center">
					<p className="text-gray-500">You don't have any Post yet.</p>
					<Link to="/posts/create">
						<Button variant="primary">Create post</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="font-header text-2xl text-blue-800 font-bold mb-4 ">{user.name}'s Posts</h2>

			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
				{posts.map((post) => (
					<li key={post._id} className="relative">
							{/* Post Card */}
							<PostCard key={post._id} post={post} />
						<hr />
					</li>
				))}
			</ul>
		</div>
	);
}
