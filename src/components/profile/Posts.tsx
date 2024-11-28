import { Link } from '@tanstack/react-router';
import { Post } from '../../types/types';
import { Button } from '../elements/Button';

export function Posts({ posts }: { posts: Post[] }) {
	console.log('posts', posts);

	if (!posts || posts.length === 0) {
		return (
			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-bold mb-4">My Posts</h2>
				<div className="text-center">
					<p className="text-gray-500">You don't have any Ensembles yet.</p>
					<Link to="/posts/create">
						<Button variant="primary">Create post</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-xl font-bold mb-4">My Posts</h2>
			<ul>
				{posts.map((post) => (
					<li key={post._id}>
						<h3 className="text-lg font-semibold mb-2">{post.title}</h3>
						<p className="text-gray-800">{post.description}</p>

						{post.ensemble && post.ensemble.pendingRequests?.length > 0 && (
							<Link to={`/posts/${post._id}`}>
								<button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700">Incoming Requests</button>
							</Link>
						)}
						<hr />
					</li>
				))}
			</ul>
			<Link to="/posts/create">
				<Button variant="primary">Create post</Button>
			</Link>
		</div>
	);
}
