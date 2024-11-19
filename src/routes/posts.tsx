import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-10">
      <h1>Posts heree</h1>
      <div className="card"></div>
    </div>
  );
}
