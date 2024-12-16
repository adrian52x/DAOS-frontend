import { Tag } from './Tag';

// Define the props type
type TagFilterProps = {
  filters: string[];
  activePostType: string;
  setActivePostType: (tag: string) => void;
};

export function TagFilter({ filters, activePostType, setActivePostType }: TagFilterProps) {
  return (
    <div className="flex items-center gap-2">
      {filters.map((filter) => (
        <Tag key={filter} onClick={() => setActivePostType(filter)} variant={filter === activePostType ? 'active' : 'passive'}>
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
