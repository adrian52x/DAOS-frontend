import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import PostDetails from "../../components/PostDetails";

export const Route = createFileRoute("/posts/$posts")({
  // Ensure dynamic segment matches
  component: PostDetailsRoute,
});

function PostDetailsRoute() {
  const { postId } = Route.useParams<{ postId: string }>(); // TypeScript type added
  const [postData, setPostData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before fetching

        const response = await fetch(`http://localhost:3000/api/posts/${postId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        const data = await response.json();

        // Add missing fields to the response
        const enrichedData = {
          ...data,
          createdAt: "13. august 2020", // Replace with actual data
          organization: {
            name: "Musician Network", // Replace with actual data
            location: "Copenhagen", // Replace with actual data
            size: "10 - 20 musicians", // Replace with actual data
          },
          minimumLevel: {
            level: 3, // Replace with actual data
            description: "Suitable for someone with 2-4 years of experience and basic sight-reading skills.", // Replace with actual data
          },
        };

        setPostData(enrichedData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!postData) {
    return <p>No data available</p>;
  }

  return <PostDetails postData={postData} />;
}

export default PostDetailsRoute;
