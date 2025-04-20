import { render, screen, fireEvent } from "@testing-library/react";
import MovieForm from "./MovieForm";

describe("MovieForm", () => {
  const setup = (variant: "add" | "edit" = "add") => {
    const onSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    });

    render(<MovieForm variant={variant} onSubmit={onSubmit} />);

    return { onSubmit };
  };

  it("renders all fields in 'add' mode", () => {
    setup("add");

    expect(screen.getByLabelText("Título")).toBeInTheDocument();
    expect(screen.getByLabelText("Título Completo")).toBeInTheDocument();
    expect(screen.getByLabelText("Sinopse")).toBeInTheDocument();
    expect(screen.getByLabelText("Data de Lançamento")).toBeInTheDocument();
    expect(screen.getByLabelText("Duração (minutos)")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Idioma")).toBeInTheDocument();
    expect(screen.getByLabelText("Orçamento")).toBeInTheDocument();
    expect(screen.getByLabelText("Receita")).toBeInTheDocument();
    expect(screen.getByLabelText("Lucro")).toBeInTheDocument();
    expect(screen.getByLabelText("Tags (separadas por vírgulas)")).toBeInTheDocument();
    expect(screen.getByLabelText("Nota")).toBeInTheDocument();
    expect(screen.getByLabelText("Link do Trailer")).toBeInTheDocument();
    expect(screen.getByLabelText("Votos positivos")).toBeInTheDocument();
    expect(screen.getByLabelText("Imagem do Filme")).toBeInTheDocument();
    expect(screen.getByLabelText("Banner do Filme")).toBeInTheDocument();
    expect(screen.getByLabelText("Frase de Efeito")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salvar alterações/i })).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", () => {
    const { onSubmit } = setup("add");

    const form = screen.getByRole("form", { hidden: true }) || screen.getByTestId(`movie-form-add`);
    fireEvent.submit(form || screen.getByRole("button", { name: /salvar alterações/i }));

    expect(onSubmit).toHaveBeenCalled();
  });

  it("fields are not required in 'edit' mode", () => {
    setup("edit");

    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).not.toHaveAttribute("required");
    });
  });
});
