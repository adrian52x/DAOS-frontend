import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { Tag } from '../components/Tag';
import { TagFilter } from '../components/Tag-Filter';
import { PrimaryCTA } from '../components/PrimaryCTA';
import { ReviewCard } from '../components/ReviewCard';
import { PostCardEnsemble } from '../components/PostCard';

export const Route = createFileRoute('/react')({
	component: React,
});

function React() {
	return (
		<>
			<div className="p-10">
				<p className="font-header font-bold py-3 text-red">Button - Primary, Secondary, Tertiary</p>
				<div className="flex items-center gap-2">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="tertiary">Tertiaryyy</Button>
				</div>

				<p className="font-header font-bold py-3 text-red">Multi-select chip</p>
				<Chip>Chip-text</Chip>

				<p className="font-header font-bold py-3 text-red">Filter tag</p>
				<div className="flex items-center gap-2">
					<Tag>Tag-active</Tag>
					<Tag variant="passive">Tag-passiveeee</Tag>
				</div>

				<p className="font-header font-bold py-3 text-red">TagFilter Component</p>
				<TagFilter filters={['filter onee', 'filter twoo', 'filter three']} />

				<p className="font-header font-bold py-3 text-red">DropdownMenu</p>
				<PrimaryCTA></PrimaryCTA>

				<p className="font-header font-bold py-3 text-red">Review Card</p>
				<ReviewCard></ReviewCard>

				<p className="font-header font-bold py-3 text-red">Post Card</p>
				<PostCardEnsemble></PostCardEnsemble>
			</div>
		</>
	);
}
