import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Ensemble, EnsembleDataUpdate } from '../../types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InputField } from '../../components/elements/InputField';
import { Button } from '../../components/elements/Button';

export const Route = createFileRoute('/ensembles/edit')({
	component: EditEnsemblePage,
});

export function EditEnsemblePage() {
	const { token } = useAuth();
	const navigate = Route.useNavigate();
	// const { ensembleId } = Route.useParams<{ ensembleId: string }>(); // Extract ensembleId from route params
	const queryClient = useQueryClient(); // Initialize Query Client
	// console.log('Rendering EnsembleUpdatePage for ensembleId:', ensembleId);

	// Get cached data directly from React Query
	const cachedEnsemble = queryClient.getQueryData<Ensemble>(['current-ensemble']);
	console.log('Cached Ensemble Data in Edit Pageeeee:', cachedEnsemble);

	if (!cachedEnsemble) {
		console.error('No cached ensemble data found!');
		return null;
	}

	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [activeMembers, setActiveMembers] = useState('');

	// Use cached data to populate the form
	useEffect(() => {
		if (cachedEnsemble) {
			setName(cachedEnsemble.name || '');
			setAddress(cachedEnsemble.address || '');
			setZipCode(cachedEnsemble.zipCode || '');
			setActiveMembers(cachedEnsemble.activeMembers || '');
		}
	}, [cachedEnsemble]);

	const updateEnsemble = useMutation<EnsembleDataUpdate, Error, EnsembleDataUpdate>({
		mutationFn: async (updatedData: EnsembleDataUpdate) => {
			if (!cachedEnsemble) {
				throw new Error('No cached ensemble data available!');
			}
			const response = await fetch(`http://localhost:3000/api/ensembles/edit/${cachedEnsemble._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updatedData),
			});
			console.log('Update Response Statusssss:', response.status); // Log the status code

			if (!response.ok) {
				throw new Error('Failed to update ensemble');
			}
			return response.json();
		},
		onSuccess: () => {
			if (cachedEnsemble) {
				console.log('Update successful!!!!! Redirecting to ensemble details...');
				queryClient.invalidateQueries({ queryKey: ['current-ensemble'] });
				navigate({ to: `/ensembles/${cachedEnsemble._id}` });
			} else {
				console.error('Cached ensemble data is missing, cannot navigate.');
			}
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const updatedData: EnsembleDataUpdate = { name, address, zipCode, activeMembers };
		console.log('Submitting Updated Data:', updatedData);

		updateEnsemble.mutate(updatedData);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Edit Ensemble</h1>

			<form className="space-y-6" onSubmit={handleSubmit}>
				{/* Input for Ensemble Name */}
				<InputField
					label="Ensemble Name"
					placeholder="Enter ensemble name"
					value={name} // Placeholder for now
					onChange={(e) => setName(e.target.value)}
					name="name"
					required={true}
				/>

				{/* Input for Address */}
				<InputField
					label="Address"
					placeholder="Enter address"
					value={address} // Placeholder for now
					onChange={(e) => setAddress(e.target.value)}
					name="address"
					required={true}
				/>

				{/* Input for Zip Code */}
				<InputField
					label="Zip Code"
					placeholder="Enter zip code"
					value={zipCode} // Placeholder for now
					onChange={(e) => setZipCode(e.target.value)}
					name="zipCode"
					required={true}
				/>

				{/* Input for Active Members */}
				<InputField
					label="Active Members"
					placeholder="Number of active members"
					value={activeMembers} // Placeholder for now
					onChange={(e) => setActiveMembers(e.target.value)}
					name="activeMembers"
					required={true}
				/>

				{/* Submit Button */}
				<Button type="submit" variant="primary">
					Save Changes
				</Button>
			</form>
		</div>
	);
}
