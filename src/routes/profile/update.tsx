import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { useEffect, useState } from 'react';
import { fetchUserData } from '../../auth/utils';

export const Route = createFileRoute('/profile/update')({
	component: ProfileUpdate,
});

function ProfileUpdate() {
	const { user, setUser, loading, token } = useAuth();

	const [name, setName] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [zipCode, setZipcode] = useState('');
	const [profileText, setProfileText] = useState('');


	useEffect(() => {
		if (user) {
			setName(user.name || '');
			setPhone(user.phone || '');
			setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '');
			setProfileText(user.profileText || '');
			setAddress(user.address || '');
			setZipcode(user.zipCode || '');
		}
	}, [user]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const userData = {
			name,
			dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
			phone,
			address,
			zipCode,
			profileText,
		};

		console.log('userData', userData);
		
		try {
			const response = await fetch('http://localhost:3000/api/users', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(userData),
				credentials: 'include',
			});
			const data = await response.json();
			if (response.ok) {
				alert('User updated successfully');
				if (token) {
					setUser(await fetchUserData(token));
				}
			} else {
				alert(`Error: ${data.message}`);
			}
		} catch (error) {
			console.error('Error updating user:', error);
			alert('Error updating user');
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Update Profile</h1>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="flex items-center space-x-6">
					<div className="shrink-0">
						<img src="/img" alt="/img" className="w-16 h-16" />
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
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					/>
				</div> 

				<div>
					<label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
						Date of Birth
					</label>
					<input
						type="date"
						id="dateOfBirth"
						name="dateOfBirth"
						value={dateOfBirth}
						onChange={(e) => setDateOfBirth(e.target.value)}
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
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
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
						value={address}
						onChange={(e) => setAddress(e.target.value)}
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
						value={zipCode}
						onChange={(e) => setZipcode(e.target.value)}
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
						value={profileText}
						onChange={(e) => setProfileText(e.target.value)}
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
