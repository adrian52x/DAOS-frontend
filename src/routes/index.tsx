import { useState, useEffect } from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Button } from '../components/elements/Button';
import HeroImage from '../assets/hero-illustration.svg';
import { SecondaryCTA } from '../components/SecondaryCTA';
import { PrimaryCTA } from '../components/PrimaryCTA';
import { ReviewCard } from '../components/ReviewCard';
import { Post } from '../types/types';
import styles from '/src/styles/globalStyles.module.css';
import { PostCard } from '../components/PostCardMine';
export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	const [posts, setPosts] = useState<Post[]>([]); // State to store posts
	const [loading, setLoading] = useState(true); // Loading state to show a spinner or message

	useEffect(() => {
		// Fetch the latest 5 posts from the backend
		fetch('http://localhost:3000/api/posts?limit=6') // Ensure this matches your backend URL
			.then((response) => response.json()) // Parse the response as JSON
			.then((data) => {
				setPosts(data); // Set the posts in state
				setLoading(false); // Stop the loading state
				console.log('Fetched posts:', data); // Log the fetched posts
			})
			.catch((error) => {
				console.error('Error fetching posts:', error); // Log any errors
				setLoading(false); // Stop the loading state even if there's an error
			});
	}, []); // Empty dependency array to fetch once on mount

	return (
		<>
			{/* section 1 */}
			<section id="hero" className={styles.sectionWrapper}>
				<div className="flex flex-col lg:flex-row-reverse lg:gap-6 items-center">
					<img src={HeroImage} alt="Hero illustration" className="lg:w-1/2 p-10" />
					<div>
						<h1 className="font-header text-red font-medium text-3xl lg:text-6xl pb-6">Stedet hvor musikere finder musikere og spiller musik sammen</h1>
						<PrimaryCTA /> {/* Visible on desktop */}
					</div>
				</div>
				<SecondaryCTA /> {/* Visible on mobile */}
			</section>

			{/* section 2 */}
			<section id="reviews" className={`${styles.blueBackground} ${styles.sectionWrapper}`}>
				<h2 className="font-header text-white font-medium text-3xl lg:text-4xl ">Det siger vores brugere</h2>

				<ReviewCard />
			</section>

			{/* section 3 */}
			<section id="latest-posts" className={styles.sectionWrapper}>
				<h2 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl ">Seneste opslag</h2>

				{/* Display loading spinner or message */}
				{loading ? (
					<div>Loading posts...</div>
				) : (
					<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{posts.map((post) => (
							<PostCard key={post._id} post={post} />
						))}
					</div>
				)}

				{/* "See More" button if there are at least 5 posts */}
				{posts.length >= 5 && (
					<div className="mt-6 flex justify-center">
						<Link to="/posts">
							<Button variant="primary">See More Posts</Button>
						</Link>
					</div>
				)}
			</section>
		</>
	);
}

export default Index;
