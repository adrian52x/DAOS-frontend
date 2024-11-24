type Post = {
	_id: string;
	title: string;
	content: string;
};
export function Posts({ posts }: { posts: Post[] }) {
	console.log('posts', posts);

	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-xl font-bold mb-4">My Posts</h2>
			{!posts || posts.length === 0 ? (
				<p className="text-gray-500">You haven't created any posts yet.</p>
			) : (
				<ul className="space-y-4">
					{posts.map((post) => (
						<li key={post._id} className="border-b border-gray-200 pb-4 last:border-b-0">
							<h3 className="text-lg font-semibold mb-2">{post.title}</h3>
							<p className="text-gray-600">{post.content}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
