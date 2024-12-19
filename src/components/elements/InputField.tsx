type InputFieldProps = {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string; // Text, email, password, etc.
	name: string; // Field name
	required?: boolean;
};

export function InputField({ label, placeholder = '', value, onChange, type = 'text', name, required = false }: InputFieldProps) {
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
				className="w-full flex items-center justify-between border rounded-lg px-4 py-2 font-body text-gray-800 focus:outline-none shadow-sm bg-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
			/>
		</div>
	);
}
