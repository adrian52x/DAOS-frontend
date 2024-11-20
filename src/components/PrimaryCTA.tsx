import { Dropdown } from "./DropdownMenu";
import { Button } from "./Button";

export function PrimaryCTA() {
  const instruments = ["Guitar", "Piano", "Drums", "Violin", "Flute"];

  return (
    <div className=" hidden sm:flex flex-row gap-4">
      <Dropdown options={instruments} placeholder="Vælg instrument"></Dropdown>
      <Button>Se opslag</Button>
    </div>
  );
}
