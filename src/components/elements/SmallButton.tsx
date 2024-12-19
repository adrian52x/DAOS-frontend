import { useRouter } from '@tanstack/react-router';
import { Button } from './Button';

//destructuring the props we have for ease of use
export function SmallButton() {
	const router = useRouter();

	const onClick = () => {
		// Navigate back to the previous page
		router.history.back();
	};

	return (
		<Button variant="tertiary" onClick={onClick}>
			Go back
		</Button>
	);
}
