import { Link, createFileRoute } from "@tanstack/react-router";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import ButtonBlue from "../components/ButtonBlue";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div>
        <ButtonBlue buttonText="Click me"></ButtonBlue>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
