import { Link, createFileRoute } from "@tanstack/react-router";
import viteLogo from "/vite.svg";

export const Route = createFileRoute("/vite")({
  component: Vite,
});

function Vite() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite</h1>
      <div className="card">
        <Link to="/">
          <button>Go back</button>
        </Link>
        <p>
          Edit <code>src/routes/vite.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite logo to learn more</p>
    </>
  );
}
