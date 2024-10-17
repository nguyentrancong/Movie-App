const PaginateIndicator = ({ movies, activeMovieId, setActiveMovieId }) => {
  return (
    <div className="absolute bottom-[10%] right-8">
      <ul className="flex gap-1">
        {movies.map((movie) => {
          return (
            <li
              onClick={() => {
                setActiveMovieId(movie.id);
              }}
              className={`h-2 w-8 cursor-pointer rounded ${activeMovieId === movie.id ? "bg-slate-100" : "bg-slate-600"}`}
              key={movie.id}
            ></li>
          );
        })}
        {/* <li className="h-1 w-6 cursor-pointer bg-slate-100"></li>
        <li className="h-1 w-6 cursor-pointer bg-slate-600"></li>
        <li className="h-1 w-6 cursor-pointer bg-slate-600"></li>
        <li className="h-1 w-6 cursor-pointer bg-slate-600"></li> */}
      </ul>
    </div>
  );
};

export default PaginateIndicator;
