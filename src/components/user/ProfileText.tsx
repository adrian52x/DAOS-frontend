export function ProfileText({ text }: { text: string }) {
	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="font-header text-2xl text-blue-800 font-bold mb-4">About Me</h2>
			<p className="font-body text-md text-gray-800">{text}</p>
		</div>
	);
}
