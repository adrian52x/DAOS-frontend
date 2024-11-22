import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { FormEvent, useState } from 'react';

export const Route = createFileRoute('/profile/update')({
	component: ProfileUpdate,
});

function ProfileUpdate() {
	const { user } = useAuth();
	const [userData, setUserData] = useState(user);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setUserData((prevData: any) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// Here you would typically send the updated data to your API
		console.log('Updated user data:', userData);
		// Add API call here
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Update Profile</h1>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="flex items-center space-x-6">
					<div className="shrink-0">
						<img src={user.img} alt={user.img} className="w-16 h-16" />
					</div>
					<label className="block">
						<span className="sr-only">Choose profile photo</span>
						<input
							type="file"
							className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                  "
						/>
					</label>
				</div>

				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-700">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={userData.name}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</div>

				<div>
					<label htmlFor="phone" className="block text-sm font-medium text-gray-700">
						Phone Number
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={userData.phone}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</div>

				<div>
					<label htmlFor="address" className="block text-sm font-medium text-gray-700">
						Address
					</label>
					<input
						type="text"
						id="address"
						name="address"
						value={userData.address}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</div>

				<div>
					<label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
						Zip Code
					</label>
					<input
						type="text"
						id="zipcode"
						name="zipcode"
						value={userData.zipcode}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</div>

				<div>
					<label htmlFor="profileText" className="block text-sm font-medium text-gray-700">
						Profile Text
					</label>
					<textarea
						id="profileText"
						name="profileText"
						value={userData.profileText}
						onChange={handleChange}
						rows={4}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					></textarea>
				</div>

				<div>
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Update Profile
					</button>
				</div>
			</form>
		</div>
	);
}
