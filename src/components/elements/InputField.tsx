type InputFieldProps = {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string; // text, email, password...
	name: string;
	required?: boolean;
	disabled?: boolean;
};

export function InputField({ label, placeholder = '', value, onChange, type = 'text', name, required = false, disabled = false }: InputFieldProps) {
	return (
		<div className="relative w-full">
			{/* Label */}
			{label && (
				<label htmlFor={name} className="block font-body text-gray-800 mb-1">
					{label}
				</label>
			)}

			{/* Input Field */}
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder || 'Enter text...'}
				value={value}
				onChange={onChange}
				required={required}
				disabled={disabled}
				className={`w-full flex items-center justify-between border rounded-lg px-4 py-2 font-body  placeholder-gray-800 ${
					disabled ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
				}`}
			/>
		</div>
	);
}
