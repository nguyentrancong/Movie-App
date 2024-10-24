import MovieCard from "@components/MediaList/MovieCard";

const RelatedMediaList = ({ mediaList = [] }) => {
  return (
    <div className="mt-4">
      <p className="mb-4 text-[1.4vw] font-bold">Related</p>
      <div>
        {mediaList.map((media) => {
          return (
            <MovieCard
              key={media.id}
              id={media.id}
              title={media.title}
              releaseDate={media.release_date}
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
