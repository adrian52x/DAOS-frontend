// src/components/Button.tsx
import { ReactNode } from 'react';

type ButtonProps = {
	children: ReactNode;
	onClick?: () => void;
	variant?: 'primary' | 'secondary' | 'tertiary'; // Variant is optional because primary is the default one
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
	children,
	onClick,
	variant = 'primary',
	...rest // Capture any additional props
}: ButtonProps) {
	const baseStyles = 'font-body font-semibold text-sm shadow-md';
	const variantStyles =
		variant === 'primary'
			? 'text-white bg-blue-800 hover:bg-blue-600 p-3 px-20 rounded-xl'
			: variant === 'secondary'
				? 'text-blue-800 bg-white border border-gray-600 hover:bg-gray-200 p-3 px-20 rounded-xl'
				: 'flex items-center text-xs p-1 px-3 text-blue-800 bg-white border border-gray-600 hover:bg-gray-200 p-1 px-3 rounded';

	return (
		<button
			className={`${baseStyles} ${variantStyles}`}
			onClick={onClick}
			{...rest} // Spread additional props like `disabled`, `type`, etc.
		>
			{children}
		</button>
	);
}

//if the component has more vvariables the switch statement is more suitable:

// const getVariantStyles = (variant: string) => {
//   switch (variant) {
//     case "primary":
//       return "text-white bg-blue-800 hover:bg-blue-600 p-3 px-20 rounded-xl";
//     case "secondary":
//       return "text-blue-800 bg-white border border-gray-600 hover:bg-gray-200 p-3 px-20 rounded-xl";
//     case "tertiary":
//       return "flex items-center text-xs p-1 px-3 text-blue-800 bg-white border border-gray-600 hover:bg-gray-200 rounded";
//   }

/**
 * Button Component
 *
 * This component renders a styled button with primary and secondary variants.
 *
 * Props:
 * - `children` (ReactNode): The content displayed inside the button, typically text or an icon.
 * - `onClick` (optional) (function): Function triggered when the button is clicked.
 * - `variant` (optional) ("primary" | "secondary"): Specifies the button style.
 *    - "primary" (default): Blue background with white text.
 *    - "secondary": White background with blue text and gray border.
 * - Additional button props can be passed via `props` (e.g., `disabled`, `type`, etc.).
 *
 * Example usage:
 * <Button variant="primary" onClick={() => handlePrimaryClick()}>Primary Button</Button>
 * <Button variant="secondary" onClick={() => handleSecondaryClick()}>Secondary Button</Button>
 * <Button disabled>Disabled Button</Button>
 */
