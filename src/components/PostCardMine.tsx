import { Link } from '@tanstack/react-router';
import EnsembleIcon from '../assets/ensemble-icon.png';
import EnsemblePortrait from '../assets/ensemble-portrait.jpeg';
import { Post } from '../types/types';

export function PostCard({ post }: { post: Post }) {
	return (
		<article className="border-2 border-gray-400 rounded-xl shadow-sm hover:shadow-md transition">
			{/* Header Section */}
			<div className="flex flex-row gap-4 justify-between bg-gray-200 pt-4 px-4">
				{/* Ensemble Portrait */}
				<img src={EnsemblePortrait} alt="propic" className="w-[50px] h-[50px] object-cover rounded-lg" />
				{/* Ensemble Details */}
				<div className="grow">
					<h3 className="font-body font-bold text-red">{post.ensemble?.name}</h3>
					<p className="text-gray-800">
						<span className="font-body text-sm font-bold pr-2">{post.ensemble?.address}</span>•{' '}
						<span className="font-body text-sm pl-2">{post.ensemble?.activeMembers}</span>
					</p>
				</div>
				{/* Icon */}
				<img src={EnsembleIcon} alt="ensemble icon" className="self-end opacity-20" />
			</div>

			{/* Post Title */}
			<h4 className="font-body text-xl font-bold text-blue-800 p-4">{post.title}</h4>

			{/* Instrument and Experience Section */}
			<div className="flex flex-row justify-between px-4 pb-4">
				<h5 className="font-header text-xl text-blue font-bold">{post.instrument?.name}</h5>
				<p className="font-body text-md text-gray-800 font-bold">
					Erfaring
					<span className="text-white bg-blue-800 p-2 rounded-xl ml-2">{post.instrument?.level}+</span>
				</p>
			</div>

			{/* Link to Details */}
			<div className="px-4 pb-4">
				<Link to="/posts/$postId" params={{ postId: post._id }} className="text-blue-600 hover:underline font-body">
					View Details
				</Link>
			</div>
		</article>
	);
}
