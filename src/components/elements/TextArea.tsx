type TextAreaProps = {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	name: string; // Field name
	rows?: number;
};

export function TextArea({ label, placeholder = '', value, onChange, name, rows = 4 }: TextAreaProps) {
	return (
		<div className="relative w-full">
			{/* Label */}
			{label && (
				<label htmlFor={name} className="block font-body text-gray-800 mb-1">
					{label}
				</label>
			)}

			{/* Text Area */}
			<textarea
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				name={name}
				rows={rows}
				className="w-full flex items-center justify-between border rounded-lg px-4 py-2 font-body  placeholder-gray-800"
			/>
		</div>
	);
}
