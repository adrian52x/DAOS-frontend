import { useNavigate } from '@tanstack/react-router';
import EnsembleIcon from '../assets/ensemble-icon.png';
import EnsemblePortrait from '../assets/ensemble-portrait.jpeg';
import { Ensemble } from '../types/types';
import { useAuth } from '../auth/AuthContext';

export function EnsembleCard({ ensemble }: { ensemble: Ensemble }) {
	const { user } = useAuth();
	const navigate = useNavigate(); //how does this hook work

	const handleNavigate = () => {
		navigate({ to: `/ensembles/${ensemble._id}` });
	};

	return (
		<article onClick={handleNavigate} className="border-2 border-gray-400  bg-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer h-[106px]">
			<div className="flex flex-row gap-4 justify-between items-center p-4">
				{/* Profile Picture */}
				<div className="w-[50px] h-[50px] flex-shrink-0 overflow-hidden self-start">
					<img src={EnsemblePortrait} alt="propic" className="w-full h-full object-cover rounded-lg" />
				</div>

				{/* Content in the Middle */}
				<div className="grow overflow-hidden">
					<h3 className="font-body font-bold text-red overflow-hidden text-ellipsis whitespace-nowrap">{ensemble.name}</h3>
					{ensemble.owner === user._id && <span className="text-yellow-500">⭐ Owner</span>}

					<p className="text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap">
						<span className="font-body text-sm font-bold pr-2">{ensemble.address}</span>•{' '}
						<span className="font-body text-sm pl-2">{ensemble.activeMembers} musikere</span>
					</p>
				</div>

				{/* Ensemble Icon */}
				<img src={EnsembleIcon} alt="ensemble icon" className="self-end opacity-20 w-[50px] h-[50px] flex-shrink-0" />
			</div>
		</article>
	);
}
