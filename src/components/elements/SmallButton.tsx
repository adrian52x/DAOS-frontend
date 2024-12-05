import { ReactNode } from '@tanstack/react-router';

type SmallButton = {
	children: ReactNode;
	onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

//destructuring the props we have for ease of use
export function SmallButton({ children, onClick, ...rest }: SmallButton) {
	return (
		<button
			className="flex items-center font-body font-semibold text-blue-600 border-solid border-2 rounded-md border-gray-600 text-xs p-1 px-3 bg-white shadow mb-4 hover:bg-blue-600 hover:text-white hover:border-blue-600"
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	);
}
