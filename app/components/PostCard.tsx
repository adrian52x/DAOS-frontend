'use client'

import React from 'react';
import { Post } from '../data/posts';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/posts/${post.id}`);
    };

    return (
        <div onClick={handleClick} className="border border-gray-300 rounded-lg p-4 w-72 shadow-md">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-gray-600">{post.content}</p>
        </div>
    );
};

export default PostCard;