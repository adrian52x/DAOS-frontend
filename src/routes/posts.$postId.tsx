import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: PostDetails,
});

function PostDetails() {
  const { postId } = Route.useParams();
  console.log("fgf");

  return <div>{postId}</div>;
}
