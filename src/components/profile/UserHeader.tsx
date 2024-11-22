import { Link } from '@tanstack/react-router';
import { Button } from '../Button';

export function UserHeader({ user }: { user: any }) {
	const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="bg-white shadow rounded-lg p-6 space-y-6">
			<div className="flex items-center space-x-6">
				<img src={user.img} alt={user.img} className="w-16 h-16" />
				<div>
					<h1 className="text-2xl font-bold">{user.name}</h1>
					<p className="text-muted-foreground">Member since: {memberSince}</p>
				</div>
			</div>
			<Link to="/profile/update">
				<Button variant="tertiary">Update profile</Button>
			</Link>
		</div>
	);
}
