import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormTextarea } from "./FormTextarea";

describe("FormTextarea", () => {
  test("renderiza o componente com label e textarea", () => {
    render(<FormTextarea label="Descrição" name="description" />);

    expect(screen.getByLabelText("Descrição")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("aplica as classes CSS corretamente ao textarea", () => {
    render(<FormTextarea label="Descrição" name="description" />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("w-full");
    expect(textarea).toHaveClass("p-2");
    expect(textarea).toHaveClass("bg-[var(--bg-theme-2)]");
    expect(textarea).toHaveClass("text-white");
    expect(textarea).toHaveClass("rounded");
  });

  test("aplica as classes CSS corretamente ao label", () => {
    render(<FormTextarea label="Descrição" name="description" />);

    const label = screen.getByText("Descrição");
    expect(label).toHaveClass("block");
    expect(label).toHaveClass("text-sm");
    expect(label).toHaveClass("font-medium");
  });

  test("conecta o label ao textarea através do atributo htmlFor", () => {
    render(<FormTextarea label="Comentários" name="comments" />);

    const label = screen.getByText("Comentários");
    const textarea = screen.getByRole("textbox");

    expect(label).toHaveAttribute("for", "comments");
    expect(textarea).toHaveAttribute("id", "comments");
  });

  test("aceita props adicionais e as passa para o textarea", () => {
    render(
      <FormTextarea
        label="Comentários"
        name="comments"
        placeholder="Digite seus comentários"
        maxLength={200}
        required
        rows={4}
      />
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("placeholder", "Digite seus comentários");
    expect(textarea).toHaveAttribute("maxLength", "200");
    expect(textarea).toHaveAttribute("required");
    expect(textarea).toHaveAttribute("rows", "4");
  });

  test("permite interação com o textarea", () => {
    render(<FormTextarea label="Descrição" name="description" />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, {
      target: { value: "Este é um exemplo de texto para teste" },
    });

    expect(textarea).toHaveValue("Este é um exemplo de texto para teste");
  });

  test("manipula eventos corretamente", () => {
    const handleChange = jest.fn();
    render(
      <FormTextarea
        label="Descrição"
        name="description"
        onChange={handleChange}
      />
    );

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Texto de teste" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("renderiza um textarea com texto inicial quando defaultValue é fornecido", () => {
    render(
      <FormTextarea
        label="Descrição"
        name="description"
        defaultValue="Texto inicial"
      />
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("Texto inicial");
  });

  test("renderiza um textarea com valor controlado quando value é fornecido", () => {
    render(
      <FormTextarea
        label="Descrição"
        name="description"
        value="Valor controlado"
        onChange={() => {}}
      />
    );

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("Valor controlado");
  });
});
