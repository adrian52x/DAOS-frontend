import React from 'react';
import { posts, Post } from '../data/posts';
import PostCard from '../components/PostCard';

const PostsPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-wrap gap-4">
            {posts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    </div>
  );
};

export default PostsPage;