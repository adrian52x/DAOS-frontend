import React from 'react';

interface PostDetailsProps {
	postData: {
		_id: string;
		title: string;
		content: string;
		createdAt: string;
		organization: {
			name: string;
			location: string;
			size: string;
		};
		minimumLevel: {
			level: number;
			description: string;
		};
	};
}

const PostDetails: React.FC<PostDetailsProps> = ({ postData }) => {
	return (
		<div className="p-6 max-w-4xl mx-auto bg-gray-200 border border-gray-600 rounded-lg shadow-md">
			{/* Title Section */}
			<h1 className="text-3xl font-header text-blue-800 mb-2">{postData.title}</h1>
			<p className="text-sm text-gray-800">Opslag oprettet {postData.createdAt}</p>

			{/* Organization Info */}
			<div className="flex items-center bg-white border border-gray-600 rounded-lg p-4 shadow-sm mt-6">
				<img src="https://via.placeholder.com/60" alt={postData.organization.name} className="rounded-full mr-4 w-14 h-14" />
				<div>
					<h2 className="font-header text-lg text-black">{postData.organization.name}</h2>
					<p className="text-sm text-gray-800">
						{postData.organization.location} • {postData.organization.size}
					</p>
				</div>
			</div>

			{/* Description Section */}
			<div className="mt-8">
				<h2 className="text-2xl font-header text-blue-800 mb-4">Beskrivelse</h2>
				<p className="text-base font-body text-gray-800 leading-relaxed">{postData.content}</p>
			</div>

			{/* Minimum Level Section */}
			<div className="bg-white border border-gray-600 rounded-lg p-4 shadow-sm mt-8">
				<h3 className="text-xl font-header text-blue-800 mb-2">Minimumsniveau</h3>
				<p className="text-lg text-black font-body mb-1">Niveau {postData.minimumLevel.level}</p>
				<p className="text-base text-gray-800 font-body leading-relaxed">{postData.minimumLevel.description}</p>
			</div>
		</div>
	);
};

export default PostDetails;
