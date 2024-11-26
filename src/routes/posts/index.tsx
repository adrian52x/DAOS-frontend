import { useEffect, useState } from 'react';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { PostCard } from '../../components/PostCardMine';
import { Post } from '../../types/types';
import { Button } from '../../components/elements/Button';

export const Route = createFileRoute('/posts/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/posts');
				const data = await response.json();
				setPosts(data);
			} catch (error) {
				console.error('Error fetching posts:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	if (loading) {
		return <div className="text-center text-gray-600">Loading posts...</div>;
	}

	console.log('posts', posts);
	

	return (
		<>
			<Link to="/posts/create">
				<Button variant="primary">Create post</Button>
			</Link>

			<Link to="/ensembles/create">
				<Button variant="primary">Create ensemble</Button>
			</Link>

			<div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
			<Outlet />
		</>
	);
}
