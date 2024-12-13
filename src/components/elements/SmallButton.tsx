import { useNavigate } from '@tanstack/react-router';
import { Button } from './Button';

//destructuring the props we have for ease of use
export function SmallButton() {
	const navigate = useNavigate();

	const onClick = () => {
		// Navigate back to the previous page
		navigate({ to: '..', replace: true });
	};

	return (
		<Button variant="tertiary" onClick={onClick}>
			Bo back
		</Button>
	);
}
