// src/components/Button.tsx

interface ButtonBlueProps {
  buttonText: string;
  onClick?: () => void;
}

export default function ButtonBlue({ buttonText, onClick }: ButtonBlueProps) {
  return (
    <button
      className="font-body font-semibold text-sm text-white bg-blue-800 hover:bg-blue-600 p-3 px-20 rounded-xl shadow-md "
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
