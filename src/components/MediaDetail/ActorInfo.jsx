const ActorInfo = ({ id, name, character, profilePath }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 bg-black shadow-sm">
      <img
        className="w-full rounded-lg"
        src={
          profilePath
            ? `https://media.themoviedb.org/t/p/w138_and_h175_face${profilePath}`
            : "/ActorNoImage.svg"
        }
        alt=""
      />
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        {/* <p>18</p> */}
      </div>
    </div>
  );
};

export default ActorInfo;
