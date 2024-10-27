import ImageBlur from "@components/Image";

const ActorInfo = ({ name, character, profilePath, episodeCount }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 bg-black shadow-sm">
      <ImageBlur
        className="w-full rounded-lg"
        width={276}
        height={350}
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
            : "/ActorNoImage.svg"
        }
        alt=""
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        <p>
          {episodeCount} {episodeCount > 1 ? "Episodes" : "Episode"}
        </p>
      </div>
    </div>
  );
};

export default ActorInfo;
