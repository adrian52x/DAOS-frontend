import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { useEffect, useState } from 'react';
import { UserDataUpdate } from '../../types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../../utils/api';
import { Button } from '../../components/elements/Button';
import styles from '/src/styles/globalStyles.module.css';
import { InputField } from '../../components/elements/InputField';
import { TextArea } from '../../components/elements/TextArea';

export const Route = createFileRoute('/profile/update')({
	component: ProfileUpdate,
});

function ProfileUpdate() {
	const queryClient = useQueryClient();
	const navigate = Route.useNavigate();

	const { user, loading, token } = useAuth();

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

	const updateUserData = useMutation({
		mutationFn: (userData: UserDataUpdate) => updateUser(token, userData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['current-user'] });
			navigate({ to: '/profile' });
		},
	});

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

		// Update user data
		updateUserData.mutateAsync(userData);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	return (
		<div className={styles.grayBackground}>
			<form onSubmit={handleSubmit} className={styles.formSectionWrapper}>
				<h1 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl ">Update Profile</h1>

				<div className="flex items-center space-x-6">
					<div className="shrink-0">
						<img src="/src/assets/profile-ph-default.svg" alt="/img" className="w-16 h-16" />
					</div>
					<label className="block">
						<span className="sr-only">Choose profile photo</span>
						<input
							type="file"
							className="block text-sm text-slate-500 file:font-body file:font-semibold file:text-blue-800 file:bg-white file:border file:border-gray-600 file:hover:bg-gray-200 file:flex sfile:items-center file:text-xs file:p-1 file:px-3 file:rounded file:cursor-pointer file:shadow-md"
						/>
					</label>
				</div>

				<InputField type="text" label="Name" value={name} onChange={(e) => setName(e.target.value)} name="name" />

				<InputField type="email" label="Email" value={user?.email || ''} onChange={(e) => setName(e.target.value)} disabled={true} name="email" />

				<InputField type="date" label="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} name="dateOfBirth" />

				<InputField type="tel" label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" />

				<InputField type="text" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} name="address" />

				<InputField type="text" label="Zip Code" value={zipCode} onChange={(e) => setZipcode(e.target.value)} name="zipcode" />

				<TextArea
					label="About you"
					placeholder="Tell something about yourself! How did you get into music?"
					value={profileText}
					onChange={(e) => setProfileText(e.target.value)}
					name="profileText"
				/>

				<div>
					<Button type="submit" variant="primary">
						Update Profile
					</Button>
				</div>
			</form>
		</div>
	);
}
