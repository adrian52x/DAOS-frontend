import OpenQuote from "../assets/quote-mark-begin.svg";
import CloseQuote from "../assets/quote-mark-end.svg";

export function ReviewCard() {
  return (
    <div
      className="flex flex-row gap-6 overflow-x-auto px-4 w-full"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // Internet Explorer 10+
      }}
    >
      {/* Card 1 */}
      <article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0">
        <div className="flex flex-col">
          <img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
          <p className="font-body text-black text-center">
            Musik Samspil hjalp os med at finde sammen. Først var det meningen,
            at vi bare skulle mødes en enkelt gang, men det var bare så fedt, at
            nu mødes vi hver anden uge!
          </p>
          <img
            src={CloseQuote}
            alt="quote icon"
            className="w-6 h-auto mb-4 self-end pb-8"
          />
        </div>

        <img alt="reviewer-pic" className="w-full h-auto" />
        <p className="font-body text-red font-bold text-center">Sofie</p>
        <p className="font-body text-gray-800 text-center">
          Fra kvartetten Klassisk Amok
        </p>
      </article>

      {/* Card 2 */}
      <article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0">
        <div className="flex flex-col">
          <img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
          <p className="font-body text-black text-center">
            Musik Samspil hjalp os med at finde sammen. Først var det meningen,
            at vi bare skulle mødes en enkelt gang, men det var bare så fedt, at
            nu mødes vi hver anden uge!
          </p>
          <img
            src={CloseQuote}
            alt="quote icon"
            className="w-6 h-auto mb-4 self-end pb-8"
          />
        </div>

        <img alt="reviewer-pic" className="w-full h-auto" />
        <p className="font-body text-red font-bold text-center">Sofie</p>
        <p className="font-body text-gray-800 text-center">
          Fra kvartetten Klassisk Amok
        </p>
      </article>

      {/* Card 3 */}
      <article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0">
        <div className="flex flex-col">
          <img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
          <p className="font-body text-black text-center">
            Musik Samspil hjalp os med at finde sammen. Først var det meningen,
            at vi bare skulle mødes en enkelt gang, men det var bare så fedt, at
            nu mødes vi hver anden uge!
          </p>
          <img
            src={CloseQuote}
            alt="quote icon"
            className="w-6 h-auto mb-4 self-end pb-8"
          />
        </div>

        <img alt="reviewer-pic" className="w-full h-auto" />
        <p className="font-body text-red font-bold text-center">Sofie</p>
        <p className="font-body text-gray-800 text-center">
          Fra kvartetten Klassisk Amok
        </p>
      </article>

      {/* Card 4 */}
      <article className="bg-white rounded-lg p-6 w-[250px] sm:w-[350px] flex-shrink-0">
        <div className="flex flex-col">
          <img src={OpenQuote} alt="quote icon" className="w-6 h-auto mb-4" />
          <p className="font-body text-black text-center">
            Musik Samspil hjalp os med at finde sammen. Først var det meningen,
            at vi bare skulle mødes en enkelt gang, men det var bare så fedt, at
            nu mødes vi hver anden uge!
          </p>
          <img
            src={CloseQuote}
            alt="quote icon"
            className="w-6 h-auto mb-4 self-end pb-8"
          />
        </div>

        <img alt="reviewer-pic" className="w-full h-auto" />
        <p className="font-body text-red font-bold text-center">Sofie</p>
        <p className="font-body text-gray-800 text-center">
          Fra kvartetten Klassisk Amok
        </p>
      </article>
    </div>
  );
}
