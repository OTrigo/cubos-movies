const MovieDetailsActions = ({
  friendlyTitle,
  fullTitle,
  handleDeleteMovie,
  handleEditMovie,
  isMobile,
  additionalClass,
}: {
  friendlyTitle: string;
  fullTitle: string;
  handleDeleteMovie: () => void;
  handleEditMovie: () => void;
  isMobile: boolean;
  additionalClass?: string;
}) => {
  return (
    <div
      className={`${isMobile ? "flex lg:hidden" : "hidden lg:flex lg:justify-between lg:flex-row"} relative flex-col justify-center items-center gap-4 ${additionalClass}`}
    >
      <div>
        <h1 className="text-3xl font-bold">{friendlyTitle ?? "No data"}</h1>
        <p className="text-sm text-gray-400">
          Título original: {fullTitle ?? "No data"}
        </p>
      </div>
      <div className="flex gap-2 w-full md:w-fit">
        <button
          className={`bg-[#B744F708] text-white px-3 py-1 rounded cursor-pointer ${isMobile && " py-3"}`}
          onClick={handleDeleteMovie}
        >
          Deletar
        </button>
        <button
          className={`bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded cursor-pointer ${isMobile && "flex-grow py-3"}`}
          onClick={handleEditMovie}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default MovieDetailsActions;
