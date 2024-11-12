import { ReactNode } from "@tanstack/react-router";

type TagProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "active" | "passive"; //ithe variant is optional cause the active is gonna be the default one
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

//destructuring the props we have for ease of use
export function Tag({
  children,
  onClick,
  variant = "active",
  ...rest
}: TagProps) {
  const baseStyles =
    "flex items-center font-body font-semibold text-xs p-2 px-4 rounded-full";
  const variantStyles =
    variant === "active"
      ? "text-white bg-blue-800"
      : "text-blue-800 bg-gray-400";

  return (
    <button
      className={`${baseStyles} ${variantStyles}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
