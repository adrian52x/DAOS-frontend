import EnsembleIcon from "../assets/ensemble-icon.png";
import EnsemblePortrait from "../assets/ensemble-portrait.jpeg";

export function PostCardEnsemble() {
  return (
    <article className="border-2 border-gray-400 rounded-xl">
      <div className="flex flex-row gap-4 justify-between bg-gray-200 pt-4 px-4">
        <img src={EnsemblePortrait} alt="propic" className="w-[50px] h-[50px] object-cover rounded-lg" />
        <div className="grow">
          <h3 id="groupName" className="font-body font-bold text-red">
            Århus Klassisk Ensemble
          </h3>
          <p className="text-gray-800">
            <span id="area" className=" font-body text-sm font-bold pr-2">
              Århus
            </span>
            •{" "}
            <span id="numOfMusicians" className="font-body text-sm pl-2">
              {" "}
              10 - 24 musikere
            </span>
          </p>
        </div>
        {<img src={EnsembleIcon} alt="icon" className="self-end opacity-20" />}
      </div>

      <h4 id="description" className="font-body text-xl font-bold text-blue-800 p-4">
        Violinist søges som afløser til forestilling i oktober
      </h4>

      <div className="flex flex-row justify-between px-4 pb-4">
        <h5 id="instrument" className="font-header text-xl text-blue font-bold  ">
          Violin
        </h5>
        <p id="experience" className="font-body text-md text-gray-800 font-bold  ">
          Erfaring
          <span className="text-white bg-blue-800 p-2 rounded-xl ml-2">2+</span>
        </p>
      </div>
    </article>
  );
}
