import React from "react";
import { Link } from "@tanstack/react-router";

type PostCardProps = {
  id: string;
  title: string;
  ensemble: string;
  location: string;
  musicians: string;
  instrument: string;
  experience: string;
};

export const PostCard: React.FC<PostCardProps> = ({ id, title, ensemble, location, musicians, instrument, experience }) => {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600">{ensemble}</p>
      <p className="text-sm text-gray-500">
        {location} • {musicians}
      </p>
      <p className="mt-2">
        <span className="font-semibold">Instrument:</span> {instrument}
      </p>
      <p>
        <span className="font-semibold">Experience:</span> {experience} years
      </p>
      {/* <Link to={`/posts/${id}`} className="inline-block mt-4 text-blue-600 hover:underline">
        View Details
      </Link> */}
    </div>
  );
};
