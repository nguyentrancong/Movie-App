import { Link } from "react-router-dom";
import CircularProgressBar from "./CircularProgressBar";
import ImageBlur from "@components/Image";

const MovieCard = ({ id, title, releaseDate, poster, point, mediaType }) => {
  return (
    <Link to={`/movie/${id}`} className="rounded-lg border border-slate-800">
      <div className="relative">
        {mediaType === "tv" && (
          <p className="absolute right-0 rounded bg-black px-2 text-sm text-white">
            TV Show
          </p>
        )}
        {mediaType === "movie" && (
          <p className="absolute right-0 rounded bg-black px-2 text-sm text-white">
            Movie
          </p>
        )}
        <ImageBlur
          className="w-full rounded-lg"
          width={210}
          height={300}
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt=""
        />
        <div className="relative -top-[1.5vw] px-4">
          <CircularProgressBar
            percent={Math.round(point * 10)}
            strokeColor={point > 7 ? "green" : point >= 5 ? "orange" : "red"}
          />
          <p className="mt-2 font-bold">{title}</p>
          <p className="text-slate-300">{releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
