export function ProfileText({ text }: { text: string }) {
	return (
		<div className="bg-white shadow rounded-lg p-6">
			<h2 className="text-xl font-bold mb-4">About Me</h2>
			<p>{text}</p>
		</div>
	);
}
