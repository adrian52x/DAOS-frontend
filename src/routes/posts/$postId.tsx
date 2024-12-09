import { createFileRoute } from '@tanstack/react-router';
import PostDetails from '../../components/PostDetails';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '../../utils/api';

export const Route = createFileRoute('/posts/$postId')({
	// Ensure dynamic segment matches
	component: PostDetailsRoute,
});

function PostDetailsRoute() {
	const { postId } = Route.useParams<{ postId: string }>(); // TypeScript type added

	const { data: postData, isLoading } = useQuery({
		queryKey: ['post', postId],
		queryFn: () => fetchPostById(postId),
		enabled: !!postId, // Only fetch when postId is truthy
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (postData.error) {
		return <p>Error: {postData.message}</p>;
	}

	console.log('postData', postData);

	return <PostDetails postData={postData} />;
}

export default PostDetailsRoute;
