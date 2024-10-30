import ImageBlur from "@components/Image";

const TvShowInfo = ({ mediaInfo = {} }) => {
  console.log(`------->>> mediaInfo:`, mediaInfo);
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Information</p>
      <div className="mb-4">
        <p className="font-bold">Original Name</p>
        <p>{mediaInfo?.original_name}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Original Country</p>
        <p>
          {(mediaInfo?.origin_country || []).map((item) => {
            return (
              <ImageBlur
                key={item}
                src={
                  item && `https://flagcdn.com/48x36/${item.toLowerCase()}.png`
                }
                className="mr-1 mt-1 w-[1.4vw]"
              />
            );
          })}
        </p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{mediaInfo?.status}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Network</p>
        {(mediaInfo?.networks || []).map((network) => {
          return (
            <img
              src={`https://media.themoviedb.org/t/p/h15${network.logo_path}`}
              alt=""
              key={network.id}
              className="mt-1 invert"
            />
          );
        })}
      </div>
    </div>
  );
};

export default TvShowInfo;
