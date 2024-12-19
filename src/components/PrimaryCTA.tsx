import { useState } from 'react';
import { Dropdown } from './Dropdown';
import { Button } from './elements/Button';
import { instrumentsList } from '../types/data';
import { Link } from '@tanstack/react-router';

export function PrimaryCTA() {

	// Local state to track the selected instrument
	const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);

	// Handle dropdown value change
	const handleDropdownChange = (value: string) => {
		setSelectedInstrument(value);
		// Optional: Log or take any other action on the selected value
		console.log('Selected instrument:', value);
	};

	return (
		<div className=" hidden sm:flex justify-between flex-row gap-4 whitespace-nowrap">
			<Dropdown options={instrumentsList} placeholder="Select instrument" value={selectedInstrument} onChange={handleDropdownChange} />
			<Link to={selectedInstrument ? "/posts" : ""} search={selectedInstrument ? { instrument: selectedInstrument } : {}}>
				<Button>See post</Button>
			</Link>
		</div>
	);
}
