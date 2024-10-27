import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";
import useFetch from "@hooks/useFetch";

const FeatureMovies = () => {
  const [activeMovieId, setActiveMovieId] = useState();

  const { data: getMovies } = useFetch({
    url: `/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&include_video=true`,
  });

  const { data: videoResponse } = useFetch(
    {
      url: `/movie/${activeMovieId}/videos`,
    },
    { enabled: !!activeMovieId },
  );
  const movies = (getMovies.results || []).slice(0, 4);

  useEffect(() => {
    if (movies[0]?.id) {
      const _activeMovieId = movies[0]?.id;
      setActiveMovieId(_activeMovieId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(movies)]);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => {
          return movie.id === activeMovieId;
        })
        .map((movie) => {
          return (
            <Movie
              data={movie}
              key={movie.id}
              trailerVideoKey={
                (videoResponse?.results || []).find(
                  (video) =>
                    video.type === "Trailer" && video.site === "YouTube",
                )?.key
              }
            />
          );
        })}

      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};

export default FeatureMovies;
