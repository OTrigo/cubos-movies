import { Dispatch, SetStateAction } from "react";

const MoviePagination = ({
  pagination,
  setPagination,
  totalPages,
}: {
  pagination: number;
  setPagination: Dispatch<SetStateAction<number>>;
  totalPages: number;
}) => {
  return (
    <div className="relative w-full flex justify-center items-center gap-3 p-6 z-30">
      <button
        className="w-[64px] h-[44px] min-h-[44px] gap-3 rounded-[2px] pt-3 pr-5 pb-3 pl-5 bg-[#8E4EC6] disabled:bg-[#EBEAF814] cursor-pointer"
        onClick={() => setPagination((prev) => prev - 1)}
        disabled={pagination <= 0}
      >
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
      {Array({ length: totalPages }).map((_, id) => (
        <button
          className={`w-[49px] h-[44px] min-h-[44px] gap-3 rounded-[2px] pt-3 pr-5 pb-3 pl-5 bg-[#8E4EC6] hover:bg-[#EBEAF814] cursor-pointer`}
          key={id + 1}
          onClick={() => setPagination(id + 1)}
        >
          {id + 1}
        </button>
      ))}

      <button
        className="w-[64px] h-[44px] min-h-[44px] gap-3 rounded-[2px] pt-3 pr-5 pb-3 pl-5 bg-[#8E4EC6] disabled:bg-[#EBEAF814] cursor-pointer"
        onClick={() => setPagination((prev) => prev + 1)}
        disabled={pagination >= totalPages}
      >
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
