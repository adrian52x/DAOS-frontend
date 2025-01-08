import OpenQuote from '../assets/quote-mark-begin.svg';
import CloseQuote from '../assets/quote-mark-end.svg';
import ProPic from '../assets/musician-portrait-2.jpg';

export function ReviewCard() {
	return (
		<div
			className="flex flex-row gap-6 overflow-x-auto px-4 w-full"
			style={{
				scrollbarWidth: 'none', // Firefox
				msOverflowStyle: 'none', // Internet Explorer 10+
			}}
		>
			{/* Card 1 */}
			<article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0 flex flex-col">
				<div className="flex-grow flex flex-col">
					<img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
					<p className="font-body text-black text-center">
						Music Samspil helped us get together. At first we were supposed to meet just once, but it was just so cool that now we meet every other week!
					</p>
					<img src={CloseQuote} alt="quote icon" className="w-6 h-auto mb-4 self-end pb-8" />
				</div>
				<div className="flex flex-col">
					<img alt="reviewer-pic" className="w-[50px] h-[50px] object-cover rounded-lg flex-shrink-0 self-center" src={ProPic} />
					<p className="font-body text-red font-bold text-center pt-2">Emil</p>
					<p className="font-body text-gray-800 text-center">Fra kvartetten Klassisk Amok</p>
				</div>
			</article>
			{/* Card 2 */}
			<article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0 flex flex-col">
				<div className="flex-grow flex flex-col">
					<img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
					<p className="font-body text-black text-center">
						Joining the Music Samspil sessions has been a game-changer for me. I came for the music but stayed for the incredible vibe and connections. It's now the
						highlight of my week—every session feels like magic!{' '}
					</p>
					<img src={CloseQuote} alt="quote icon" className="w-6 h-auto mb-4 self-end pb-8" />
				</div>
				<div className="flex flex-col">
					<img alt="reviewer-pic" className="w-[50px] h-[50px] object-cover rounded-lg flex-shrink-0 self-center" src={ProPic} />
					<p className="font-body text-red font-bold text-center pt-2">Tobias</p>
					<p className="font-body text-gray-800 text-center">Fra kvartetten Klassisk Amok</p>
				</div>
			</article>

			{/* Card 3 */}
			<article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0 flex flex-col">
				<div className="flex-grow flex flex-col">
					<img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
					<p className="font-body text-black text-center">
						I never thought I'd find a group like this. The energy, the creativity, and the people are all amazing. It’s more than just music; it’s a community that
						keeps growing stronger every time we meet!
					</p>
					<img src={CloseQuote} alt="quote icon" className="w-6 h-auto mb-4 self-end pb-8" />
				</div>
				<div className="flex flex-col">
					<img alt="reviewer-pic" className="w-[50px] h-[50px] object-cover rounded-lg flex-shrink-0 self-center" src={ProPic} />
					<p className="font-body text-red font-bold text-center pt-2">Klaus</p>
					<p className="font-body text-gray-800 text-center">Fra kvartetten Klassisk Amok</p>
				</div>
			</article>
			{/* Card 4 */}
			<article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0 flex flex-col">
				<div className="flex-grow flex flex-col">
					<img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
					<p className="font-body text-black text-center">
						Music Samspil brought me out of my shell. I’ve learned so much, met some truly inspiring people, and had an absolute blast every session. It’s a perfect mix
						of fun and collaboration—I can’t wait for the next one!
					</p>
					<img src={CloseQuote} alt="quote icon" className="w-6 h-auto mb-4 self-end pb-8" />
				</div>
				<div className="flex flex-col">
					<img alt="reviewer-pic" className="w-[50px] h-[50px] object-cover rounded-lg flex-shrink-0 self-center" src={ProPic} />
					<p className="font-body text-red font-bold text-center pt-2">Emil</p>
					<p className="font-body text-gray-800 text-center">Fra kvartetten Klassisk Amok</p>
				</div>
			</article>
		</div>
	);
}
