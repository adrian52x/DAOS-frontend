import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/Button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-10">
      <div className="card">
        <p>hi, welcome, thats it</p>

        <div>
          <Link to="/react">
            <Button variant="primary">Components page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
