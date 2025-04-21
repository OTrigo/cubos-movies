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

  const handleChange = (
    field: keyof EditFilterProps,
    value: string | number
  ) => {
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
    <form onSubmit={handleSubmit} className={`${theme} p-4 grid gap-4`}>
      <div>
        <label>Gênero:</label>
        <select
          onChange={(e) => handleChange("genre", e.target.value)}
          className={`${theme} w-full`}
        >
          <option value="">Todos</option>
          <option value="Ação">Ação</option>
          <option value="Comédia">Comédia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
        </select>
      </div>

      <div>
        <label>Idioma:</label>
        <select
          onChange={(e) => handleChange("language", e.target.value)}
          className={`${theme} w-full`}
        >
          <option value="">Todos</option>
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
          <option value="es">Espanhol</option>
        </select>
      </div>

      <div>
        <label>Nota mínima:</label>
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          onChange={(e) => handleChange("minRating", Number(e.target.value))}
          className={`${theme} w-full`}
        />
      </div>

      <div>
        <label>Status:</label>
        <select
          onChange={(e) => handleChange("status", e.target.value)}
          className={`${theme} w-full`}
        >
          <option value="">Todos</option>
          <option value="released">Lançado</option>
          <option value="announced">Anunciado</option>
          <option value="in_production">Em produção</option>
        </select>
      </div>

      <div>
        <label>Lançado entre:</label>
        <div className={`${theme} flex gap-2`}>
          <input
            type="date"
            onChange={(e) => handleChange("releaseFrom", e.target.value)}
            className={`${theme} w-full invert`}
            min={"1900-01-01"}
          />
          <input
            type="date"
            onChange={(e) => handleChange("releaseTo", e.target.value)}
            className={`${theme} w-full invert`}
            min={"1900-01-01"}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`${theme} bg-[var(--bg-button-default)] !text-[var(--text-button-default)] disabled:text-[var(--text--button-disabled)] disabled:bg-[var(--bg-button-disabled)] hover:bg-[var(--bg-button-hover)] active:bg-[var(--bg-button-active)]] p-2 rounded mt-2 cursor-pointer`}
      >
        Aplicar filtros
      </button>
    </form>
  );
}
