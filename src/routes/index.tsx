import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/Button";
import HeroImage from "../assets/hero-illustration.svg";
import MusikerIcon from "../assets/musiker-icon.png";
import EnsembleIcon from "../assets/ensemble-icon.png";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <section id="hero" className="p-6">
        <img
          src={HeroImage}
          alt="Hero illustration"
          className="w-full h-auto p-10"
        />
        <h1 className="font-header text-red font-medium text-3xl">
          Stedet hvor musikere finder musikere og spiller musik sammen
        </h1>

        <div className="flex space-x-4 ">
          <button className="flex flex-col basis-1/2  items-center justify-center border rounded-lg border-gray-400 p-4 ">
            <img
              src={MusikerIcon}
              alt="Musiker Icon"
              className="w-8 h-auto mb-2"
            />
            <p className="font-body text-blue-800 text-sm font-bold">
              Find musiker
            </p>
          </button>

          <button className="flex flex-col basis-1/2 items-center justify-center border rounded-lg border-gray-400 p-4 ">
            <img
              src={EnsembleIcon}
              alt="Ensemble Icon"
              className="w-8 h-auto mb-2"
            />
            <p className="font-body text-blue-800 text-sm font-bold ">
              Find ensemble
            </p>
          </button>
        </div>
      </section>

      <section id="reviews" className="bg-blue-800 p-6">
        <h2 className="font-header text-white font-medium text-3xl">
          Det siger vores brugere
        </h2>
      </section>

      <section id="latest-posts" className="p-6">
        <h2 className="font-header text-blue-800 font-medium text-3xl">
          Seneste opslag
        </h2>
      </section>

      <div className="card">
        <div>
          <Link to="/react">
            <Button variant="primary">Components page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
