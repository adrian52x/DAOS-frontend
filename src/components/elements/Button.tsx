// src/components/Button.tsx
import { ReactNode } from 'react';

type ButtonProps = {
	children: ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	variant?: 'primary' | 'secondary' | 'tertiary'; // Variant is optional because primary is the default one
	disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, onClick, variant = 'primary', disabled, ...rest }: ButtonProps) {
	const baseStyles = 'font-body font-semibold text-sm shadow-md';
	const variantStyles =
		variant === 'primary'
			? 'text-white bg-blue-800 hover:bg-blue-600 p-3 px-10 rounded-xl'
			: variant === 'secondary'
				? 'text-blue-800 bg-white border border-gray-600 hover:bg-gray-200 p-3 px-10 rounded-xl'
				: 'flex items-center text-xs p-1 px-3 text-blue-800 bg-white border border-gray-600 hover:bg-gray-200 p-1 px-3 rounded';
	const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

	return (
		<button
			className={`${baseStyles} ${variantStyles} ${disabledStyle}`}
			onClick={onClick}
			{...rest} // Spread additional props like `disabled`, `type`, etc.
		>
			{children}
		</button>
	);
}
