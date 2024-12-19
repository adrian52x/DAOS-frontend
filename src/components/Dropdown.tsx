import { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

type DropdownProps = {
	options: string[];
	label?: string;
	placeholder?: string;
	value?: string | null;
	onChange?: (value: string) => void;
};

export function Dropdown({ options, label, placeholder, value, onChange }: DropdownProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleSelect = (option: string) => {
		onChange?.(option);
		setIsOpen(false);
	};

	return (
		<div ref={dropdownRef} className="relative w-full">
			{label && <label className="block font-body text-gray-800 mb-1">{label}</label>}
			{/* Dropdown Button */}
			<button
				type="button"
				onClick={toggleDropdown}
				className="w-full flex items-center justify-between border rounded-lg px-4 py-2 font-body text-gray-800 focus:outline-none shadow-sm bg-white"
			>
				<span>{value || placeholder}</span>
				<FaChevronDown className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''} text-red-500`} />
			</button>

			{/* Dropdown Options */}
			{isOpen && (
				<ul className="absolute mt-2 w-full border rounded-lg bg-white shadow-lg z-10">
					{options.map((option) => (
						<li key={option} onClick={() => handleSelect(option)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-body text-gray-800">
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
