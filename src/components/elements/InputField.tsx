type InputFieldProps = {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	type?: string; // Text, email, password, etc.
	name: string; // Field name
	required?: boolean;
	options?: string[]; // Optional dropdown options for select
	children?: React.ReactNode; // For custom components like Level Selector
};

export function InputField({ label, placeholder = '', value, onChange, type = 'text', name, required = false, options, children }: InputFieldProps) {
	return (
		<div className="input-field space-y-2">
			{/* Label */}
			{label && (
				<label htmlFor={name} className="block text-sm font-medium text-gray-800">
					{label}
				</label>
			)}

			{/* Dropdown, Input, or Custom Content */}
			{options ? (
				<select
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					required={required}
					className="w-full border rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
				>
					{/* Placeholder as the first option */}
					<option value="" disabled>
						{placeholder}
					</option>
					{/* Map over options */}
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			) : children ? (
				<div className="w-full border rounded-lg px-4 py-3 bg-gray-100 shadow-sm">{children}</div>
			) : (
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
			)}
		</div>
	);
}
