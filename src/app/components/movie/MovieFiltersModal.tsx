"use client";

import { EditFilterProps } from "@actions/movie/movieActions";
import { Dispatch, SetStateAction, useState } from "react";

export function MovieFiltersModal({
  setFilters,
  refetch,
  onClose = () => {},
}: {
  setFilters: Dispatch<SetStateAction<EditFilterProps|undefined>>;
  onClose: () => void;
  refetch: () => void;
}) {
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
    <form onSubmit={handleSubmit} className="p-4 grid gap-4">
      <div>
        <label>Gênero:</label>
        <select
          onChange={(e) => handleChange("genre", e.target.value)}
          className="w-full"
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
          className="w-full"
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
          className="w-full"
        />
      </div>

      <div>
        <label>Status:</label>
        <select
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full"
        >
          <option value="">Todos</option>
          <option value="released">Lançado</option>
          <option value="announced">Anunciado</option>
          <option value="in_production">Em produção</option>
        </select>
      </div>

      <div>
        <label>Lançado entre:</label>
        <div className="flex gap-2">
          <input
            type="date"
            onChange={(e) => handleChange("releaseFrom", e.target.value)}
            className="w-full invert"
            min={"1900-01-01"}
          />
          <input
            type="date"
            onChange={(e) => handleChange("releaseTo", e.target.value)}
            className="w-full invert"
            min={"1900-01-01"}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#8e4ec6] text-white p-2 rounded mt-2 cursor-pointer"
      >
        Aplicar filtros
      </button>
    </form>
  );
}
