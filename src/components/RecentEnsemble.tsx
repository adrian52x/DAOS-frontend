// components/RecentEnsembles.tsx
import { useEffect, useState } from "react";
import { fetchEnsembles } from "../services/ensembleService";
import { Ensemble } from "../types/Ensemble";
import { PostCardEnsemble } from "./PostCard";

export function RecentEnsemble() {
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const loadEnsembles = async () => {
      const data = await fetchEnsembles();
      setEnsembles(data);
    };
    loadEnsembles();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5); // Load 5 more posts
  };

  return (
    <section className="py-8">
      <h1 className="text-3xl font-bold mb-6">Recent Ensembles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ensembles.slice(0, visibleCount).map((ensemble) => (
          <Card key={ensemble.id} ensemble={ensemble} />
        ))}
        {visibleCount < ensembles.length && (
          <div
            className="bg-gray-100 rounded-lg shadow-md flex items-center justify-center p-4 cursor-pointer hover:bg-gray-200 transition"
            onClick={handleLoadMore}
          >
            <span className="text-blue-600 font-medium">Load More Posts</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentEnsembles;
