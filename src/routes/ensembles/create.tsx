import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import { useState } from 'react';

import { acitveMembersList } from '../../types/data';

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
		<div>
			<h1>Create Ensemble</h1> <br />
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						name:
						<input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
					</label>
				</div>
				<div>
					<label>
						address:
						<input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
					</label>
				</div>
				<div>
					<label>
						zipCode:
						<input type="text" name="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
					</label>
				</div>
				<div>
					<label>
						activeMembers:
						<select name="activeMembers" value={activeMembers} onChange={(e) => setActiveMembers(e.target.value)} required>
							<option value="" disabled>
								Select how many active memmbers
							</option>
							{acitveMembersList.map((active) => (
								<option key={active} value={active}>
									{active}
								</option>
							))}
						</select>
					</label>
				</div>

				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
