import { useNavigate, useLocation } from '@tanstack/react-router';
import EnsembleIcon from '../assets/ensemble-icon.png';
import EnsemblePortrait from '../assets/ensemble-portrait.jpeg';
import { Post } from '../types/types';
import { Button } from '../components/elements/Button';
import MusicianPortrait from '../assets/musician-portrait.jpg';
import MusicianIcon from '../assets/musiker-icon.png';

export function PostCard({ post }: { post: Post }) {
	const navigate = useNavigate();
	const location = useLocation();

	const handleNavigate = () => {
		navigate({ to: `/posts/${post._id}` });
	};

	const navigateProfile = (e: React.MouseEvent) => {
		e.stopPropagation(); // Stop the event from bubbling up to the card's click event
		navigate({ to: `/user/${post.author._id}` });
	};

	return (
		<article onClick={handleNavigate} className="border-2 border-gray-400 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
			<div className="flex flex-row gap-4 justify-between bg-gray-200 p-4 px-4 relative">
				<img src={post.ensemble ? EnsemblePortrait : MusicianPortrait} alt="propic" className="w-[50px] h-[50px] object-cover rounded-lg" />

				<div className="grow">
					{post.ensemble ? (
						// Ensemble card
						<>
							<h3 className="font-body font-bold text-red">{post.ensemble.name}</h3>
							<p className="text-gray-800 whitespace-nowrap">
								<span className="font-body text-sm font-bold pr-2">{post.ensemble.address}</span>•{' '}
								<span className="font-body text-sm pl-2">{post.ensemble.activeMembers} musikere</span>
							</p>
						</>
					) : (
						// Musician card
						<div className="flex justify-between items-center">
							<div>
								<h3 className="font-body font-bold text-red">{post.author.name}</h3>
								<p className="text-gray-800">
									<span className="font-body text-sm font-bold pr-2">{post.author.address}</span>
								</p>
							</div>

							{location.pathname !== `/user/${post.author._id}` && location.pathname !== '/profile' ? (
								<Button variant="tertiary" onClick={(e) => navigateProfile(e)}>
									See profile
								</Button>
							) : (
								<img src={MusicianIcon} alt="musician icon" className="self-end opacity-20 absolute bottom-2 right-4" />
							)}
						</div>
					)}
				</div>

				{/* Render icon only for ensembles */}
				{post.ensemble && <img src={EnsembleIcon} alt="ensemble icon" className="self-end opacity-20 absolute bottom-2 right-4" />}
			</div>

			<h4 className="font-body text-lg font-bold text-blue-800 p-4">{post.title}</h4>

			<div className="flex flex-row justify-between px-4 pb-4">
				<h5 className="font-header text-xl text-blue-800 font-bold">{post.instrument?.name}</h5>
				<p className="font-body text-md text-gray-800 font-semibold">
					Erfaring
					<span className="text-white bg-blue-800 p-2 rounded-xl ml-2">{post.instrument?.level}+</span>
				</p>
			</div>
		</article>
	);
}
