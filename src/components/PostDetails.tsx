import React from 'react';
import { JoinRequestAction, Post } from '../types/types';
import EnsemblePortrait from '../assets/ensemble-portrait.jpeg';
import { useAuth } from '../auth/AuthContext';
import { handleJoin, handleJoinRequest } from '../utils/api';
import { formatDate, formatTime } from '../utils/dateAndTimeUtils';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchUserById } from '../utils/api';

interface PostDetailsProps {
	postData: Post;
}
const PostDetails: React.FC<PostDetailsProps> = ({ postData }) => {
	const { user, token } = useAuth();
	const navigate = useNavigate();

	const navigateProfile = (userId: any) => {
		navigate({ to: `/user/${userId}` });
	};

	if (!postData) {
		return <p>Loading...</p>;
	}

	console.log('postData', postData);

	const formattedTime = formatTime(postData.createdAt);
	const formattedDate = formatDate(postData.createdAt);

	return (
		<div className="p-6 max-w-4xl mx-auto bg-gray-50 border border-gray-300 rounded-lg shadow-md">
			{/* Title Section */}
			<h1 className="text-3xl font-bold text-blue-800 mb-2">{postData.title}</h1>
			<p className="text-sm text-gray-800">{`${formattedDate} at ${formattedTime}`}</p>

			{/* Ensemble Info */}
			{postData.ensemble ? (
				<div className="flex items-center bg-white border border-gray-300 rounded-lg p-4 shadow-sm mt-6">
					<img src={EnsemblePortrait} alt={postData.ensemble.name} className="rounded-lg w-16 h-16 object-cover" />
					<div className="ml-4">
						<h2 className="font-bold text-lg text-red-800">{postData.ensemble.name}</h2>
						<p className="text-gray-700 text-sm">
							{postData.ensemble.address} • {postData.ensemble.activeMembers}
						</p>
					</div>
				</div>
			) : (
				// User info
				<div className="flex items-center bg-white border border-gray-300 rounded-lg p-4 shadow-sm mt-6">
					<div className="ml-4">
						<h2 className="font-bold text-lg text-red-800">{postData.author.name}</h2>
						<h2 className="font-bold text-lg text-red-800">{postData.author.address}</h2>
					</div>
				</div>
			)}
			{/* Edit Button - we need to have that only when you are the owner of the post */}
			{user && user._id === postData.author._id && (
				<div className="flex justify-center mt-6">
					<button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700">Edit post</button>
				</div>
			)}

			{/* Description Section */}
			<div className="mt-8">
				<h2 className="text-2xl font-bold text-blue-800 mb-4">Description</h2>
				<p className="text-base text-gray-800 leading-relaxed">{postData.description}</p>
			</div>

			{/* Instrument Section */}
			<div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mt-8">
				<h3 className="text-xl font-bold text-blue-800 mb-2">Minimum level</h3>
				<p className="text-lg text-black mb-1">Level {postData.instrument.level}</p>
				<p className="text-base text-gray-800">A musician who has been playing for 4-6 years and can play to slightly more complex notes.</p>
			</div>
			{/* Genres Section */}
			<div className="mt-8">
				<h3 className="text-xl font-bold text-blue-800 mb-2">Genre</h3>
				<div className="flex gap-2">
					{/* Display genres as tags */}
					<span className="bg-gray-200 text-blue-800 text-sm font-bold px-3 py-1 rounded-md shadow-sm">{postData.instrument.genre}</span>
				</div>
			</div>
			{/* Contact Button - is not doing anything */}

			{postData.ensemble ? (
				user && user._id === postData.ensemble?.owner ? (
					// {/* Pending Requests */}
					<div className="bg-white border border-gray-600 rounded-lg p-4 shadow-sm mt-8">
						<h3 className="text-xl font-header text-blue-800 mb-2">Pending Requests</h3>
						{postData.ensemble.pendingRequests?.length > 0 ? (
							<ul>
								{postData.ensemble.pendingRequests.map((userId, index) => {
									// Use React Query to fetch user data for each userId
									const {
										data: userData,
										isLoading,
										isError,
									} = useQuery({
										queryKey: ['user', userId],
										queryFn: () => fetchUserById(userId),
										enabled: !!userId, // Only fetch when userId is truthy
									});

									if (isLoading) {
										// Display a loading state for each user
										return (
											<li key={index} className="text-gray-500">
												Loading user details...
											</li>
										);
									}

									if (isError || !userData) {
										// Display an error message for failed fetches
										return (
											<li key={index} className="text-red-500">
												Failed to load user data.
											</li>
										);
									}

									// Render user details when data is available
									return (
										<li key={index} className="flex justify-between items-center py-4 border-b-solid border-t-2">
											<div>
												<a
													target="_blank"
													className="font-body font-normal text-blue-800 underline cursor-pointer capitalize hover:font-semibold"
													onClick={() => navigateProfile(userId)}
												>
													{userData.name} {/* Display user's name */}
												</a>
											</div>
											<div className="flex space-x-6">
												<button
													className="text-white bg-green p-1 px-4 rounded-full hover:opacity-50"
													onClick={() => handleJoinRequest(JoinRequestAction.ACCEPT, userId, null, postData.ensemble._id)}
												>
													Accept
												</button>
												<button
													className="text-white bg-red p-1 px-4 rounded-full hover:opacity-50"
													onClick={() => handleJoinRequest(JoinRequestAction.REJECT, userId, null, postData.ensemble._id)}
												>
													Reject
												</button>
											</div>
										</li>
									);
								})}
							</ul>
						) : (
							<div className="flex justify-center mt-8">
								<p>No pending requests</p>
							</div>
						)}
					</div>
				) : (
					<div className="flex justify-center mt-8">
						<button
							onClick={() => handleJoin(token, postData.ensemble._id)}
							className="bg-blue-900 text-white font-bold py-3 px-6 rounded-md shadow-lg hover:bg-blue-700"
							disabled={postData.ensemble?.members.includes(user?._id)}
						>
							Join Ensemble
						</button>
					</div>
				)
			) : (
				<div className="flex justify-center mt-8">
					<button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700">Contact</button>
				</div>
			)}
		</div>
	);
};

export default PostDetails;
