import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/Button";
import { Chip } from "../components/Chip";

export const Route = createFileRoute("/react")({
  component: React,
});

function React() {
  return (
    <>
      <div className="p-10">
        <Link to="/">
          <p className="pb-10">Back to Index</p>
        </Link>

        <p className="font-header font-bold py-3 text-red">
          Main Button - Primary and Secondary
        </p>
        <Button variant="primary">Label</Button>
        <Button variant="secondary">Label</Button>

        <p className="font-header font-bold py-3 text-red">Multi-select chip</p>
        <Chip>Chip-text</Chip>
      </div>
    </>
  );
}
