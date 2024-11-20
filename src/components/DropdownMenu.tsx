import { useState } from "react";

type DropdownProps = {
  options: string[]; // List of dropdown options
  placeholder?: string; // Optional placeholder text
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Vælg instrument",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between border rounded-lg px-4 py-2 font-body text-gray-800 focus:outline-none shadow-sm"
      >
        <span>{selected || placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          } text-red-500`}
          viewBox="0 0 20 20"
          fill="red"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.586l3.71-3.356a.75.75 0 111.02 1.1l-4 3.625a.75.75 0 01-1.02 0l-4-3.625a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute mt-2 w-full border rounded-lg bg-white shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-body text-gray-800"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
