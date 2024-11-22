export function Posts({ userId }: { userId: string }) {
	// fetch the posts data here based on the userId
	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-xl font-bold mb-4">My Posts</h2>
			<p>Posts will be fetched based on user ID: {userId}</p>
		</div>
	);
}
