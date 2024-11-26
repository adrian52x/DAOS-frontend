import { useAuth } from '../auth/AuthContext';
import { EnsembleById, JoinRequestAction } from '../types/types';

const EnsembleDetails = ({ ensemble }: { ensemble: EnsembleById }) => {
	const { user, token } = useAuth();

	async function handleJoinRequest(action: JoinRequestAction, userId: string) {
		try {
			const response = await fetch(`http://localhost:3000/api/ensembles/${ensemble._id}/handle-request/${userId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ action }),
				credentials: 'include',
			});
			const data = await response.json();
			
			if (response.ok) {
				alert('Request handled successfully');
				console.log(data);
			} else {
				alert(`Error: ${data.message}`);
			}
		} catch (error) {
			console.error('Error handling join request:', error);
		}
	}

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
			
			{user && user._id === ensemble.owner._id && (
				// {/* Pending Requests */}
				<div className="bg-white border border-gray-600 rounded-lg p-4 shadow-sm mt-8">
					<h3 className="text-xl font-header text-blue-800 mb-2">Pending Requests</h3>
					{ensemble.pendingRequests?.length > 0 ? (
						<ul>
							{ensemble.pendingRequests.map((userId, index) => (
								<div key={index}>
									<li className="text-base text-gray-800 font-body leading-relaxed">
										{userId} 
									</li>
									<div className="flex space-x-6">
									<button onClick={() => handleJoinRequest(JoinRequestAction.ACCEPT, userId)}>Accept</button>
									<button onClick={() => handleJoinRequest(JoinRequestAction.REJECT, userId)}>Reject</button>
									</div>
								
								</div>
							))}
						</ul>
					) : (
						<p className="text-base text-gray-800 font-body leading-relaxed">No pending requests</p>
					)}
				</div>
			)}
		</div>
	);
};

export default EnsembleDetails;
