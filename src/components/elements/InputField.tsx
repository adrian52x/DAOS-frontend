type InputFieldProps = {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	type?: string; // Text, email, password, etc.
	name: string; // Field name
	required?: boolean;
	options?: string[]; // Optional dropdown options for select
};

export function InputField({ label, placeholder = '', value, onChange, type = 'text', name, required = false, options }: InputFieldProps) {
	return (
		<div className="input-field">
			{/* Label */}
			{label && (
				<label htmlFor={name} className="block text-sm font-medium text-gray-800 mb-1">
					{label}
				</label>
			)}

			{/* Dropdown or Input */}
			{options ? (
				<select
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					required={required}
					className="w-full flex items-center justify-between border rounded-lg px-4 py-2 font-body text-black placeholder-gray-800 focus:outline-none shadow-sm bg-white"
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
			) : (
				<input
					id={name}
					name={name}
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					required={required}
					className="w-full flex items-center justify-between border rounded-lg px-4 py-2 font-body text-black placeholder-gray-800 focus:outline-none shadow-sm"
				/>
			)}
		</div>
	);
}
