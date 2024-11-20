import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/Button";
import HeroImage from "../assets/hero-illustration.svg";
import { SecondaryCTA } from "../components/SecondaryCTA";
import { PrimaryCTA } from "../components/PrimaryCTA";
import { ReviewCard } from "../components/ReviewCard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <section id="hero" className="w-full lg:p-16 p-6">
        <div className="flex flex-col lg:flex-row-reverse lg:gap-6 items-center">
          <img
            src={HeroImage}
            alt="Hero illustration"
            className="lg:w-1/2 p-10"
          />
          <div>
            <h1 className="font-header text-red font-medium text-3xl lg:text-6xl pb-6">
              Stedet hvor musikere finder musikere og spiller musik sammen
            </h1>
            <PrimaryCTA></PrimaryCTA> {/* Visible on desktop */}
          </div>
        </div>
        <SecondaryCTA></SecondaryCTA> {/* Visible on mobile */}
      </section>

      <section id="reviews" className="bg-blue-800 p-6 lg:p-16">
        <h2 className="font-header text-white font-medium text-3xl lg:text-4xl pb-8">
          Det siger vores brugere
        </h2>
        <ReviewCard></ReviewCard>
      </section>

      <section id="latest-posts" className="p-6 lg:p-16">
        <h2 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl">
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
