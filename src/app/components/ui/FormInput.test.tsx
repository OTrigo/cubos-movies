import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormInput } from "./FormInput";

describe("FormInput", () => {
  test("renderiza o componente com label e input", () => {
    render(<FormInput label="Nome" name="name" />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("usa o tipo padrão 'text' quando não especificado", () => {
    render(<FormInput label="Nome" name="name" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
  });

  test("usa o tipo fornecido quando especificado", () => {
    render(<FormInput label="Senha" name="password" type="password" />);

    const input = screen.getByLabelText("Senha");
    expect(input).toHaveAttribute("type", "password");
  });

  test("aplica as classes CSS corretamente ao input", () => {
    render(<FormInput label="Nome" name="name" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("w-full");
    expect(input).toHaveClass("p-2");
    expect(input).toHaveClass("bg-[var(--bg-theme-2)]");
    expect(input).toHaveClass("text-white");
    expect(input).toHaveClass("rounded");
  });

  test("aplica as classes CSS corretamente ao label", () => {
    render(<FormInput label="Nome" name="name" />);

    const label = screen.getByText("Nome");
    expect(label).toHaveClass("block");
    expect(label).toHaveClass("text-sm");
    expect(label).toHaveClass("font-medium");
  });

  test("conecta o label ao input através do atributo htmlFor", () => {
    render(<FormInput label="Email" name="email" />);

    const label = screen.getByText("Email");
    const input = screen.getByRole("textbox");

    expect(label).toHaveAttribute("for", "email");
    expect(input).toHaveAttribute("id", "email");
  });

  test("aceita props adicionais e as passa para o input", () => {
    render(
      <FormInput
        label="Username"
        name="username"
        placeholder="Digite seu username"
        maxLength={20}
        required
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Digite seu username");
    expect(input).toHaveAttribute("maxLength", "20");
    expect(input).toHaveAttribute("required");
  });

  test("permite interação com o input", () => {
    render(<FormInput label="Email" name="email" />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(input).toHaveValue("test@example.com");
  });

  test("manipula eventos corretamente", () => {
    const handleChange = jest.fn();
    render(<FormInput label="Nome" name="name" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "John Doe" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
