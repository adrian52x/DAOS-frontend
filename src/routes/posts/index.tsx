import { useEffect, useState } from 'react';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { PostCard } from '../../components/PostCard';
import { Post } from '../../types/types';
import { Button } from '../../components/elements/Button';
import styles from '/src/styles/globalStyles.module.css';

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
		<div className={styles.sectionWrapper}>
			<h2 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl ">All posts</h2>

			<Link to="/posts/create">
				<Button variant="primary">Create post</Button>
			</Link>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts.map((post) => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
			<Outlet />
		</div>
	);
}
