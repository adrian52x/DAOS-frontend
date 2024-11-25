import { useState } from 'react';
import { Tag } from './Tag';

// Define the props type
type TagFilterProps = {
	filters: string[];
};

export function TagFilter({ filters }: TagFilterProps) {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	return (
		<div className="flex items-center gap-2">
			{filters.map((filter, index) => (
				<Tag key={index} onClick={() => setActiveIndex(index)} variant={index === activeIndex ? 'active' : 'passive'}>
					{filter}
				</Tag>
			))}
		</div>
	);
}

// When implementing the tagfilter and dynamically filtering the displayed data:
//
// - Filter UI (TagFilter) only handles which filter is selected.
// - Custom hook handles logic and state management.
// - Page component only integrates everything together
