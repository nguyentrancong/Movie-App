import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgressBar from "../components/MediaList/CircularProgressBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { groupBy } from "lodash";

const MovieDetail = () => {
  const { id } = useParams();

  const [movieInfo, setMovieInfo] = useState({});

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits,videos`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTk3ODQwN2NhYTlhYjcwY2YxNTNkM2RjYzlhMDcwZiIsIm5iZiI6MTcyOTE0NzA2MS42NDYyNjMsInN1YiI6IjVkZTY3MzBlY2Y0YjhiMDAxMzI2OTIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._i7NQlebU3tqBCv3jvDldt8cZjoE1l8ystpvJMRaC5Y",
        },
      },
    ).then(async (res) => {
      const data = await res.json();
      setMovieInfo(data);
    });
  }, [id]);

  const certification = (
    (movieInfo.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((releaseDate) => releaseDate.certification)?.certification;

  const crews = (movieInfo.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  const groupByCrews = groupBy(crews, "job");

  if (movieInfo) {
    return (
      <div className="relative overflow-hidden text-white">
        <img
          className="absolute inset-0 aspect-video w-full brightness-[0.2]"
          src={`https://media.themoviedb.org/t/p/original${movieInfo?.backdrop_path}`}
          alt=""
        />
        <div className="relative mx-auto flex max-w-screen-xl gap-6 p-6 sm:gap-8">
          <div className="flex-1">
            <img
              src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieInfo?.poster_path}`}
              alt=""
            />
          </div>

          <div className="flex-[2] text-[1.2vw]">
            <p className="mb-2 text-[2vw] font-bold">{movieInfo?.title}</p>
            <div className="flex items-center gap-4">
              <span className="border border-gray-400 px-1 text-gray-400">
                {certification}
              </span>
              <p>{movieInfo?.release_date}</p>
              <p>
                {(movieInfo.genres || []).map((item) => item.name).join(", ")}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CircularProgressBar
                  percent={Math.round(movieInfo.vote_average * 10)}
                  size={3.5}
                  strokeWidth={0.3}
                />
                Rating
              </div>
              <button>
                <FontAwesomeIcon icon={faPlay} className="mr-2" />
                Trailer
              </button>
            </div>
            <div>
              <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
              <p>{movieInfo.overview}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.keys(groupByCrews).map((job) => {
                return (
                  <div key={job}>
                    <p className="font-bold">{job}</p>
                    <p>
                      {groupByCrews[job].map((crew) => crew.name).join(", ")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MovieDetail;
