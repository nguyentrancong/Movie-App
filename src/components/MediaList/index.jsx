import { useState } from "react";
import MovieCard from "./MovieCard";
import useFetch from "@hooks/useFetch";

const MediaList = ({ title, tabs }) => {
  // const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const url = tabs.find((tab) => tab.id === activeTabId).url;

  // useEffect(() => {
  //   const url = tabs.find((tab) => tab.id === activeTabId).url;
  //   if (url) {
  //     fetch(url, {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  //       },
  //     }).then(async (res) => {
  //       const data = await res.json();
  //       const trendingMediaList = data.results.slice(0, 12);
  //       setMediaList(trendingMediaList);
  //     });
  //   }
  // }, [activeTabId, tabs]);

  const { data } = useFetch({ url });
  const mediaList = (data?.results || []).slice(0, 12);

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs.map((tab) => {
            return (
              <li
                onClick={() => setActiveTabId(tab.id)}
                key={tab.id}
                className={`cursor-pointer rounded px-2 py-1 ${tab.id === activeTabId ? "bg-white px-2 py-1 text-black" : ""}`}
              >
                {tab.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {mediaList.map((media) => {
          return (
            <MovieCard
              key={media.id}
              id={media.id}
              title={media.title || media.name}
              releaseDate={media.release_date || media.first_air_date}
              poster={media.poster_path || media.profile_path}
              point={media.vote_average}
              mediaType={media.media_type || activeTabId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MediaList;
