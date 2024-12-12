import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Ensemble, EnsembleDataUpdate } from '../../types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InputField } from '../../components/elements/InputField';
import { Button } from '../../components/elements/Button';
import styles from '/src/styles/globalStyles.module.css';

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
	const cachedEnsemble = queryClient.getQueryData<Ensemble>(['ensemble']);
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
			//I wasn't sure how to add this request to the apis page, cause of the cashed ensemble - i get it from here
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
			queryClient.invalidateQueries({ queryKey: ['ensemble'] });
			navigate({ to: `/ensembles/${cachedEnsemble._id}` });
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const updatedData: EnsembleDataUpdate = { name, address, zipCode, activeMembers };
		console.log('Submitting Updated Data:', updatedData);

		updateEnsemble.mutate(updatedData);
	};

	return (
		<div className={styles.grayBackground}>
			<form onSubmit={handleSubmit} className={styles.sectionWrapper}>
				<h1 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl ">Edit Ensemble</h1>

				<InputField
					label="Ensemble Name"
					placeholder="Enter ensemble name"
					value={name} // Placeholder for now
					onChange={(e) => setName(e.target.value)}
					name="name"
					required={true}
				/>

				<InputField
					label="Address"
					placeholder="Enter address"
					value={address} // Placeholder for now
					onChange={(e) => setAddress(e.target.value)}
					name="address"
					required={true}
				/>

				<InputField
					label="Zip Code"
					placeholder="Enter zip code"
					value={zipCode} // Placeholder for now
					onChange={(e) => setZipCode(e.target.value)}
					name="zipCode"
					required={true}
				/>

				<InputField
					label="Active Members"
					placeholder="Number of active members"
					value={activeMembers} // Placeholder for now
					onChange={(e) => setActiveMembers(e.target.value)}
					name="activeMembers"
					required={true}
				/>

				<Button type="submit" variant="primary">
					Save Changes
				</Button>
			</form>
		</div>
	);
}
