import { Link } from '@tanstack/react-router';
import { Button } from '../elements/Button';

export function UserHeader({ user }: { user: any }) {
	const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center space-x-6">
				<img
					src={user.img ? user.img : '/src/assets/profile-ph-default.svg'}
					alt={user.img}
					className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-4 border-white shadow-lg"
				/>
				<div>
					<h1 className="text-3xl font-header text-red font-bold">{user.name}</h1>
					<p className="text-gray-800 font-body">Member since: {memberSince}</p>
				</div>
			</div>

			<div className="flex items-center space-x-5">
				<Link to="/profile/update">
					<div className="block sm:hidden">
						<Button variant="tertiary">Update profile</Button>
					</div>
					<div className="hidden sm:block">
						<Button variant="secondary">Update profile</Button>
					</div>
				</Link>
				<div className="block sm:hidden">
					<Button variant="tertiary">Settings</Button>
				</div>
				<div className="hidden sm:block">
					<Button variant="secondary">Settings</Button>
				</div>{' '}
			</div>
		</div>
	);
}
