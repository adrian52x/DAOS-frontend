import React from 'react';
import { Post } from '../types/types';
import EnsemblePortrait from '../assets/ensemble-portrait.jpeg';

interface PostDetailsProps {
	postData: Post;
}
const PostDetails: React.FC<PostDetailsProps> = ({ postData }) => {
	if (!postData) {
		return <p>Loading...</p>;
	}

	return (
		<div className="p-6 max-w-4xl mx-auto bg-gray-50 border border-gray-300 rounded-lg shadow-md">
			{/* Title Section */}
			<h1 className="text-3xl font-bold text-blue-800 mb-2">{postData.title}</h1>
			<p className="text-sm text-gray-600">date</p>

			{/* Ensemble Info */}
			<div className="flex items-center bg-white border border-gray-300 rounded-lg p-4 shadow-sm mt-6">
				<img src={EnsemblePortrait} alt={postData.ensemble.name} className="rounded-lg w-16 h-16 object-cover" />
				<div className="ml-4">
					<h2 className="font-bold text-lg text-red-800">{postData.ensemble?.name}</h2>
					<p className="text-gray-700 text-sm">
						{postData.ensemble.address} • {postData.ensemble?.activeMembers}
					</p>
				</div>
			</div>
			{/* Edit Button - we need to have that only when you are the owner of the post */}
			<div className="flex justify-center mt-6">
				<button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700">Rediger opslag</button>
			</div>

			{/* Description Section */}
			<div className="mt-8">
				<h2 className="text-2xl font-bold text-blue-800 mb-4">Beskrivelse</h2>
				<p className="text-base text-gray-800 leading-relaxed">{postData.description}</p>
			</div>

			{/* Instrument Section */}
			<div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mt-8">
				<h3 className="text-xl font-bold text-blue-800 mb-2">Minimumsniveau</h3>
				<p className="text-lg text-black mb-1">Niveau {postData.instrument.level}</p>
				<p className="text-base text-gray-800">Svarende til en musiker der har spillet 4-6 år og kan spille efter lettere komplekse noder.</p>
			</div>
			{/* Genres Section */}
			<div className="mt-8">
				<h3 className="text-xl font-bold text-blue-800 mb-2">Genrer</h3>
				<div className="flex gap-2">
					{/* Display genres as tags */}
					<span className="bg-gray-200 text-blue-800 text-sm font-bold px-3 py-1 rounded-md shadow-sm">{postData.instrument.genre}</span>
				</div>
			</div>
			{/* Contact Button - is not doing anything */}
			<div className="flex justify-center mt-8">
				<button className="bg-blue-900 text-white font-bold py-3 px-6 rounded-md shadow-lg hover:bg-blue-700">Kontakt</button>
			</div>
		</div>
	);
};

export default PostDetails;
