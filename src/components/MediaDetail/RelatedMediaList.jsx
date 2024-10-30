import Loading from "@components/Loading";
import MovieCard from "@components/MediaList/MovieCard";

const RelatedMediaList = ({ mediaList = [], isLoading = false, title }) => {
  return (
    <div className="mt-4">
      <p className="mb-4 text-[1.4vw] font-bold">{title}</p>
      {isLoading && <Loading />}
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {mediaList.map((media) => {
          return (
            <MovieCard
              key={media.id}
              id={media.id}
              title={media.title || media.name}
              releaseDate={media.release_date || media.first_air_date}
              poster={media.poster_path}
              point={media.vote_average}
              mediaType={media.media_type}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedMediaList;
