import { useParams } from "react-router-dom";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import MovieInfo from "@components/MediaDetail/MovieInfo";
import useFetch from "@hooks/useFetch";

const MovieDetail = () => {
  const { id } = useParams();

  const { data: movieInfo, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits,videos`,
  });

  const { data: getRelatedMovies, isLoading: isRelatedLoading } = useFetch({
    url: `/movie/${id}/recommendations`,
  });
  const relatedMovies = getRelatedMovies?.results || [];

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
              <RelatedMediaList
                mediaList={relatedMovies}
                isLoading={isRelatedLoading}
              />
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
