import { useNavigate } from '@tanstack/react-router';
import EnsembleIcon from '../assets/ensemble-icon.png';
import EnsemblePortrait from '../assets/ensemble-portrait.jpeg';
import { Ensemble } from '../types/types';

export function EnsembleCard({ ensemble, user }: { ensemble: Ensemble; user: any }) {
	const navigate = useNavigate(); //how does this hook work

	const handleNavigate = () => {
		navigate({ to: `/ensembles/${ensemble._id}` });
	};

	return (
		<article
			onClick={handleNavigate}
			className="border-2 border-gray-400 bg-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer h-[106px] relative flex items-center p-4 gap-4"
		>
			{/* Left - photo */}
			<img src={EnsemblePortrait} alt="propic" className="w-[50px] h-[50px] object-cover rounded-lg flex-shrink-0" />

			{/* Middle */}
			<div className="grow overflow-hidden">
				<div className="flex items-center">
					{ensemble.owner === user._id && <span className="pr-2">⭐</span>}
					<h3 className="font-body font-bold text-red overflow-hidden text-ellipsis whitespace-nowrap">{ensemble.name}</h3>
				</div>

				<p className="text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap">
					<span className="font-body text-sm font-bold pr-2">{ensemble.address}</span>•<span className="font-body text-sm pl-2">{ensemble.activeMembers} musicians</span>
				</p>
			</div>

			{/* Right - ens icon */}
			<img src={EnsembleIcon} alt="ensemble icon" className="opacity-20 w-[50px] h-[50px] flex-shrink-0" />
		</article>
	);
}
