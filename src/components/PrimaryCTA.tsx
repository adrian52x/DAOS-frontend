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
		<div className=" hidden sm:flex flex-row gap-4">
			<Dropdown options={instrumentsList} placeholder="Vælg instrument" value={selectedInstrument} onChange={handleDropdownChange} />
			<Link to={selectedInstrument ? "/posts" : ""} search={selectedInstrument ? { instrument: selectedInstrument } : {}}>
				<Button>Se opslag</Button>
			</Link>
		</div>
	);
}
