import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgressBar from "../MediaList/CircularProgressBar";
import { groupBy, take } from "lodash";
import ImageBlur from "@components/Image";
import { useModalContext } from "@components/context/ModalProvider";

const Banner = ({
  title,
  backdropPath,
  posterPath,
  certification,
  crews,
  releaseDate,
  genres,
  point = 0,
  overview,
  trailerVideoKey,
}) => {
  const { openPopup } = useModalContext();

  const groupByCrews = groupBy(crews, "job");

  if (!title) return null;

  return (
    <div className="relative overflow-hidden bg-black text-white">
      <ImageBlur
        width={1200}
        height={800}
        className="absolute inset-0 aspect-video w-full brightness-[0.2]"
        src={
          backdropPath &&
          `https://media.themoviedb.org/t/p/original${backdropPath}`
        }
        alt=""
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 p-6 sm:gap-8">
        <div className="flex-1">
          <ImageBlur
            width={600}
            height={900}
            src={
              posterPath &&
              `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${posterPath}`
            }
            alt=""
          />
        </div>

        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{title}</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 px-1 text-gray-400">
              {certification}
            </span>
            <p>{releaseDate}</p>
            <p>{(genres || []).map((item) => item.name).join(", ")}</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round(point || 0 * 10)}
                size={3.5}
                strokeWidth={0.3}
              />
              Rating
            </div>
            <button
              onClick={() => {
                openPopup(
                  <iframe
                    title="Trailer"
                    src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                    className="aspect-video w-[65vw]"
                  />,
                );
              }}
            >
              <FontAwesomeIcon icon={faPlay} className="mr-2" />
              Trailer
            </button>
          </div>
          <div>
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupByCrews).map((job) => {
              return (
                <div key={job}>
                  <p className="font-bold">{job}</p>
                  <p>
                    {take(
                      groupByCrews[job].map((crew) => crew.name),
                      2,
                    ).join(", ")}
                  </p>
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
