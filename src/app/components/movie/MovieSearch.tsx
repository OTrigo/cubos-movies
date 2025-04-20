import { Dispatch, SetStateAction, useRef } from "react";

const MovieSearch = ({
  setShowModal,
  setSearch,
  refetch,
}: {
  setShowModal: Dispatch<
    SetStateAction<{
      show: boolean;
      variant: "filter" | "add" | "";
    }>
  >;
  setSearch: Dispatch<SetStateAction<string>>;
  pagination: number;
  refetch: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex w-full h-[92px] z-10 justify-end pr-4 gap-[10px] items-center">
      <label className="relative h-fit">
        <input
          ref={inputRef}
          type="text"
          className="w-full !min-h-[44px] !h-[44px] md:w-[488px] border rounded-[4px] text-[#6F6D78] bg-[#1A191B] border-[#49474E] px-[16px] py-[12.5px]"
          placeholder="Pesquise por filmes"
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-[10px] right-4 cursor-pointer"
          onClick={() => {
            setSearch(inputRef.current?.value ?? "");
            refetch();
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18ZM11 6C10.3434 6 9.69321 6.12933 9.08658 6.3806C8.47995 6.63188 7.92876 7.00017 7.46447 7.46447C7.00017 7.92876 6.63188 8.47996 6.3806 9.08658C6.12933 9.69321 6 10.3434 6 11C6 11.5523 6.44772 12 7 12C7.55228 12 8 11.5523 8 11C8 10.606 8.0776 10.2159 8.22836 9.85195C8.37913 9.48797 8.6001 9.15726 8.87868 8.87868C9.15726 8.6001 9.48797 8.37913 9.85195 8.22836C10.2159 8.0776 10.606 8 11 8C11.5523 8 12 7.55228 12 7C12 6.44772 11.5523 6 11 6Z"
            fill="#B5B2BC"
          />
          <path
            d="M20 20L18 18"
            stroke="#B5B2BC"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </label>
      <button
        className="h-[44px] w-[85px] bg-[#B744F714] backdrop-blur-xs cursor-pointer"
        onClick={() => {
          setShowModal({
            show: true,
            variant: "filter",
          });
        }}
      >
        Filtros
      </button>
      <button
        className="h-[44px] w-[151px] px-[20px] py-[12px] bg-[#8E4EC6] backdrop-blur-xs cursor-pointer"
        onClick={() => setShowModal({ show: true, variant: "add" })}
      >
        Adicionar Filme
      </button>
    </div>
  );
};

export default MovieSearch;
