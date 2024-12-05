import { useNavigate } from '@tanstack/react-router';
import EnsembleIcon from '../assets/ensemble-icon.png';
import EnsemblePortrait from '../assets/ensemble-portrait.jpeg';
import { Post } from '../types/types';
import { Tag } from '../components/elements/Tag';

export function PostCard({ post }: { post: Post }) {
	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate({ to: `/posts/${post._id}` });
	};

	const navigateProfile = () => {
		navigate({ to: `/user/${post.author._id}` });
	};

	return (
		<article className="border-2 border-gray-400 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
			<div className="flex flex-row gap-4 justify-between bg-gray-200 pt-4 px-4">
				<img src={EnsemblePortrait} alt="propic" className="w-[50px] h-[50px] object-cover rounded-lg" />

				<div className="grow">
					{post.ensemble ? (
						<>
							<h3 className="font-body font-bold text-red">{post.ensemble.name}</h3>
							<p className="text-gray-800 whitespace-nowrap">
								<span className="font-body text-sm font-bold pr-2">{post.ensemble.address}</span>•{' '}
								<span className="font-body text-sm pl-2">{post.ensemble.activeMembers} musikere</span>
							</p>
						</>
					) : (
						<>
							<h3 className="font-body font-bold text-red">{post.author.name}</h3>
							<p className="text-gray-800">
								<span className="font-body text-sm font-bold pr-2">{post.author.address}</span>
							</p>
							<Tag onClick={navigateProfile}>See profile</Tag>
						</>
					)}
				</div>

				<img src={EnsembleIcon} alt="ensemble icon" className="self-end opacity-20" />
			</div>

			<h4 className="font-body text-xl font-bold text-blue-800 p-4">{post.title}</h4>

			<div onClick={handleNavigate} className="flex flex-row justify-between px-4 pb-4">
				<h5 className="font-header text-xl text-blue font-bold">{post.instrument?.name}</h5>
				<p className="font-body text-md text-gray-800 font-bold">
					Erfaring
					<span className="text-white bg-blue-800 p-2 rounded-xl ml-2">{post.instrument?.level}+</span>
				</p>
			</div>
		</article>
	);
}
