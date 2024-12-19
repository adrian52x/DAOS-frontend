import OpenQuote from '../assets/quote-mark-begin.svg';
import CloseQuote from '../assets/quote-mark-end.svg';

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
			<article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0 flex flex-col justify-between">
				<div className="flex flex-col">
					<img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
					<p className="font-body text-black text-center">
						Musik Samspil brought us together in a way we never expected. We thought it would just be a one-time jam, but now we can’t wait to meet up again next month!
					</p>
					<img src={CloseQuote} alt="quote icon" className="w-6 h-auto mb-4 self-end pb-8" />
				</div>

				<img alt="reviewer-pic" className="w-full h-auto" />
				<p className="font-body text-red font-bold text-center">Sofie</p>
				<p className="font-body text-gray-800 text-center">Fra kvartetten Klassisk Amok</p>
			</article>

			{/* Card 2 */}
			<article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0 flex flex-col justify-between">
				<div className="flex flex-col">
					<img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
					<p className="font-body text-black text-center">
					What started as a casual music session with Musik Samspil has turned into a regular hangout. We were amazed at how quickly we clicked, and now we’re planning to meet at least once a month!
					</p>
					<img src={CloseQuote} alt="quote icon" className="w-6 h-auto mb-4 self-end pb-8" />
				</div>

				<img alt="reviewer-pic" className="w-full h-auto" />
				<p className="font-body text-red font-bold text-center">Sofie</p>
				<p className="font-body text-gray-800 text-center">Fra kvartetten Klassisk Amok</p>
			</article>

			{/* Card 3 */}
			<article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0 flex flex-col justify-between">
				<div className="flex flex-col">
					<img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
					<p className="font-body text-black text-center">
					Thanks to Musik Samspil, we’ve formed a solid group of musicians. Our first meet-up was only supposed to be a trial, but the chemistry was undeniable, and now we’re meeting every few weeks to practice!
					</p>
					<img src={CloseQuote} alt="quote icon" className="w-6 h-auto mb-4 self-end pb-8" />
				</div>

				<img alt="reviewer-pic" className="w-full h-auto" />
				<p className="font-body text-red font-bold text-center">Sofie</p>
				<p className="font-body text-gray-800 text-center">Fra kvartetten Klassisk Amok</p>
			</article>

			{/* Card 4 */}
			<article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0 flex flex-col justify-between">
				<div className="flex flex-col">
					<img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
					<p className="font-body text-black text-center">
					Musik Samspil gave us the opportunity to connect over our shared passion for music. At first, we thought it was just a one-off gathering, but now we’re eagerly looking forward to getting together again soon!
					</p>
					<img src={CloseQuote} alt="quote icon" className="w-6 h-auto mb-4 self-end pb-8" />
				</div>

				<img alt="reviewer-pic" className="w-full h-auto" />
				<p className="font-body text-red font-bold text-center">Sofie</p>
				<p className="font-body text-gray-800 text-center">Fra kvartetten Klassisk Amok</p>
			</article>
		</div>
	);
}
