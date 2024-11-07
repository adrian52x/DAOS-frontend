// src/components/Button.tsx

interface ButtonProps {
  buttonText: string;
  onClick?: () => void;
  variant: "primary" | "secondary";
}

export function Button({
  buttonText,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "font-body font-semibold text-sm p-3 px-20 rounded-xl shadow-md";
  const variantStyles =
    variant === "primary"
      ? "text-white bg-blue-800 hover:bg-blue-600"
      : "text-blue bg-white border border-gray-600 hover:bg-gray-200";

  return (
    <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      {buttonText}
    </button>
  );
}
