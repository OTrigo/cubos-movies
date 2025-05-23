"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { SearchIcon } from "@/lib/icons";
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
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col md:flex-row w-full md:h-[92px] z-10 justify-end px-4 py-4 gap-[10px] items-center">
      <label className="relative h-fit w-full md:w-fit ">
        <input
          ref={inputRef}
          type="text"
          className="!min-h-[44px] w-full !h-[44px] md:w-[488px] border rounded-[4px] text-[#6F6D78] bg-[var(--bg-theme-2)] border-[#49474E] px-[16px] py-[12.5px]"
          placeholder="Pesquise por filmes"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setSearch(inputRef.current?.value ?? "");
            refetch();
          }}
        >
          <SearchIcon />
        </button>
      </label>
      <div className="flex gap-[10px] w-full md:w-fit">
        <button
          className={`${theme}  h-[44px] w-[85px] bg-[var(--bg-button-secondary-default)] backdrop-blur-xs cursor-pointer text-[var(--text-button-secondary-default-variant)] disabled:text-[var(--text--button-disabled)] disabled:bg-[var(--bg-button-disabled)] hover:bg-[var(--bg-button-hover)] active:bg-[var(--bg-button-active)]]`}
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
          className="h-[44px] w-fit px-[20px] py-[12px] bg-[var(--bg-button-default)] !text-[var(--text-button-default)] disabled:text-[var(--text--button-disabled)] disabled:bg-[var(--bg-button-disabled)] hover:bg-[var(--bg-button-hover)] active:bg-[var(--bg-button-active)]] backdrop-blur-xs cursor-pointer flex-grow"
          onClick={() => setShowModal({ show: true, variant: "add" })}
        >
          Adicionar Filme
        </button>
      </div>
    </div>
  );
};

export default MovieSearch;
