type Movie = any;

const MoviePagination = ({ movies }: { movies: Movie[] }) => {
  console.log(movies);
  return (
    <div className="w-full flex justify-center items-center gap-3">
      <button className="w-[64px] h-[44px] min-h-[44px] gap-3 rounded-[2px] pt-3 pr-5 pb-3 pl-5 bg-[#8E4EC6] disabled:bg-[#EBEAF814] cursor-pointer">
        <svg
          width="25"
          height="19"
          viewBox="0 0 25 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 3.5L9.5 9.5L15.5 15.5"
            stroke="#EAE6FD"
            strokeOpacity="0.43"
            strokeWidth="2"
          />
        </svg>
      </button>
      {movies.map((_, id) => (
        <button
          className="w-[49px] h-[44px] min-h-[44px] gap-3 rounded-[2px] pt-3 pr-5 pb-3 pl-5 bg-[#8E4EC6] hover:bg-[#EBEAF814] cursor-pointer"
          key={id}
        >
          {id}
        </button>
      ))}

      <button className="w-[64px] h-[44px] min-h-[44px] gap-3 rounded-[2px] pt-3 pr-5 pb-3 pl-5 bg-[#8E4EC6] disabled:bg-[#EBEAF814] cursor-pointer">
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.5 6L15.5 12L9.5 18" stroke="white" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
};

export default MoviePagination;
