import CircularProgressBar from "./CircularProgressBar";

const MovieCard = ({ title, releaseDate, poster, point, mediaType }) => {
  return (
    <div className="relative rounded-lg border border-slate-800">
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
      <img
        className="w-full rounded-lg"
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
  );
};

export default MovieCard;
