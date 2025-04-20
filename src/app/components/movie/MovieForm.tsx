"use client";

import { FormInput } from "../ui/FormInput";
import { FormTextarea } from "../ui/FormTextarea";
import { UploadInput } from "../ui/UploadInput";

const MovieForm = ({
  variant,
  onSubmit,
}: {
  variant: "add" | "edit";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form
      id={`movie-form-${variant}`}
      className="flex flex-col gap-4 overflow-y-scroll w-full h-full p-4"
      onSubmit={async (e) => {
        await onSubmit(e);
      }}
      encType="multipart/form-data"
    >
      <FormInput
        name="friendlyTitle"
        label="Título"
        required={variant === "add"}
      />
      <FormInput
        name="fullTitle"
        label="Título Completo"
        required={variant === "add"}
      />
      <FormTextarea
        name="sinopsys"
        label="Sinopse"
        rows={4}
        required={variant === "add"}
      />
      <FormInput
        name="releaseDate"
        label="Data de Lançamento"
        type="date"
        required={variant === "add"}
      />
      <FormInput
        name="durationTime"
        label="Duração (minutos)"
        type="number"
        required={variant === "add"}
      />
      <FormInput name="status" label="Status" required={variant === "add"} />
      <FormInput name="language" label="Idioma" required={variant === "add"} />

      <div className="grid grid-cols-3 gap-4">
        <FormInput
          name="budget"
          label="Orçamento"
          type="number"
          required={variant === "add"}
        />
        <FormInput
          name="revenue"
          label="Receita"
          type="number"
          required={variant === "add"}
        />
        <FormInput
          name="profit"
          label="Lucro"
          type="number"
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
        type="number"
        min="0"
        max="10"
        required={variant === "add"}
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

      <button
        type="submit"
        className="bg-[#8e4ec6]  text-white font-medium px-4 py-2 rounded"
      >
        Salvar Alterações
      </button>
    </form>
  );
};

export default MovieForm;
