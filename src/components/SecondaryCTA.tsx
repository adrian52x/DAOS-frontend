import MusikerIcon from '../assets/musiker-icon.png';
import EnsembleIcon from '../assets/ensemble-icon.png';

export function SecondaryCTA() {
	return (
		<div className="flex space-x-4 sm:hidden ">
			<button className="flex flex-col basis-1/2  items-center justify-center border rounded-lg border-gray-400 p-4 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
				<img src={MusikerIcon} alt="Musiker Icon" className="w-8 h-auto mb-2" />
				<p className="font-body text-blue-800 text-sm font-bold">Find musiker</p>
			</button>

			<button className="flex flex-col basis-1/2 items-center justify-center border rounded-lg border-gray-400 p-4 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
				<img src={EnsembleIcon} alt="Ensemble Icon" className="w-8 h-auto mb-2" />
				<p className="font-body text-blue-800 text-sm font-bold ">Find ensemble</p>
			</button>
		</div>
	);
}
