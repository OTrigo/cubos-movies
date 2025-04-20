const MovieTrailer = ({
  trailer,
  title,
}: {
  trailer?: string;
  title: string;
}) => {
  return (
    <div className="relative flex flex-col w-full max-w-full m-8 bg-[#121113] text-white p-6 gap-6 rounded-xl shadow-xl z-10 overflow-hidden">
      <p className="text-3xl font-bold">{title}</p>
      <div>
        {trailer?.includes("youtube") && (
          <iframe width="100%" height="556" src={trailer}></iframe>
        )}
        {!trailer?.includes("youtube") && (
          <div className="flex justify-center items-center">
            <p className="text-lg text-white">
              Não foi possível carregar o trailer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieTrailer;
