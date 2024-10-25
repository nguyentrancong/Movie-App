import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgressBar from "../MediaList/CircularProgressBar";
import { groupBy } from "lodash";
import ImageBlur from "@components/Image";

const Banner = ({ mediaInfo }) => {
  const certification = (
    (mediaInfo.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((releaseDate) => releaseDate.certification)?.certification;

  const crews = (mediaInfo.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  const groupByCrews = groupBy(crews, "job");

  return (
    <div className="relative overflow-hidden text-white">
      <ImageBlur
        className="absolute inset-0 aspect-video w-full brightness-[0.2]"
        src={`https://media.themoviedb.org/t/p/original${mediaInfo?.backdrop_path}`}
        alt=""
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 p-6 sm:gap-8">
        <div className="flex-1">
          <ImageBlur
            width={600}
            height={900}
            src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2${mediaInfo?.poster_path}`}
            alt=""
          />
        </div>

        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{mediaInfo?.title}</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 px-1 text-gray-400">
              {certification}
            </span>
            <p>{mediaInfo?.release_date}</p>
            <p>
              {(mediaInfo.genres || []).map((item) => item.name).join(", ")}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round(mediaInfo?.vote_average || 0 * 10)}
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
            <p>{mediaInfo.overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupByCrews).map((job) => {
              return (
                <div key={job}>
                  <p className="font-bold">{job}</p>
                  <p>{groupByCrews[job].map((crew) => crew.name).join(", ")}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
