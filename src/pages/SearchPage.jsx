import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import SearchForm from "@components/SearchForm";
import useFetch from "@hooks/useFetch";
import { useState } from "react";

const SearchPage = () => {
  const [searchFormValue, setSearchFormValue] = useState({
    mediaType: "movie",
    genres: [],
    rating: "All",
  });

  const [minRating, maxRating] =
    searchFormValue.rating === "All"
      ? [0, 100]
      : searchFormValue.rating.split(" - ");
  const { data } = useFetch({
    url: `/discover/${searchFormValue.mediaType}?sort_by=popularity.desc&with_genres=${searchFormValue.genres.join(",")}&vote_average.gte=${minRating / 10}&vote_average.lte=${maxRating / 10}`,
  });

  return (
    <div className="container flex-col">
      <p className="text-2xl font-bold">Search</p>
      <div className="flex gap-6">
        <div className="flex-1">
          <SearchForm setSearchFormValue={setSearchFormValue} />
        </div>
        <div className="flex-[3]">
          <RelatedMediaList mediaList={data.results || []} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
