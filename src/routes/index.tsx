import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/Button";
import HeroImage from "../assets/hero-illustration.svg";
import { SecondaryCTA } from "../components/SecondaryCTA";
import { PrimaryCTA } from "../components/PrimaryCTA";
import { ReviewCard } from "../components/ReviewCard";
import { PostCardEnsemble } from "../components/PostCard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // Loading state to show a spinner or message

  useEffect(() => {
    // Fetch the latest 5 posts from the backend
    fetch("http://localhost:3000/api/posts?limit=6") // Ensure this matches your backend URL
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setPosts(data); // Set the posts in state
        setLoading(false); // Stop the loading state
      })
      .catch((error) => {
        console.error("Error fetching posts:", error); // Log any errors
        setLoading(false); // Stop the loading state even if there's an error
      });
  }, []); // Empty dependency array to fetch once on mount

  return (
    <div>
      <section id="hero" className="w-full lg:p-16 p-6">
        <div className="flex flex-col lg:flex-row-reverse lg:gap-6 items-center">
          <img
            src={HeroImage}
            alt="Hero illustration"
            className="lg:w-1/2 p-10"
          />
          <div>
            <h1 className="font-header text-red font-medium text-3xl lg:text-6xl pb-6">
              Stedet hvor musikere finder musikere og spiller musik sammen
            </h1>
            <PrimaryCTA /> {/* Visible on desktop */}
          </div>
        </div>
        <SecondaryCTA /> {/* Visible on mobile */}
      </section>

      <section id="reviews" className="bg-blue-800 p-6 lg:p-16">
        <h2 className="font-header text-white font-medium text-3xl lg:text-4xl pb-8">
          Det siger vores brugere
        </h2>
        <ReviewCard />
      </section>

      <section id="latest-posts" className="p-6 lg:p-16">
        <h2 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl pb-6">
          Seneste opslag
        </h2>

        {/* Display loading spinner or message */}
        {loading ? (
          <div>Loading posts...</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCardEnsemble key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Show "See More Posts" button if there are at least 5 posts */}
        {posts.length >= 5 && (
          <div className="mt-6 flex justify-center">
            <Link to="/posts">
              <Button variant="primary">See More Posts</Button>
            </Link>
          </div>
        )}
      </section>

      <div className="card">
        <div>
          <Link to="/react">
            <Button variant="primary">Components page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
