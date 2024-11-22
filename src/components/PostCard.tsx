import EnsembleIcon from '../assets/ensemble-icon.png';
import EnsemblePortrait from '../assets/ensemble-portrait.jpeg';

export interface PostProps {
	_id: object;
	name: string;
	area: string;
	numOfMusicians: string;
	description: string;
	instrument: string;
	experience: number;
}

// Accepting dynamic post data as props
export function PostCardEnsemble({ post }: { post: PostProps }) {
	return (
		<article className="border border-2 border-gray-400 rounded-xl">
			<div className="flex flex-row justify-between bg-gray-200 pt-4 px-4">
				<img
					src={EnsemblePortrait} // You can later make this dynamic if needed
					alt="ensemble portrait"
					className="w-[50px] h-[50px] object-cover rounded-lg mr-4"
				/>
				<div className="grow">
					<h3 className="font-body font-bold text-red">{post.name}</h3>
					<p className="text-gray-800">
						<span className="font-body text-sm font-bold pr-2">{post.area}</span> • <span className="font-body text-sm pl-2">{post.numOfMusicians}</span>
					</p>
				</div>
				<img src={EnsembleIcon} alt="icon" className="self-end opacity-20" />
			</div>

			<h4 className="font-body text-xl font-bold text-blue-800 p-4">{post.description}</h4>

			<div className="flex flex-row justify-between px-4 pb-4">
				<h5 className="font-header text-xl text-blue-800 font-bold">{post.instrument}</h5>
				<p className="font-body text-md text-gray-800 font-bold">
					Erfaring
					<span className="text-white bg-blue-800 p-2 rounded-xl ml-2">
						{post.experience}
						<span>+</span>
					</span>
				</p>
			</div>
		</article>
	);
}
