import Loading from "@components/Loading";
import MovieCard from "@components/MediaList/MovieCard";

const RelatedMediaList = ({ mediaList = [], isLoading = false }) => {
  return (
    <div className="mt-4">
      <p className="mb-4 text-[1.4vw] font-bold">Related</p>
      {isLoading && <Loading />}
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {mediaList.map((media) => {
          return (
            <MovieCard
              key={media.id}
              id={media.id}
              title={media.title || media.name}
              releaseDate={media.first_air_date}
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
