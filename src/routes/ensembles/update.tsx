import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { EnsembleById, EnsembleDataUpdate, User } from '../../types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InputField } from '../../components/elements/InputField';
import { Button } from '../../components/elements/Button';
import styles from '/src/styles/globalStyles.module.css';
import { updateEnsembleData } from '../../utils/api';
import { Dropdown } from '../../components/Dropdown';
import { acitveMembersList } from '../../types/data';

export const Route = createFileRoute('/ensembles/update')({
	component: EditEnsemblePage,
});

export function EditEnsemblePage() {
	const { token } = useAuth();
	const navigate = Route.useNavigate();
	const queryClient = useQueryClient(); // So i can use the cached data

	//getting the cached data
	const cachedEnsemble = queryClient.getQueryData<EnsembleById>(['ensemble']);
	if (!cachedEnsemble) {
		console.error('No cached ensemble data found!');
		return null;
	}

	//get the data from the input fields
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [activeMembers, setActiveMembers] = useState('');
	const [members, setMembers] = useState<User[]>([]);

	// populate the fields
	useEffect(() => {
		if (cachedEnsemble) {
			setName(cachedEnsemble.name); // no need for the or operator - we have initial state in the useState
			setAddress(cachedEnsemble.address);
			setZipCode(cachedEnsemble.zipCode);
			setActiveMembers(cachedEnsemble.activeMembers);
			setMembers(cachedEnsemble.members);
		}
	}, [cachedEnsemble]);

	const updateEnsemble = useMutation<EnsembleDataUpdate, Error, EnsembleDataUpdate>({
		mutationFn: async (updatedData: EnsembleDataUpdate) => {
			if (!cachedEnsemble) {
				throw new Error('No cached ensemble data available!');
			}
			return updateEnsembleData(token, cachedEnsemble._id, updatedData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['ensemble'] });
			navigate({ to: `/ensembles/${cachedEnsemble._id}` });
			alert('Ensemble updated successfully!');
		},
		onError: (error) => {
			alert(`Failed to update ensemble: ${error.message}`);
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const updatedData: EnsembleDataUpdate = {
			name,
			address,
			zipCode,
			activeMembers,
			members: members.map((member) => member._id), // Send only IDs to the backend (workaround to get the members info, but not pass it all to the db)
		};

		console.log('Submitting Updated Dataaa:', updatedData);

		updateEnsemble.mutate(updatedData);
	};

	const handleDeleteMember = (memberId: string, memberName: string) => {
		if (confirm(`Are you sure you want to remove "${memberName} from this Ensemble"?`)) {
			try {
				setMembers((members) => members.filter((member) => member._id !== memberId));
			} catch (error: any) {
				alert(`Error: ${error.message}`);
			}
		}
	};

	return (
		<div className={styles.grayBackground}>
			<form onSubmit={handleSubmit} className={styles.formSectionWrapper}>
				<h1 className="font-header text-blue-800 font-medium text-3xl lg:text-4xl ">Edit Ensemble</h1>

				<InputField label="Ensemble Name" placeholder="Enter ensemble name" value={name} onChange={(e) => setName(e.target.value)} name="name" required={true} />

				<InputField label="Address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} name="address" required={true} />

				<InputField label="Zip Code" placeholder="Enter zip code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} name="zipCode" required={true} />

				<Dropdown
					label="Active Members"
					placeholder="Select active members"
					options={acitveMembersList.map((item) => ({ label: item, value: item }))}
					value={activeMembers}
					onChange={(value) => setActiveMembers(value)}
				/>

				<section>
					<h3 className="text-xl font-header text-blue-800 mb-2">Members</h3>
					<ul>
						{members.map((member, index) => (
							<li key={index} className=" flex flex-row gap-2 text-base text-gray-800 font-body leading-relaxed py-2">
								{member.name}
								{member._id !== cachedEnsemble.owner._id && (
									<Button variant="tertiary" onClick={() => handleDeleteMember(member._id, member.name)}>
										x
									</Button>
								)}
							</li>
						))}
					</ul>
				</section>

				<Button type="submit" variant="primary">
					Save Changes
				</Button>
			</form>
		</div>
	);
}
