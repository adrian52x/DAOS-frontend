import { Link, createFileRoute } from "@tanstack/react-router";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/react")({
  component: React,
});

function React() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React</h1>
      <div className="card">
        <Link to="/">
          <button>Go back</button>
        </Link>
        <p>
          Edit <code>src/routes/react.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the React logo to learn more</p>
    </>
  );
}
