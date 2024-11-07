// src/components/Button.tsx

interface ButtonWhiteProps {
  buttonText: string;
  onClick: () => void;
}

export default function ButtonWhite({ buttonText, onClick }: ButtonWhiteProps) {
  return (
    <button
      className="font-body font-semibold text-sm text-blue bg-white border border-gray-600 hover:bg-gray-200 p-3 px-20 rounded-xl shadow-md"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
