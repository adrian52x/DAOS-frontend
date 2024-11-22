import { useEffect, useState } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PostCard } from "../../components/PostCardMine";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading posts...</div>;
  }

  return (
    <>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} id={post._id} title={post.title} ensemble={post.ensemble || "Unknown Ensemble"} location={post.location || "Location"} musicians={post.musicians || "Members"} instrument={post.instrument || "Unknown Instrument"} experience={post.experience} />
        ))}
      </div>
      <Outlet />
    </>
  );
}
