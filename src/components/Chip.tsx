import { ReactNode } from "react";

/**
 * Chip Component
 *
 * Props:
 * - `children` (ReactNode): The content displayed inside the chip, such as a label or tag name.
 * - `onClick` (optional) (function): Function triggered when the chip is clicked.
 * - Additional button props like `disabled` can be passed via `props`.
 *
 * Example usage:
 * <Chip onClick={() => handleDelete()}>Chip Text</Chip>
 * <Chip>Read Only Chip</Chip>
 *
 */

type ChipProps = {
  children: ReactNode;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Chip({ children, onClick, ...rest }: ChipProps) {
  return (
    <button
      className="flex items-center gap-x-2 font-body font-semibold text-xs bg-blue-800 hover:bg-blue-600 text-white p-1 px-3 rounded shadow-sm"
      onClick={onClick}
      {...rest}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
