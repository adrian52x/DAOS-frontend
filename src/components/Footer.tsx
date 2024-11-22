import { Link } from '@tanstack/react-router';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className="bg-red text-white py-8 px-4 sm:px-12 flex flex-col sm:flex-row sm:justify-between items-center gap-8 sm:gap-0">
			{/* Left Section */}
			<div className="flex flex-col items-start text-left self-start">
				<h2 className=" font-header font-bold text-xl mb-2">Musik Samspil</h2>
				<div className="flex flex-col gap-2 mb-4">
					<Link to="/posts" className="text-sm font-body">
						Se opslag
					</Link>
					<Link to="/profile" className="text-sm font-body">
						Profil
					</Link>
				</div>
				<div className="flex gap-4">
					<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
						<FaInstagram className="w-5 h-5" />
					</a>
					<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
						<FaFacebook className="w-5 h-5" />
					</a>
					<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
						<FaLinkedin className="w-5 h-5" />
					</a>
				</div>
			</div>

			{/* Middle Section */}
			<div className="flex justify-center">
				<img src="/src/assets/footer-music.png" alt="DAOS Logo" className="w-56 sm:w-56" />
			</div>

			{/* Right Section */}
			<div className="flex flex-col items-center text-center">
				<div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-auto mx-4">
					<h3 className="font-body text-gray-800 font-bold text-sm mb-1">BRAGT TIL DIG AF</h3>

					<img src="/src/assets/logo.png" alt="DAOS Logo" className="w-full max-w-screen-md mx-auto" />
				</div>
				<p className="mt-4 text-xs">Privatlivspolitik</p>
			</div>
		</footer>
	);
};

export default Footer;
