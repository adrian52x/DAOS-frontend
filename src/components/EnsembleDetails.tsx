import { EnsembleById } from '../types/types';

const EnsembleDetails = ({ ensemble }: { ensemble: EnsembleById }) => {

	return (
		<div className="p-6 max-w-4xl mx-auto bg-gray-200 border border-gray-600 rounded-lg shadow-md">
			{/* Title Section */}
			<h1 className="text-3xl font-header text-blue-800 mb-2">{ensemble.name}</h1>

			{/* Owner Info */}
			<div className="flex items-center bg-white border border-gray-600 rounded-lg p-4 shadow-sm mt-6">
				<div>
					<h2 className="font-header text-lg text-black">Owner: {ensemble.owner.name}</h2>
				</div>
			</div>

			{/* Address Section */}
			<div className="mt-8">
				<h2 className="text-2xl font-header text-blue-800 mb-4">Address</h2>
				<p className="text-base font-body text-gray-800 leading-relaxed">
					{ensemble.address}, {ensemble.zipCode}
				</p>
			</div>

			{/* Active Members Section */}
			<div className="bg-white border border-gray-600 rounded-lg p-4 shadow-sm mt-8">
				<h3 className="text-xl font-header text-blue-800 mb-2">Active Members</h3>
				<p className="text-lg text-black font-body mb-1">{ensemble.activeMembers}</p>
			</div>

			{/* Members List */}
			<div className="bg-white border border-gray-600 rounded-lg p-4 shadow-sm mt-8">
				<h3 className="text-xl font-header text-blue-800 mb-2">Members</h3>
				{ensemble.members?.length > 0 ? (
					<ul>
						{ensemble.members.map((member, index) => (
							<li key={index} className="text-base text-gray-800 font-body leading-relaxed">
								{member}
							</li>
						))}
					</ul>
				) : (
					<p className="text-base text-gray-800 font-body leading-relaxed">No members yet</p>
				)}
			</div>
		</div>
	);
};

export default EnsembleDetails;
