import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/Button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div>
        <Button buttonText="Click me I'm a button" variant="primary" />
      </div>
      <div className="card">
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link to="/vite">
            <button>Vite</button>
          </Link>
          <Link to="/react">
            <button>React</button>
          </Link>
        </div>
        <p>
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}
