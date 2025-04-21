"use client";
import { useTheme } from "@/contexts/ThemeContext";

import { EditFilterProps } from "@actions/movie/movieActions";
import { Dispatch, SetStateAction, useState } from "react";

export function MovieFiltersModal({
  setFilters,
  refetch,
  onClose = () => {},
}: {
  setFilters: Dispatch<SetStateAction<EditFilterProps | undefined>>;
  onClose: () => void;
  refetch: () => void;
}) {
  const { theme } = useTheme();
  const [localFilters, setLocalFilters] = useState<EditFilterProps>({});
  const [displayRange, setDisplayRange] = useState<number>(0);

  const handleChange = (
    field: keyof EditFilterProps,
    value: string | number
  ) => {
    if (field === "minRating") setDisplayRange(() => value as number);
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = Object.fromEntries(
      Object.entries(localFilters)?.filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    setFilters(filtered as EditFilterProps);
    onClose();
    refetch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${theme} lg:min-w-[569px] lg:min-h-[454px] pt-4 grid gap-4`}
    >
      <div className="flex flex-col gap-2">
        <label>Gênero:</label>
        <select
          onChange={(e) => handleChange("genre", e.target.value)}
          className={`${theme} w-full p-2 bg-[var(--bg-theme-2)] text-[var(--text-default)] rounded 1 appearance-none focus:outline focus:outline-[var(--bg-button-default)] overflow-visible text-[16px]`}
        >
          <option value="">Todos</option>
          <option value="Ação">Ação</option>
          <option value="Comédia">Comédia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label>Idioma:</label>
        <select
          onChange={(e) => handleChange("language", e.target.value)}
          className={`${theme} w-full p-2 bg-[var(--bg-theme-2)] text-[var(--text-default)] rounded 1 appearance-none focus:outline focus:outline-[var(--bg-button-default)] overflow-visible text-[16px]`}
        >
          <option value="">Todos</option>
          <option value="Português">Português</option>
          <option value="Inglês">Inglês</option>
          <option value="Espanhol">Espanhol</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label>Nota mínima: {displayRange}</label>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          onChange={(e) => handleChange("minRating", Number(e.target.value))}
          className={`${theme} w-full appearance-none`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Status:</label>
        <select
          onChange={(e) => handleChange("status", e.target.value)}
          className={`${theme} w-full p-2 bg-[var(--bg-theme-2)] text-[var(--text-default)] rounded 1 appearance-none focus:outline focus:outline-[var(--bg-button-default)] overflow-visible text-[16px]`}
        >
          <option value="">Todos</option>
          <option value="Lançado">Lançado</option>
          <option value="Em Breve">Em Breve</option>
          <option value="Anunciado">Anunciado</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label>Lançado entre:</label>
        <div className={`${theme}  flex gap-2`}>
          <input
            type="date"
            onChange={(e) => handleChange("releaseFrom", e.target.value)}
            className={`${theme} w-full p-2 bg-[var(--bg-theme-2)] text-[var(--text-default)] rounded 1 appearance-none focus:outline focus:outline-[var(--bg-button-default)] overflow-visible text-[16px]`}
            min={"1900-01-01"}
            max={new Date().toISOString().split("T")[0]}
          />
          <input
            type="date"
            onChange={(e) => handleChange("releaseTo", e.target.value)}
            className={`${theme} w-full p-2 bg-[var(--bg-theme-2)] text-[var(--text-default)] rounded 1 appearance-none focus:outline focus:outline-[var(--bg-button-default)] overflow-visible text-[16px]`}
            min={"1900-01-01"}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label>Duração de filme entre:</label>
        <div className={`${theme}  flex gap-2`}>
          <input
            type="number"
            onChange={(e) => handleChange("minDuration", e.target.value)}
            className={`${theme} w-full p-2 bg-[var(--bg-theme-2)] text-[var(--text-default)] rounded 1 appearance-none focus:outline focus:outline-[var(--bg-button-default)] overflow-visible text-[16px]`}
            min={0}
            max={500}
            placeholder="0 minutos"
          />
          <input
            type="number"
            onChange={(e) => handleChange("maxDuration", e.target.value)}
            className={`${theme} w-full p-2 bg-[var(--bg-theme-2)] text-[var(--text-default)] rounded 1 appearance-none focus:outline focus:outline-[var(--bg-button-default)] overflow-visible text-[16px]`}
            min={0}
            max={500}
            placeholder="500 minutos"
          />
        </div>
      </div>

      <div className="flex w-full gap-4 justify-end">
        <button
          className={`${theme} bg-[var(--bg-button-secondary-default)] !text-[var(--text-button-secondary-default)] disabled:text-[var(--text--button-secondary-disabled)] disabled:bg-[var(--bg-button-secondary-disabled)] hover:bg-[var(--bg-button-secondary-hover)] active:bg-[var(--bg-button-secondary-active)]] font-medium px-4 py-2 rounded text-[16px] cursor-pointer`}
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`${theme}  bg-[var(--bg-button-default)] !text-[var(--text-button-default)] disabled:text-[var(--text--button-disabled)] disabled:bg-[var(--bg-button-disabled)] hover:bg-[var(--bg-button-hover)] active:bg-[var(--bg-button-active)]] font-medium px-4 py-2 rounded text-[16px] cursor-pointer`}
        >
          Salvar Alterações
        </button>
      </div>
    </form>
  );
}
