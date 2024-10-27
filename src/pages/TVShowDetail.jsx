import { useParams } from "react-router-dom";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import useFetch from "@hooks/useFetch";
import TvShowInfo from "@components/MediaDetail/TvShowInfo";
import SeasonList from "@components/MediaDetail/SeasonList";

const TVShowDetail = () => {
  const { id } = useParams();

  const { data: tvInfo, isLoading } = useFetch({
    url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits,videos`,
  });

  const { data: getRelatedMovies, isLoading: isRelatedLoading } = useFetch({
    url: `/tv/${id}/recommendations`,
  });
  const relatedTvShow = getRelatedMovies?.results || [];

  const certification = (tvInfo?.content_ratings?.results || []).find(
    (result) => result.iso_3166_1 === "US",
  )?.rating;

  const crews = (tvInfo?.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ["Director", "Writer"].some((job) => jobs.find((j) => j === job));
    })
    .map((crew) => ({ id: crew.id, job: crew.jobs[0].job, name: crew.name }));

  if (isLoading) {
    return <Loading />;
  }

  if (tvInfo) {
    return (
      <div>
        <Banner
          title={tvInfo.name}
          backdropPath={tvInfo.backdrop_path}
          posterPath={tvInfo.poster_path}
          releaseDate={tvInfo.first_air_date}
          genres={tvInfo.genres}
          point={tvInfo.vote_average}
          overview={tvInfo.overview}
          certification={certification}
          crews={crews}
          trailerVideoKey={
            (tvInfo.videos?.results || []).find((video) => {
              return video.type === "Trailer";
            })?.key
          }
        />
        <div className="bg-black text-[1.2vw] text-white">
          <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
            <div className="flex-[2]">
              <ActorList
                actors={(tvInfo.aggregate_credits?.cast || []).map((item) => {
                  return {
                    ...item,
                    character: item.roles[0]?.character,
                    episodeCount: item.roles[0]?.episode_count,
                  };
                })}
              />
              <SeasonList seasons={(tvInfo.seasons || []).reverse()} />
              <RelatedMediaList
                mediaList={relatedTvShow}
                isLoading={isRelatedLoading}
              />
            </div>
            <div className="flex-1">
              <TvShowInfo mediaInfo={tvInfo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TVShowDetail;
