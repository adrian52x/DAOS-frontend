// src/components/Button.tsx
import { ReactNode } from "react";

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

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary"; // Variant is optional because primary is the default one
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  onClick,
  variant = "primary",
  ...props // Capture any additional props
}: ButtonProps) {
  const baseStyles =
    "font-body font-semibold text-sm p-3 px-20 rounded-xl shadow-md";
  const variantStyles =
    variant === "primary"
      ? "text-white bg-blue-800 hover:bg-blue-600"
      : "text-blue bg-white border border-gray-600 hover:bg-gray-200";

  return (
    <button
      className={`${baseStyles} ${variantStyles}`}
      onClick={onClick}
      {...props} // Spread additional props like `disabled`, `type`, etc.
    >
      {children}
    </button>
  );
}
