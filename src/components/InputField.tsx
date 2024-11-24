import { ChangeEventHandler } from 'react';

type InputFieldProps = {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	type?: string; // type can be text, email, password etc.
	name: string; // useful for form submission
	required?: boolean;
};

export function InputField({ label, placeholder = '', value, onChange, type = 'text', name, required = false }: InputFieldProps) {
	return (
		<div className="input-field">
			{label && (
				<label htmlFor={name} className="block font-body text-gray-800 mb-1">
					{label}
				</label>
			)}
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange} // Input changes are managed by the parent
				required={required} // If the field is required
				className="w-full flex items-center justify-between border rounded-lg px-4 py-2 font-body text-black placeholder-gray-800 focus:outline-none shadow-sm"
			/>
		</div>
	);
}
