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
		<div className="input-field space-y-2">
			{/* Label */}
			{label && (
				<label htmlFor={name} className="block text-sm font-medium text-gray-800">
					{label}
				</label>
			)}

			{/* Input Field */}
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
			/>
		</div>
	);
}
