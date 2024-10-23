import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Banner from "../components/MediaDetail/Banner";
import ActorList from "../components/MediaDetail/ActorList";

const MovieDetail = () => {
  const { id } = useParams();

  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
    )
      .then(async (res) => {
        const data = await res.json();
        setMovieInfo(data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (movieInfo) {
    return (
      <div>
        <Banner mediaInfo={movieInfo} />
        <div className="bg-black text-[1.2vw] text-white">
          <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10">
            <div className="flex-[2]">
              <ActorList actors={movieInfo.credits?.cast || []} />
            </div>
            <div className="flex-[1]">
              <p className="mb-4 text-[1.4vw] font-bold">Information</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MovieDetail;
