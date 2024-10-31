import { useRouter } from 'next/navigation';
import { posts } from '../../data/posts';
import React from 'react';

interface PostPageProps {
  params: {
    id: string;
  };
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
    const { id } = await params;
    const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
};

export default PostPage;