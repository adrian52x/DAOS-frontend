import React from 'react';
import { JoinRequestAction, Post } from '../types/types';
import EnsemblePortrait from '../assets/ensemble-portrait.jpeg';
import { useAuth } from '../auth/AuthContext';
import { handleJoin, handleJoinRequest } from '../utils/api';
import { formatDate } from '../utils/dateAndTimeUtils';
import { Link, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SmallButton } from './elements/SmallButton';
import EnsembleIcon from '../assets/ensemble-icon.png';

interface PostDetailsProps {
	postData: Post;
}
const PostDetails: React.FC<PostDetailsProps> = ({ postData }) => {
	const { user, token } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const navigateProfile = (userId: string) => {
		navigate({ to: `/user/${userId}` });
	};

	const acceptRequest = useMutation({
		mutationFn: (userId: string) => handleJoinRequest(JoinRequestAction.ACCEPT, userId, token, postData.ensemble._id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['post'] });
		},
	});

	const rejectRequest = useMutation({
		mutationFn: (userId: string) => handleJoinRequest(JoinRequestAction.REJECT, userId, token, postData.ensemble._id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['post'] });
		},
	});

	const formattedDate = formatDate(postData.createdAt);

	return (
		<div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] sm:bg-gray-200 py-6 md:px-6 px-4">
			<div className="col-start-2 col-end-3 p-6 px-10 border border-gray-200 shadow-lg bg-white">
				<SmallButton>Back</SmallButton>
				{/* Title Section */}
				<h1 className="font-header text-3xl text-center font-medium text-blue-800 mb-2">{postData.title}</h1>
				<p className="text-sm text-center text-gray-800">{`Post created on ${formattedDate}`}</p>

				{/* Ensemble Info */}
				{postData.ensemble ? (
					<div className="flex flex-row gap-4 justify-between items-center bg-gray-200 p-4 my-4 border border-gray-300 rounded-xl shadow-sm">
						<img src={EnsemblePortrait} alt={postData.ensemble.name} className="w-[50px] h-[50px] object-cover rounded-lg" />

						<div className="grow">
							{postData.ensemble ? (
								<Link to={`/ensembles/${postData.ensemble._id}`}>
									<h3 className="font-body font-bold text-red">{postData.ensemble.name}</h3>
									<p className="text-gray-800 whitespace-nowrap">
										<span className="font-body text-sm font-bold pr-2">{postData.ensemble.address}</span>•{' '}
										<span className="font-body text-sm pl-2">{postData.ensemble.activeMembers} musikere</span>
									</p>
								</Link>
							) : (
								<>
									<h3 className="font-body font-bold text-red">{postData.author.name}</h3>
									<p className="text-gray-800">
										<span className="font-body text-sm font-bold pr-2">{postData.author.address}</span>
									</p>
								</>
							)}
						</div>
						<img src={EnsembleIcon} alt="ensemble icon" className="self-end opacity-20 hidden sm:block" />
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
						<SmallButton>Edit post</SmallButton>
					</div>
				)}

				{/* Description Section */}
				<div className="mb-6">
					<h2 className="text-xl font-bold text-blue-800 mb-4">Description</h2>
					<p className="text-base text-gray-800 leading-relaxed">{postData.description}</p>
				</div>

				<h2 className="text-xl font-bold text-blue-800 mb-4">Minimum level</h2>
				{/* Instrument Section */}
				<div className="bg-gray-200 border border-gray-300 rounded-lg p-4 shadow-sm mb-6">
					<p className="font-header text-lg  font-regular text-blue-800 mb-1">Level {postData.instrument.level}</p>
					<p className="text-base text-gray-800">A musician who has been playing for 4-6 years and can play to slightly more complex notes.</p>
				</div>

				{/* Genres Section */}
				<div className="mb-8">
					<h3 className="text-xl font-bold text-blue-800 mb-4">Genre</h3>
					<div className="flex gap-2">
						{/* Display genres as tags */}
						<span className="bg-gray-400 text-blue-800 text-sm font-bold px-3 py-1 rounded-md shadow-sm">{postData.instrument.genre}</span>
					</div>
				</div>
				{/* Contact Button - is not doing anything */}

				<div className="mt-10">
					{postData.ensemble ? (
						user && user._id === postData.ensemble?.owner ? (
							// {/* Pending Requests */}
							<div className="bg-white border border-gray-600 rounded-lg p-4 shadow-sm mt-8">
								<h3 className="text-xl font-header text-blue-800 mb-2">Pending Requests</h3>
								{postData.ensemble.pendingRequests?.length > 0 ? (
									<ul>
										{postData.ensemble.pendingRequests.map((user, index) => (
											<li key={index} className="flex justify-between items-center py-4 border-b-solid border-t-2">
												<div>
													<a
														target="_blank"
														className="font-body font-normal text-blue-800 underline cursor-pointer capitalize hover:font-semibold"
														onClick={() => navigateProfile(user._id)}
													>
														{user.name} {/* Display user's name */}
													</a>
												</div>
												<div className="flex space-x-6">
													<button
														className="text-white bg-green p-1 px-4 rounded-full hover:opacity-50"
														onClick={() => acceptRequest.mutateAsync(user._id)}
													>
														Accept
													</button>
													<button
														className="text-white bg-red p-1 px-4 rounded-full hover:opacity-50"
														onClick={() => rejectRequest.mutateAsync(user._id)}
													>
														Reject
													</button>
												</div>
											</li>
										))}
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
			</div>
		</div>
	);
};

export default PostDetails;
