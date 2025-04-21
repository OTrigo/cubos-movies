"use client";
import { useTheme } from "@/contexts/ThemeContext";

import { FormInput } from "../ui/FormInput";
import { FormTextarea } from "../ui/FormTextarea";
import { UploadInput } from "../ui/UploadInput";
import SelectInput from "../ui/SelectInput";

const MovieForm = ({
  variant,
  onSubmit,
  onClose,
}: {
  variant: "add" | "edit";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) => {
  const { theme } = useTheme();

  return (
    <form
      id={`movie-form-${variant}`}
      className={`${theme}  flex flex-col gap-4 overflow-y-scroll w-full h-full py-8 px-4 `}
      onSubmit={async (e) => {
        await onSubmit(e);
      }}
      encType="multipart/form-data"
    >
      <FormInput
        name="friendlyTitle"
        label="Título"
        required={variant === "add"}
        placeholder="Título"
      />
      <FormInput
        name="fullTitle"
        label="Título Completo"
        required={variant === "add"}
        placeholder="Título Completo"
      />
      <FormTextarea
        name="sinopsys"
        label="Sinopse"
        rows={4}
        required={variant === "add"}
        placeholder="Sinopse"
      />
      <FormInput
        name="releaseDate"
        label="Data de Lançamento"
        type="date"
        required={variant === "add"}
        placeholder="2000-01-01"
        max={new Date().toISOString().split("T")[0]}
      />
      <FormInput
        name="durationTime"
        label="Duração (minutos)"
        type="number"
        required={variant === "add"}
        placeholder="120"
      />
      <SelectInput
        name="status"
        label="Status"
        required={variant === "add"}
        options={["Lançado", "Em Breve", "Anunciado"]}
        placeholder="Status"
      />
      <SelectInput
        name="language"
        label="Idioma"
        required={variant === "add"}
        options={["Português", "Inglês", "Espanhol"]}
        placeholder="Língua"
      />

      <div className={`${theme}  grid grid-cols-3 gap-4`}>
        <FormInput
          name="budget"
          label="Orçamento"
          type="number"
          placeholder="R$"
          required={variant === "add"}
        />
        <FormInput
          name="revenue"
          label="Receita"
          type="number"
          placeholder="R$"
          required={variant === "add"}
        />
        <FormInput
          name="profit"
          label="Lucro"
          type="number"
          placeholder="R$"
          required={variant === "add"}
        />
      </div>

      <FormInput
        name="tags"
        label="Tags (separadas por vírgulas)"
        required={variant === "add"}
      />
      <FormInput
        name="rating"
        label="Nota"
        type="range"
        min="0"
        max="100"
        required={variant === "add"}
        className="dark w-full appearance-none"
      />
      <FormInput
        name="trailer"
        label="Link do Trailer"
        required={variant === "add"}
      />

      <FormInput
        name="votes"
        label="Votos positivos"
        required={variant === "add"}
      />
      <UploadInput name="image" label="Imagem do Filme" />

      <UploadInput name="banner" label="Banner do Filme" />
      <FormInput
        name="phrase"
        label="Frase de Efeito"
        required={variant === "add"}
      />

      <div className="flex w-full gap-4 justify-end">
        <button
          className={`${theme}  bg-[var(--bg-button-secondary-default)] !text-[var(--text-button-secondary-default)] disabled:text-[var(--text--button-secondary-disabled)] disabled:bg-[var(--bg-button-secondary-disabled)] hover:bg-[var(--bg-button-secondary-hover)] active:bg-[var(--bg-button-secondary-active)]] font-medium px-4 py-2 rounded text-[16px] cursor-pointer`}
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
};

export default MovieForm;
