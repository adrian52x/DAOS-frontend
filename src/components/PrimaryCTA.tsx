import { useState } from 'react';
import { Dropdown } from './Dropdown';
import { Button } from './elements/Button';

export function PrimaryCTA() {
	const instruments = ['Guitar', 'Piano', 'Drums', 'Violin', 'Flute'];

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
			<Dropdown options={instruments} placeholder="Vælg instrument" value={selectedInstrument} onChange={handleDropdownChange} />
			<Button>Se opslag</Button>
		</div>
	);
}
