const MovieTrailer = ({
  trailer,
  title,
}: {
  trailer?: string;
  title: string;
}) => {
  const idFromTrailer = trailer?.split("=")[1];

  return (
    <div className="relative flex flex-col w-full max-w-full m-8 bg-[var(--bg-theme-1)] text-[var(--text-default)] p-6 gap-6 rounded-xl shadow-xl z-10 overflow-hidden">
      <p className="text-3xl font-bold">{title}</p>
      <div className="h-[382px] md:h-[556] w-full aspect-video">
        {trailer?.includes("youtube") && (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${idFromTrailer}`}
          ></iframe>
        )}
        {!trailer?.includes("youtube") && (
          <div className="flex justify-center items-center">
            <p className="text-lg text-[var(--text-default)]">
              Não foi possível carregar o trailer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieTrailer;
