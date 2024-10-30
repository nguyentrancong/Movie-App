import ImageBlur from "@components/Image";
import { currencyFormatter } from "@libs/utils";

const MovieInfo = ({ mediaInfo = {} }) => {
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Information</p>
      <div className="mb-4">
        <p className="font-bold">Original Name</p>
        <p>{mediaInfo?.original_title}</p>
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
        <p className="font-bold">Budget</p>
        <p>{currencyFormatter(mediaInfo?.budget)}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Revenue</p>
        <p>{currencyFormatter(mediaInfo?.revenue)}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold"></p>
        <p></p>
      </div>
      <div className="mb-4">
        <p className="font-bold"></p>
        <p></p>
      </div>
      <div className="mb-4">
        <p className="font-bold"></p>
        <p></p>
      </div>
    </div>
  );
};

export default MovieInfo;
