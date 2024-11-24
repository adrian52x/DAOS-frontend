import EnsembleIcon from '../assets/ensemble-icon.png';
import EnsemblePortrait from '../assets/ensemble-portrait.jpeg';
import { Post } from '../types/types';

// Accepting dynamic post data as props
export function PostCardEnsemble({ post }: { post: Post }) {
	return (
		<article className="border-2 border-gray-400 rounded-xl">
			<div className="flex flex-row justify-between bg-gray-200 pt-4 px-4">
				<img
					src={EnsemblePortrait} // You can later make this dynamic if needed
					alt="ensemble portrait"
					className="w-[50px] h-[50px] object-cover rounded-lg mr-4"
				/>
				<div className="grow">
					<h3 className="font-body font-bold text-red">{post.title}</h3>
					<p className="text-gray-800">
						<span className="font-body text-sm font-bold pr-2">{post.ensemble?.address}</span> •{' '}
						<span className="font-body text-sm pl-2">{post.ensemble?.activeMembers}</span>
					</p>
				</div>
				<img src={EnsembleIcon} alt="icon" className="self-end opacity-20" />
			</div>

			<h4 className="font-body text-xl font-bold text-blue-800 p-4">{post.description}</h4>

			<div className="flex flex-row justify-between px-4 pb-4">
				<h5 className="font-header text-xl text-blue-800 font-bold">{post.instrument?.name}</h5>
				<p className="font-body text-md text-gray-800 font-bold">
					Erfaring
					<span className="text-white bg-blue-800 p-2 rounded-xl ml-2">
						{post.instrument?.level}
						<span>+</span>
					</span>
				</p>
			</div>
		</article>
	);
}
