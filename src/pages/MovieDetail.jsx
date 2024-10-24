import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import MovieInfo from "@components/MediaDetail/MovieInfo";
import useFetch from "@hooks/useFetch";

const MovieDetail = () => {
  const { id } = useParams();

  // const [movieInfo, setMovieInfo] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isRelatedLoading, setIsRelatedLoading] = useState(false);

  const { data: movieInfo, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits,videos`,
  });

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits,videos`,
  //     {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  //       },
  //     },
  //   )
  //     .then(async (res) => {
  //       const data = await res.json();
  //       setMovieInfo(data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [id]);

  useEffect(() => {
    setIsRelatedLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        setRelatedMovies(data.results);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsRelatedLoading(false);
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
          <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
            <div className="flex-[2]">
              <ActorList actors={movieInfo.credits?.cast || []} />
              <RelatedMediaList mediaList={relatedMovies} />
            </div>
            <div className="flex-1">
              <MovieInfo mediaInfo={movieInfo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MovieDetail;
