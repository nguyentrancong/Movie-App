import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";

const FeatureMovies = () => {
  const [movies, setMovies] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState();

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTk3ODQwN2NhYTlhYjcwY2YxNTNkM2RjYzlhMDcwZiIsIm5iZiI6MTcyOTE0NzA2MS42NDYyNjMsInN1YiI6IjVkZTY3MzBlY2Y0YjhiMDAxMzI2OTIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._i7NQlebU3tqBCv3jvDldt8cZjoE1l8ystpvJMRaC5Y",
      },
    }).then(async (res) => {
      const data = await res.json();
      const popularMovies = data.results.slice(0, 4);
      setMovies(popularMovies);
      setActiveMovieId(popularMovies[0].id);
    });
  }, []);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => {
          return movie.id === activeMovieId;
        })
        .map((movie) => {
          return <Movie data={movie} key={movie.id} />;
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
