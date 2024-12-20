import ImageBlur from "@components/Image";
import { Link } from "react-router-dom";

const ActorInfo = ({ id, name, character, profilePath, episodeCount }) => {
  return (
    <Link
      to={`/people/${id}`}
      className="overflow-hidden rounded-lg border border-slate-300 bg-black shadow-sm"
    >
      <ImageBlur
        className="w-full rounded-lg"
        width={276}
        height={350}
        src={
          profilePath &&
          `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
        }
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        {episodeCount && (
          <p>
            {episodeCount} {episodeCount > 1 ? "Episodes" : "Episode"}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ActorInfo;
