import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/Button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div className="card">
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link to="/vite">
            <button>Vite</button>
          </Link>
          <Link to="/react">
            <Button variant="primary">React</Button>
          </Link>


          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>

        </div>
        <p>
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}
