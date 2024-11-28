import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { useState } from 'react';
import { acitveMembersList } from '../../types/data';
import styles from '/src/styles/globalStyles.module.css';
import { InputField } from '../../components/elements/InputField';
import { Button } from '../../components/elements/Button';
import { Dropdown } from '../../components/Dropdown';

export const Route = createFileRoute('/ensembles/create')({
	component: RouteComponent,
});

function RouteComponent() {
	const { user, loading, token } = useAuth();

	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [activeMembers, setActiveMembers] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const ensemble = {
			name,
			address,
			zipCode,
			activeMembers,
		};
		try {
			const response = await fetch('http://localhost:3000/api/ensembles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(ensemble),
				credentials: 'include',
			});
			const data = await response.json();
			if (response.ok) {
				alert('ensemble created successfully');
				console.log('ensemble created:', data);
			} else {
				alert(`Error: ${data.message}`);
			}
		} catch (error) {
			console.error('Error creating ensemble:', error);
			alert('Error creating ensemble');
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	return (
		<div className={styles.grayBackground}>
			<form onSubmit={handleSubmit} className={styles.sectionWrapper}>
				<h2 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl ">Create ensemble</h2>

				<div className={styles.gaps}>
					<InputField label="Name" name="name" placeholder="Enter your username" value={name} onChange={(e) => setName(e.target.value)} required />
					<InputField label="Address" name="address" placeholder="Eensemble address" value={address} onChange={(e) => setAddress(e.target.value)} required />
					<InputField label="Zip Code" name="zipcode" placeholder="****" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
					<Dropdown
						options={acitveMembersList}
						label="Active members"
						placeholder="Select the number of active members"
						value={activeMembers}
						onChange={(value) => setActiveMembers(value)}
					/>
				</div>

				<Button type="submit">Create ensenble</Button>
			</form>
		</div>
	);
}
