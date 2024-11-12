import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/Button";
import { Chip } from "../components/Chip";
import { Tag } from "../components/Tag";

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
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>

        <p className="font-header font-bold py-3 text-red">Multi-select chip</p>
        <Chip>Chip-text</Chip>

        <p className="font-header font-bold py-3 text-red">Filter tag</p>
        <Tag>Tag-active</Tag>
        <Tag variant="passive">Tag-passiveeee</Tag>
      </div>
    </>
  );
}
